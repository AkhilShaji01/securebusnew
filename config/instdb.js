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
}