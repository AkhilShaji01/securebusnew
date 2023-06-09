var db = require('./connection')
const bcrypt = require('bcrypt');
// const { route } = require('./inst');
const saltRounds = 10;

module.exports={
    addcompany:async(data)=>{
            var password=data.password
            console.log(data.password)
            var encryptpassword= await bcrypt.hash(password,saltRounds);
            console.log(encryptpassword)
            var type=0;
            var date_ob = new Date();
            var day = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var date = year + "-" + month + "-" + day;
            console.log(data.email)
            const user=[[data.name,data.address,data.mobile,data.officephone,data.url,data.email,date,'active']]
            
            //console.log(louser)
            return new Promise((resolve,reject)=>{
                var sql="INSERT INTO company (name,address,mobile,officephone,url,email,createddate,status) VALUES ?"
                db.query(sql,[user],function (err,result){
                    if(err) {console.log(err); var status="errorinadding";resolve(status)}
                    else{
                        console.log("enterted to company")
                        var sqlb="select * from company where email=?"
                        db.query(sqlb,[data.email],(errt,resst)=>{
                            if(errt){console.log(errt);var sqld="delete from company where email=?"
                            db.query(sqld,[data.email],(errd,ressd)=>{
                                if(errd){console.log(errd);var status="errorinadding";resolve(status)}
                                else{
                                    var status="errorinadding";resolve(status)
                                }
                            })}
                            else{
                                dt=resst;
                                console.log(dt)
                                const louser=[[data.email,encryptpassword,type,'securebus',date,'active',dt[0].companyid]];
                                var sql1="INSERT INTO login (username,password,type,institutioncode,addeddate,status,orginalid) VALUES ?"
                                db.query(sql1,[louser],(err1,ress1)=>{
                                    if(err1){console.log(err1)
                                    var sqld="delete from company where email=?"
                                    db.query(sqld,[data.email],(errd,ressd)=>{
                                        if(errd){console.log(errd);var status="errorinadding";resolve(status)}
                                        else{
                                            var status="errorinadding";resolve(status)
                                        }
                                    })
                                    }
                                    else{
                                        console.log("entredintologin");
                                        var status="entredintologin";resolve(status)
                                    }
                                })
                            }
                        })
                        
                    }
                    
                })



                // let saved=true;
                // resolve(saved)
                
            })
  
        
    },
    login1:(data)=>{
        return new Promise((resolve,reject)=>{
            var password=data.password;
            var email=data.email
            console.log(email,password)
            var sql="select * from login where username= ?"
            db.query(sql,[email],(err,result)=>{
              if(err) {console.log("error");var status1=["errorinlogin",0];resolve(status1);}
              else{
                var data1=result
                // console.log(data[0].password)
                if(result.length>0){
                  const bcryptPassword = bcrypt.compareSync(password, result[0].password);
                  if(bcryptPassword)
                  {
                    //req.session.loggedIn=true;
                   // req.session.data=result;
                    
                    if(result[0].type==0)
                    {
                      var sql1="select * from company where email= ?"
                      db.query(sql1,[email],(err,ress)=>{
                        if(err) {console.log("error");var status1=["errorinlogin",0];resolve(status1)}
                        else{
                                //req.session.data=ress
                                console.log("78787878")
                              var res1=ress
                              var status=['loginsucess','company',ress];
                              resolve(status)
                      }
                    })
                    }
                    if(result[0].type==1)
                    {
                      var sql1="select * from institution where email= ?"
                      db.query(sql1,[email],(err,ress)=>{
                        if(err) {console.log("error");var status1=["errorinlogin",0];resolve(status1)}
                        else{
                          
                          var res1=ress;
                          console.log("78787878")
                              console.log(res1)
                              //res.redirect("/inst/profile")
                              var status=['loginsucess','institution',ress];
                              resolve(status)
                      }
                    })
                    }
                    if(result[0].type==2)
                    {
                      var sql1="select * from staff where email= ?"
                      db.query(sql1,[email],(err,ress)=>{
                        if(err) {console.log("error");res.redirect('/login');}
                        else{
                              var res1=ress
                              if(res1[0].roleid==1)
                              {
                                console.log(res1)
                                var sql2="SELECT *, department.name AS departmentname, designation.name AS designationname, teacherclassmapping.classid, class.classname FROM staff INNER JOIN department ON department.departmentid = staff.departmentid  INNER JOIN designation ON designation.designationid = staff.designationid INNER JOIN teacherclassmapping ON teacherclassmapping.teacherid = staff.staffid INNER JOIN class ON class.classid=(select teacherclassmapping.classid from teacherclassmapping WHERE teacherclassmapping.teacherid=staff.staffid) WHERE email = ?;"
                                db.query(sql2,[email],(err2,ress2)=>{
                                  if(err2){console.log("error in session entry");res.redirect('/')}
                                  else{
                                    req.session.data=ress2
                                    var res1=ress2
                                    console.log(res1)
                                    //res.redirect("/teacher/profile")
                                    res.render('teacher/profile',{ teacher:true,title: 'SecureBus',style:'dist/css/adminlte.min.css',plug:'plugins/overlayScrollbars/css/OverlayScrollbars.min.css',plug1:'plugins/fontawesome-free/css/all.min.css',bodyclass:'hold-transition sidebar-mini layout-fixed',res1 })
                                  }
                                })
                                // res.render('teacher/profile',{ teacher:true,title: 'SecureBus',style:'dist/css/adminlte.min.css',plug:'plugins/overlayScrollbars/css/OverlayScrollbars.min.css',plug1:'plugins/fontawesome-free/css/all.min.css',bodyclass:'hold-transition sidebar-mini layout-fixed',res1 })
                              }
                              else{
                                req.session.data=ress
                                var res1=ress
                                console.log(res1)
                                res.redirect("/driver/profile")
                                //res.render('driver/profile',{ driver:true,title: 'SecureBus',style:'../dist/css/adminlte.min.css',plug:'../plugins/overlayScrollbars/css/OverlayScrollbars.min.css',plug1:'../plugins/fontawesome-free/css/all.min.css',bodyclass:'hold-transition sidebar-mini layout-fixed',res1
                                //})
                              }
                              
                      }
                    })
                    }
                    if(result[0].type==3)
                    {
                      console.log("vghhbvhjcvbhc")
                      var sql1="SELECT *, studentclassmapping.classid, class.classname FROM student INNER JOIN studentclassmapping ON student.studentid = studentclassmapping.studentid INNER JOIN class ON class.classid = studentclassmapping.classid where student.email=?"
                      db.query(sql1,[email],(err,ress)=>{
                        if(err) {console.log("error");res.redirect('/');}
                        else{
                            req.session.data=ress
                            var res1=ress
                            res.redirect('/student/profile')
                            //res.render('student/profile',{ student:true,title: 'SecureBus',style:'dist/css/adminlte.min.css',plug:'plugins/overlayScrollbars/css/OverlayScrollbars.min.css',plug1:'plugins/fontawesome-free/css/all.min.css',bodyclass:'hold-transition sidebar-mini layout-fixed',res1   })
                              
                      }
                    })
                    }
                    if(result[0].type==4)
                    {
                      data=req.session.data;
                      console.log(data)
                      res.render('index',{driver:true,data,style:'dashsadmin.css'})
                    }
                  }
                  else
                    {
                      console.log("752387563745")
                      
                      var status1=["errorinlogin",0];resolve(status1)
                   }
                }
                else{
                  req.session.logerror=true;
                  var status1=["errorinlogin",0];resolve(status1)
                  }
                }
              })
        })
    }
}