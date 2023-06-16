var db = require('./connection')
const bcrypt = require('bcrypt');
// const { route } = require('./inst');
const saltRounds = 10;
module.exports={
updateacademicyear()
{
    console.log("updateacademicyear done")
    var date_ob = new Date();
            var day = ("0" + date_ob.getDate()).slice(-2);
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var year = date_ob.getFullYear();
            var date = year + "-" + month + "-" + day;
    var sql="select * from academicyear";
    db.query(sql,(err,ress)=>{
        if(err){
            console.log(err);
        }
        else
        {
            ress.forEach(rows => {
                console.log(date_ob)
                var startdate=rows.startyear+"-07-01";
                // var startdate1=new Date(startdateobj);
                // var day1 = ("0" + startdate1.getDate()).slice(-2);
                // var month1 = ("0" + (startdate1.getMonth() + 1)).slice(-2);
                // var year1 = startdate1.getFullYear();
                // var startdate = year1 + "-" + month1 + "-" + day1;
                var enddate=rows.stopyear+"-06-30";
                // var enddate1=new Date(enddateobj);
                // var day2 = ("0" + enddate1.getDate()).slice(-2);
                // var month2 = ("0" + (enddate1.getMonth() + 1)).slice(-2);
                // var year2 = enddate1.getFullYear();
                // var enddate = year2 + "-" + month2 + "-" + day2;
                console.log(startdate)
                console.log(enddate)
                if(date>=startdate && date<=enddate)
                {
                    var s1=`UPDATE academicyear SET status = 'present' WHERE academicyearid = ${rows.academicyearid}`;
                    db.query(s1,(err1,ress1)=>{
                        if(err1)
                        {
                            console.log(err1)
                        }
                    })
                }
                else if(date<=startdate)
                {
                    var s1=`UPDATE academicyear SET status = 'future' WHERE academicyearid = ${rows.academicyearid}`;
                    db.query(s1,(err1,ress1)=>{
                        if(err1)
                        {
                            console.log(err1)
                        }
                    })
                }
                else if(date>=enddate)
                {
                    var s1=`UPDATE academicyear SET status = 'past' WHERE academicyearid = ${rows.academicyearid}`;
                    db.query(s1,(err1,ress1)=>{
                        if(err1)
                        {
                            console.log(err1)
                        }
                    })
                }
            });
        }
    })
}
}
