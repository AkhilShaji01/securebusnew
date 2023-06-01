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
}