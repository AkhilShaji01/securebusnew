var db = require('./connection')
const bcrypt = require('bcrypt');
// const { route } = require('./inst');
const saltRounds = 10;

module.exports={
    addteacher:async(res1,data)=>{
            var password=data.password
            console.log(data.password)
            var encryptpassword= await bcrypt.hash(password,saltRounds);
            console.log(encryptpassword)
            var type=2;
            var date_ob = new Date();
            var day = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var date = year + "-" + month + "-" + day;
            console.log(data.email)
            const user=[[data.name,data.email,data.departmentid,data.mobile,data.doj,data.address,res1[0].institutionid,'active',date]]
            
            //console.log(louser)
            return new Promise((resolve,reject)=>{
                var sql="INSERT INTO teacher (name,email,departmentid,mobile,doj,address,institutionid,status,addeddate) VALUES ?"
                db.query(sql,[user],function (err,result){
                    if(err) {console.log(err); var status="errorinadding";resolve(status)}
                    else{
                        console.log("enterted to teacher")
                        var sqlb="select * from teacher where email=?"
                        db.query(sqlb,[data.email],(errt,resst)=>{
                            if(errt){console.log(errt);var sqld="delete from teacher where email=?"
                            db.query(sqld,[data.email],(errd,ressd)=>{
                                if(errd){console.log(errd);var status="errorinadding";resolve(status)}
                                else{
                                    var status="errorinadding";resolve(status)
                                }
                            })}
                            else{
                                dt=resst;
                                console.log(dt)
                                const louser=[[data.email,encryptpassword,type,res1[0].institutionid,date,'active',dt[0].teacherid]];
                                var sql1="INSERT INTO login (username,password,type,institutionid,addeddate,status,orginalid) VALUES ?"
                                db.query(sql1,[louser],(err1,ress1)=>{
                                    if(err1){console.log(err1)
                                    var sqld="delete from teacher where email=?"
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
    getinst:async(data)=>{
        var instid=data.institutionid
        //console.log(encryptpassword)
        var type=1;
        var date_ob = new Date();
        var day = ("0" + date_ob.getDate()).slice(-2);
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var year = date_ob.getFullYear();
        var date = year + "-" + month + "-" + day;
        console.log(data.email)
        // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
        
        //console.log(louser)
        return new Promise((resolve,reject)=>{
            var sql="select * from institution where institutionid=?"
            db.query(sql,[instid],function (err,result){
                if(err) {console.log(err); var status="gettingerror";resolve(status)}
                else{
                    status=result;
                    resolve(status);
                    
                }
                
            })   
        })

    
},
editinst:async(data)=>{
    var instid=data.institutionid
    //console.log(encryptpassword)
    var type=1;
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var date = year + "-" + month + "-" + day;
    console.log(data)
    // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
    
    //console.log(louser)
    return new Promise((resolve,reject)=>{
        var value=[data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactphone,data.contactemail,data.institutionid]
        var sql1="update institution SET name=?, mobile=?, officephone=?, address=?, email=?, website=?,contactname=?,contactphone=?,contactemail=? where institutionid=?"
       console.log(value)
        db.query(sql1,value,(err,result)=>{
            if(err) {console.log(err); var status="editingerror"; resolve(status)}
            else{
                var status="edited";
                resolve(status);
                
            }
            
        })   
    })


},
editinstitution:(data)=>{
    var instid=data.institutionid;
    //console.log(encryptpassword)
    var type=0;
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var date = year + "-" + month + "-" + day;
    console.log(data.email)
    // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
    
    //console.log(louser)
    return new Promise((resolve,reject)=>{
        var values1=[data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,data.institutionid]
        var sql="update institution set name=?, mobile=?, officephone=?, address=?, email=?, website=?, contactname=?, contactphone=?, contactemail=? where institutionid=?"
        db.query(sql,values1,function (err,result){
            if(err) {console.log(err); var status="editingerror";resolve(status)}
            else{
                status="edited";
                resolve(status);
                console.log(values1)
                
            }
            
        })   
    })


},
getprofile:(data)=>{
    var instid=data[0].institutionid
    //console.log(encryptpassword)
    var type=1;
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var date = year + "-" + month + "-" + day;
    console.log(data.email)
    // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
    
    //console.log(louser)
    return new Promise((resolve,reject)=>{
        var sql="select * from institution where institutionid=?"
        db.query(sql,[instid],(err,result)=>{
            if(err) {console.log(err); var status="gettingerror";resolve(status)}
            else{
                var status=result;
                console.log(status)
                resolve(status);
                
            }
            
        })   
    })


},
delinst:(data)=>{
    var instid=data.institutionid;
    //console.log(encryptpassword)
    var type=0;
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var date = year + "-" + month + "-" + day;
    console.log(data.email)
    // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
    
    //console.log(louser)
    return new Promise((resolve,reject)=>{
        var sq="select * from institution where institutionid=?";
        db.query(sq,[instid],(errt,resst)=>{
            if(errt){
                console.log("error");
            }
            else{
                dt=resst;
                var sql="delete from institution where institutionid=?"
                db.query(sql,[instid],(err,result)=>{
                    if(err) {console.log(err); var status="deleteerror";resolve(status)}
                    else{
                        var sql2="delete from login where username=?"
                        db.query(sql2,[dt[0].email],(er,re)=>{
                            if(er){
                                var status="deleteerrorinlogin";resolve(status)
                            }
                            else{
                                status="deleted";
                                resolve(status);
                            }
                        })
                        
                        
                    }
                    
                })  
            }
        })
         
    })


},
addbus:(data)=>{
    //console.log(encryptpassword)
    // var password=data.password
    //         console.log(data.password)
    //         var encryptpassword= await bcrypt.hash(password,saltRounds);
    //         console.log(encryptpassword)
    var type=0;
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var date = year + "-" + month + "-" + day;
    console.log(data)
    // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
    
    //console.log(louser)
    return new Promise((resolve,reject)=>{
        
        var sq="insert into bus (busnumber,model,ownrent,institutionid,institutioncode,regnumber,totalseat,addeddate,status) values ?";
        db.query(sq,[data],(errt,resst)=>{
            if(errt){
                console.log(errt);
                var status="errorinadding"
                resolve(status)
            }
            else{
                dt=resst;
                var status="added"
                resolve(status) 
            }
        })
         
    })


},
getbus:async(data)=>{
    var busid=data.busid
    //console.log(encryptpassword)
    var type=1;
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var date = year + "-" + month + "-" + day;
    console.log(data.email)
    // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
    
    //console.log(louser)
    return new Promise((resolve,reject)=>{
        var sql="select * from bus where busid=?"
        db.query(sql,[busid],function (err,result){
            if(err) {console.log(err); var status="gettingerror";resolve(status)}
            else{
                status=result;
                resolve(status);
                
            }
            
        })   
    })


},
editbus:async(data)=>{
    var busid=data.busid
    //console.log(encryptpassword)
    var type=1;
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var date = year + "-" + month + "-" + day;
    console.log(data)
    // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
    
    //console.log(louser)
    return new Promise((resolve,reject)=>{
        var value=[data.busnumber,data.model,data.totalseat,data.regnumber,data.busid]
        var sql1="update bus SET busnumber=?, model=?, totalseat=?, regnumber=? where busid=?"
       console.log(value)
        db.query(sql1,value,(err,result)=>{
            if(err) {console.log(err); var status="editingerror"; resolve(status)}
            else{
                var status="edited";
                resolve(status);
                
            }
            
        })   
    })


},

delbus:(data)=>{
    var busid=data.busid;
    //console.log(encryptpassword)
    var type=0;
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var date = year + "-" + month + "-" + day;
    console.log(data.email)
    // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
    
    //console.log(louser)
    return new Promise((resolve,reject)=>{
        var sq="select * from bus where busid=?";
        db.query(sq,[busid],(errt,resst)=>{
            if(errt){
                console.log("error");
            }
            else{
                dt=resst;
                var sql="delete from bus where busid=?"
                db.query(sql,[busid],(err,result)=>{
                    if(err) {console.log(err); var status="deleteerror";resolve(status)}
                    else{
                        
                                status="deleted";
                                resolve(status);
                            
                        }
                        
                        
                    })
                    
                }
            })  
            })
        },

        changepassword:async(data)=>{
            var em=data.email;
            //console.log(encryptpassword)
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
            // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
            
            //console.log(louser)
            return new Promise((resolve,reject)=>{
                var value=[encryptpassword,em]
                var sq="update login SET password=? where username=?";
                db.query(sq,value,(errt,resst)=>{
                    if(errt){
                        console.log(errt);
                        var status="errorinchange"
                        resolve(status)
                    }
                    else{
                        dt=resst;
                        var status="changed"
                        resolve(status) 
                    }
                })
                 
            })
        
        
        },

        adddepartment:(data,res1)=>{
            //console.log(encryptpassword)
            // var password=data.password
            //         console.log(data.password)
            //         var encryptpassword= await bcrypt.hash(password,saltRounds);
            //         console.log(encryptpassword)
            var type=0;
            var date_ob = new Date();
            var day = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var date = year + "-" + month + "-" + day;
            console.log(data)
            // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
            
            //console.log(louser)
            var value1=[[data.name,res1[0].institutionid,'active',date]]
            return new Promise((resolve,reject)=>{
                
                var sq="insert into department (name,institutionid,status,addeddate) values ?";
                db.query(sq,[value1],(errt,resst)=>{
                    if(errt){
                        console.log(errt);
                        var status="errorinadding"
                        resolve(status)
                    }
                    else{
                        dt=resst;
                        var status="added"
                        resolve(status) 
                    }
                })
                 
            })
        
        
        },
        getteacherpage:(res1)=>{
            var insti=parseInt(res1[0].institutionid)
            //console.log(encryptpassword)
            // var password=data.password
            //         console.log(data.password)
            //         var encryptpassword= await bcrypt.hash(password,saltRounds);
            //         console.log(encryptpassword)
            var type=0;
            var date_ob = new Date();
            var day = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var date = year + "-" + month + "-" + day;
            
            // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
            
            //console.log(louser)
            
            return new Promise((resolve,reject)=>{
                var teacher;
                var sql=`
                SELECT teacher.*, department.name AS departmentname
                FROM teacher
                INNER JOIN department ON department.departmentid = teacher.departmentid
                WHERE teacher.institutionid = ?
              `
                db.query(sql,[insti],(errtg,resstg)=>{
                    if(errtg)
                    {
                        console.log(errtg)
                    }
                    else
                    {
                        if(resstg.length>0)
                        {
                            teacher=resstg;
                        }
                    }
                })
                
                var sq="select * from department where institutionid= ?";
                db.query(sq,[res1[0].institutionid],(errt,resst)=>{
                    if(errt){
                        console.log(errt);
                        var status=["erroringetting",teacher]
                        resolve(status)
                    }
                    else{
                        dt=resst;
                        var status=[dt,teacher]
                        resolve(status) 
                    }
                })
                 
            })
        
        
        },

        depdel:(res1,data)=>{
            //console.log(encryptpassword)
            // var password=data.password
            //         console.log(data.password)
            //         var encryptpassword= await bcrypt.hash(password,saltRounds);
            //         console.log(encryptpassword)
            var type=0;
            var date_ob = new Date();
            var day = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var date = year + "-" + month + "-" + day;
            
            // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
            
            //console.log(louser)
            
            return new Promise((resolve,reject)=>{
                
                var sq="delete from department where departmentid= ?";
                db.query(sq,[data.departmentid],(errt,resst)=>{
                    if(errt){
                        console.log(errt);
                        var status="deletingerror"
                        resolve(status)
                    }
                    else{
                        dt=resst;
                        var status="deleted"
                        resolve(status) 
                    }
                })
                 
            })
        
        
        },


        addacademicyear:(res1,data)=>{
            //console.log(encryptpassword)
            // var password=data.password
            //         console.log(data.password)
            //         var encryptpassword= await bcrypt.hash(password,saltRounds);
            //         console.log(encryptpassword)
            var type=0;
            var date_ob = new Date();
            var day = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var date = year + "-" + month + "-" + day;
            console.log(data)
            // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
            
            //console.log(louser)
            var name=data.startyear+" - "+data.endyear;
            var value1;
            var startdate=data.startyear+"-07-01";
                var enddate=data.endyear+"-06-30";
                if(date>=startdate && date<=enddate)
                {
                    value1=[[name,data.startyear,data.endyear,'present',res1[0].institutionid]]
                }
                else if(date<=startdate)
                {
                    value1=[[name,data.startyear,data.endyear,'future',res1[0].institutionid]]
                }
                else if(date>=enddate)
                {
                    value1=[[name,data.startyear,data.endyear,'past',res1[0].institutionid]]
                }
            return new Promise((resolve,reject)=>{
                
                var sq="insert into academicyear (name,startyear,stopyear,status,institutionid) values ?";
                db.query(sq,[value1],(errt,resst)=>{
                    if(errt){
                        console.log(errt);
                        var status="errorinadding"
                        resolve(status)
                    }
                    else{
                        dt=resst;
                        var status="added"
                        resolve(status) 
                    }
                })
                 
            })
        
        
        },

        getaddclasspage:(res1)=>{
            var insti=parseInt(res1[0].institutionid)
            //console.log(encryptpassword)
            // var password=data.password
            //         console.log(data.password)
            //         var encryptpassword= await bcrypt.hash(password,saltRounds);
            //         console.log(encryptpassword)
            var type=0;
            var date_ob = new Date();
            var day = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var date = year + "-" + month + "-" + day;
            
            // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
            
            //console.log(louser)
            
            return new Promise((resolve,reject)=>{
                var dp;
                var sem;
                var batch;
                var sql='SELECT * FROM department where institutionid = ?'
                db.query(sql,[insti],(errtg,resstg)=>{
                    if(errtg)
                    {
                        console.log(errtg)
                    }
                    else
                    {
                        if(resstg.length>0)
                        {
                            dp=resstg;
                        }
                    }
                })
                var sqlsem='SELECT * FROM semester'
                db.query(sqlsem,[insti],(errsem,resssem)=>{
                    if(errsem)
                    {
                        console.log(errtsem)
                    }
                    else
                    {
                        if(resssem.length>0)
                        {
                            sem=resssem;
                        }
                    }
                })
                var sqlbatch='SELECT * FROM batch'
                db.query(sqlbatch,[insti],(errbatch,ressbatch)=>{
                    if(errbatch)
                    {
                        console.log(errbatch)
                    }
                    else
                    {
                        if(ressbatch.length>0)
                        {
                            batch=ressbatch;
                        }
                    }
                })
                
                var sq="select * from academicyear where institutionid= ?";
                db.query(sq,[res1[0].institutionid],(errt,resst)=>{
                    if(errt){
                        console.log(errt);
                        var status=["erroringetting",dp,sem,batch]
                        resolve(status)
                    }
                    else{
                        ac=resst;
                        var status=[ac,dp,sem,batch]
                        resolve(status) 
                    }
                })
                 
            })
        
        
        },

        addclass:(res1,data)=>{
            //console.log(encryptpassword)
            // var password=data.password
            //         console.log(data.password)
            //         var encryptpassword= await bcrypt.hash(password,saltRounds);
            //         console.log(encryptpassword)
            var type=0;
            var date_ob = new Date();
            var day = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var date = year + "-" + month + "-" + day;
            //console.log(data)
            // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
            
            //console.log(louser)
            var [acid,acname]=data.academicyearid.split(",");
            var [semid,semname]=data.semesterid.split(",");
            var [batchid,batchname]=data.batchid.split(",");
            var [depid,depname]=data.departmentid.split(",");
            if(batchid=='nil'){var batchid1="";batchname=""}
            else{
            var batchid1=parseInt(batchid);}
            var name=semname+"-"+depname+" "+batchname;
            var semid1=parseInt(semid)
            
            
            var acid1=parseInt(acid)
            var depid1=parseInt(depid)
            var value1=[[name,semid1,batchid1,acid1,depid1,'active',res1[0].institutionid]]
            return new Promise((resolve,reject)=>{
                
                var sq="insert into class (classname,semesterid,batchid,academicyearid,departmentid,status,institutionid) values ?";
                db.query(sq,[value1],(errt1,resst)=>{
                    if(errt1){
                        var status="errorinadding"
                        resolve(status)
                    }
                    else{
                        dt=resst;
                        var status="added"
                        resolve(status) 
                    }
                })
                 
            })
        
        
        },
        getacademicpage:(res1)=>{
            var insti=parseInt(res1[0].institutionid)
            //console.log(encryptpassword)
            // var password=data.password
            //         console.log(data.password)
            //         var encryptpassword= await bcrypt.hash(password,saltRounds);
            //         console.log(encryptpassword)
            var type=0;
            var date_ob = new Date();
            var day = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var date = year + "-" + month + "-" + day;
            
            // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
            
            //console.log(louser)
            
            return new Promise((resolve,reject)=>{
                var clas;
                var clas1;
                var ac;
                var batch;
                var sem;
                var sql="SELECT class.*, teacher.name as teachername, department.departmentid, department.name as departmentname,academicyear.name as academicyear FROM class inner join department on department.departmentid=class.departmentid inner join academicyear on academicyear.academicyearid=class.academicyearid left join teacher on teacher.teacherid=class.teacherid where class.institutionid = ? and academicyear.status='present'"
                db.query(sql,[insti],(errtg,resstg)=>{
                    if(errtg)
                    {
                        console.log(errtg)
                    }
                    else
                    {
                        clas=resstg
                        
                    }
                })
                
                var sqlsem='SELECT * FROM academicyear where institutionid=?'
                db.query(sqlsem,[insti],(errsem,resssem)=>{
                    if(errsem)
                    {
                        console.log(errsem)
                    }
                    else
                    {
                        if(resssem.length>0)
                        {
                            ac=resssem;
                        }
                    }
                })
                var sqlbatch='SELECT * FROM batch'
                db.query(sqlbatch,[insti],(errbatch,ressbatch)=>{
                    if(errbatch)
                    {
                        console.log(errbatch)
                    }
                    else
                    {
                        if(ressbatch.length>0)
                        {
                            batch=ressbatch;
                        }
                    }
                })
                var sqls='SELECT * FROM semester'
                db.query(sqls,[insti],(errbatch1,ressbatch1)=>{
                    if(errbatch1)
                    {
                        console.log(errbatch1)
                    }
                    else
                    {
                        if(ressbatch1.length>0)
                        {
                            sem=ressbatch1;
                        }
                    }
                })
                
                var sq="select * from department where institutionid= ?";
                db.query(sq,[res1[0].institutionid],(errt,resst)=>{
                    if(errt){
                        console.log(errt);
                        var status=["erroringetting",ac,clas,clas1,sem,batch]
                        resolve(status)
                    }
                    else{
                        dp=resst;
                        var status=[dp,ac,clas,clas1,sem,batch]
                        resolve(status) 
                    }
                })
                 
            })
        
        
        },

        clasdel:(res1,data)=>{
            //console.log(encryptpassword)
            // var password=data.password
            //         console.log(data.password)
            //         var encryptpassword= await bcrypt.hash(password,saltRounds);
            //         console.log(encryptpassword)
            var type=0;
            var date_ob = new Date();
            var day = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var date = year + "-" + month + "-" + day;
            console.log(data.classid)
            // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
            
            //console.log(louser)
            
            return new Promise((resolve,reject)=>{
                
                var sq="DELETE FROM class WHERE classid = ?";
                db.query(sq,[data.classid],(errt,resst)=>{
                    if(errt){
                        console.log(errt);
                        var status="deletingerror"
                        resolve(status)
                    }
                    else{
                        dt=resst;
                        var status="deleted"
                        resolve(status) 
                    }
                })
                 
            })
        
        
        },

        getassignteacher:(res1,data)=>{
            //console.log(encryptpassword)
            // var password=data.password
            //         console.log(data.password)
            //         var encryptpassword= await bcrypt.hash(password,saltRounds);
            //         console.log(encryptpassword)
            var type=0;
            var date_ob = new Date();
            var day = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var date = year + "-" + month + "-" + day;
            console.log(data.classid)
            // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
            
            //console.log(louser)
            
            return new Promise((resolve,reject)=>{
                
                var sq="SELECT * FROM teacher WHERE teacherid NOT IN (SELECT teacherid FROM class) and departmentid=? and institutionid=?";
                db.query(sq,[data.departmentid,res1[0].institutionid],(errt,resst)=>{
                    if(errt){
                        console.log(errt);
                        var status="gettingerror"
                        resolve(status)
                    }
                    else{
                        dt=resst;
                        if(resst.length>0){
                        console.log(resst)
                        var status=resst;
                        resolve(status)}
                        else{
                            var status="noteachers";
                            resolve(status)
                        } 
                    }
                })
                 
            })
        
        
        },

        assignclass:(res1,data)=>{
            //console.log(encryptpassword)
            // var password=data.password
            //         console.log(data.password)
            //         var encryptpassword= await bcrypt.hash(password,saltRounds);
            //         console.log(encryptpassword)
            var type=0;
            var date_ob = new Date();
            var day = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var date = year + "-" + month + "-" + day;
            console.log(data.classid)
            // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
            
            //console.log(louser)
            
            return new Promise((resolve,reject)=>{
                
                var sq="update class set teacherid=? where classid=? and institutionid=?";
                db.query(sq,[data.teacherid,data.classid,res1[0].institutionid],(errt,resst)=>{
                    if(errt){
                        console.log(errt);
                        var status="assigningerror"
                        resolve(status)
                    }
                    else{
                        dt=resst;
                        console.log(resst)
                        var status='assigned';
                        resolve(status) 
                    }
                })
                 
            })
        
        
        },
        delassign:(res1,data)=>{
            //console.log(encryptpassword)
            // var password=data.password
            //         console.log(data.password)
            //         var encryptpassword= await bcrypt.hash(password,saltRounds);
            //         console.log(encryptpassword)
            var type=0;
            var date_ob = new Date();
            var day = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var date = year + "-" + month + "-" + day;
            console.log(data.classid)
            // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
            
            //console.log(louser)
            
            return new Promise((resolve,reject)=>{
                
                var sq="update class set teacherid=NULL where classid=? and institutionid=?";
                db.query(sq,[data.classid,res1[0].institutionid],(errt,resst)=>{
                    if(errt){
                        console.log(errt);
                        var status="assigningerror"
                        resolve(status)
                    }
                    else{
                        dt=resst;
                        console.log(resst)
                        var status='assigned';
                        resolve(status) 
                    }
                })
                 
            })
        
        
        },
        addtrip:(res1,data)=>{
            //console.log(encryptpassword)
            // var password=data.password
            //         console.log(data.password)
            //         var encryptpassword= await bcrypt.hash(password,saltRounds);
            //         console.log(encryptpassword)
            var type=0;
            var date_ob = new Date();
            var day = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var date = year + "-" + month + "-" + day;
            //console.log(data)
            // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
            
            //console.log(louser)
            var name=data.startplace+" - "+data.endplace;
            var type=1
            var value1=[[name,data.startplace,data.startplacelatitude,data.startplacelongitude,data.endplace,data.endplacelatitude,data.endplacelongitude,type,res1[0].institutionid,'active']]
            return new Promise((resolve,reject)=>{
                
                var sq="insert into trip (tripname,startplace,startplacelatitude,startplacelongitude,stopplace,stopplacelatitude,stopplacelongitude,type,institutionid,status) values ?";
                db.query(sq,[value1],(errt1,resst)=>{
                    if(errt1){
                        console.log(errt1)
                        var status="errorinadding"
                        resolve(status)
                    }
                    else{
                        dt=resst;
                        tri=resst.insertId;
                        console.log(dt)
                        var name1=data.endplace+" - "+data.startplace;
                        var type1=2;
                        var value2=[[name1,data.endplace,data.endplacelatitude,data.endplacelongitude,data.startplace,data.startplacelatitude,data.startplacelongitude,tri,type1,res1[0].institutionid,'active']]
                        var sq1="insert into trip (tripname,startplace,startplacelatitude,startplacelongitude,stopplace,stopplacelatitude,stopplacelongitude,oppositesidetripid,type,institutionid,status) values ?";
                        db.query(sq1,[value2],(errt2,resst2)=>{
                            if(errt2){
                                console.log(errt1)
                                var status="errorinadding"
                                resolve(status)
                            }
                            else
                            {
                                console.log(resst2);
                                tri1=resst2.insertId;
                                var we="update trip set oppositesidetripid=? where tripname=?";
                                db.query(we,[tri1,name],(y,t)=>{
                                    if(y){
                                        console.log(y)
                                    }
                                    else{console.log(t)}
                                })
                                var status="added"
                                resolve(status)
                            }
                        })
                         
                    }
                })
                 
            })
        
        
        },
        gettrippage:(res1)=>{
            var insti=parseInt(res1[0].institutionid)
            //console.log(encryptpassword)
            // var password=data.password
            //         console.log(data.password)
            //         var encryptpassword= await bcrypt.hash(password,saltRounds);
            //         console.log(encryptpassword)
            var type=0;
            var date_ob = new Date();
            var day = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var date = year + "-" + month + "-" + day;
            
            // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
            
            //console.log(louser)
            
            return new Promise((resolve,reject)=>{
                var clas;
                var clas1;
                var ac;
                var batch;
                var sem;
                //var sql="SELECT class.*, teacher.name as teachername, department.departmentid, department.name as departmentname,academicyear.name as academicyear FROM class inner join department on department.departmentid=class.departmentid inner join academicyear on academicyear.academicyearid=class.academicyearid left join teacher on teacher.teacherid=class.teacherid where class.institutionid = ? and academicyear.status='present'"
                var sql="select * from trip where institutionid=?"
                db.query(sql,[insti],(errtg,resstg)=>{
                    if(errtg)
                    {
                        console.log(errtg)
                    }
                    else
                    {
                        trip=resstg
                        
                    }
                })
                
                var sqlsem='SELECT * FROM academicyear where institutionid=?'
                db.query(sqlsem,[insti],(errsem,resssem)=>{
                    if(errsem)
                    {
                        console.log(errsem)
                    }
                    else
                    {
                        if(resssem.length>0)
                        {
                            ac=resssem;
                        }
                    }
                })
                var sqlbatch='SELECT * FROM batch'
                db.query(sqlbatch,[insti],(errbatch,ressbatch)=>{
                    if(errbatch)
                    {
                        console.log(errbatch)
                    }
                    else
                    {
                        if(ressbatch.length>0)
                        {
                            batch=ressbatch;
                        }
                    }
                })
                var sqls='SELECT * FROM semester'
                db.query(sqls,[insti],(errbatch1,ressbatch1)=>{
                    if(errbatch1)
                    {
                        console.log(errbatch1)
                    }
                    else
                    {
                        if(ressbatch1.length>0)
                        {
                            sem=ressbatch1;
                        }
                    }
                })
                
                var sq="select * from department where institutionid= ?";
                db.query(sq,[res1[0].institutionid],(errt,resst)=>{
                    if(errt){
                        console.log(errt);
                        var status=["erroringetting",ac,trip,sem,batch]
                        resolve(status)
                    }
                    else{
                        dp=resst;
                        var status=[dp,ac,trip,sem,batch]
                        resolve(status) 
                    }
                })
                 
            })
        
        
        },

        getassignbus:(res1,data)=>{
            //console.log(encryptpassword)
            // var password=data.password
            //         console.log(data.password)
            //         var encryptpassword= await bcrypt.hash(password,saltRounds);
            //         console.log(encryptpassword)
            var type=0;
            var date_ob = new Date();
            var day = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var date = year + "-" + month + "-" + day;
            console.log(data.classid)
            // const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
            
            //console.log(louser)
            
            return new Promise((resolve,reject)=>{
                
                var sq="SELECT * FROM bus WHERE institutionid=?";
                db.query(sq,[res1[0].institutionid],(errt,resst)=>{
                    if(errt){
                        console.log(errt);
                        var status="gettingerror"
                        resolve(status)
                    }
                    else{
                        dt=resst;
                        if(resst.length>0){
                        console.log(resst)
                        var status=resst;
                        resolve(status)}
                        else{
                            var status="nobus";
                            resolve(status)
                        } 
                    }
                })
                 
            })
        
        
        },
}