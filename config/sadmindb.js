var db = require('./connection')
const bcrypt = require('bcrypt');
// const { route } = require('./inst');
const saltRounds = 10;

module.exports={
    addinstitution:async(data)=>{
            var password=data.password
            console.log(data.password)
            var encryptpassword= await bcrypt.hash(password,saltRounds);
            console.log(encryptpassword)
            var type=1;
            var date_ob = new Date();
            var day = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var date = year + "-" + month + "-" + day;
            console.log(data.email)
            const user=[[data.institutioncode,data.name,data.mobile,data.officephone,data.address,data.email,data.website,data.contactname,data.contactmobile,data.contactemail,date,'active']]
            
            //console.log(louser)
            return new Promise((resolve,reject)=>{
                var sql="INSERT INTO institution (institutioncode,name,mobile,officephone,address,email,website,contactname,contactphone,contactemail,addedon,status) VALUES ?"
                db.query(sql,[user],function (err,result){
                    if(err) {console.log(err); var status="errorinadding";resolve(status)}
                    else{
                        console.log("enterted to institution")
                        var sqlb="select * from institution where email=?"
                        db.query(sqlb,[data.email],(errt,resst)=>{
                            if(errt){console.log(errt);var sqld="delete from institution where email=?"
                            db.query(sqld,[data.email],(errd,ressd)=>{
                                if(errd){console.log(errd);var status="errorinadding";resolve(status)}
                                else{
                                    var status="errorinadding";resolve(status)
                                }
                            })}
                            else{
                                dt=resst;
                                console.log(dt)
                                const louser=[[data.email,encryptpassword,type,data.institutioncode,date,'active',dt[0].institutionid]];
                                var sql1="INSERT INTO login (username,password,type,institutioncode,addeddate,status,orginalid) VALUES ?"
                                db.query(sql1,[louser],(err1,ress1)=>{
                                    if(err1){console.log(err1)
                                    var sqld="delete from institution where email=?"
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
editcompany:(data)=>{
    var companyid=data.companyid;
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
        var sql="update company set name=?, mobile=?, officephone=?, Address=?, email=?, url=? where companyid=?"
        db.query(sql,[data.name,data.mobile,data.officephone,data.address,data.email,data.url,data.companyid],function (err,result){
            if(err) {console.log(err); var status="editingerror";resolve(status)}
            else{
                status="edited";
                resolve(status);
                
            }
            
        })   
    })


},
getprofile:(data)=>{
    var companyid=data[0].companyid
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
        var sql="select * from company where companyid=?"
        db.query(sql,[companyid],(err,result)=>{
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
}