var express = require('express');
var router = express.Router();
var db = require('../config/connection')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const dbHelper=require('../config/instdb');
const { route } = require('./users');
/* GET home page. */
// router.get('/profile', function(req, res, next) {
//   res.render('login', {login:true});
// });
const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }
  else{res.redirect('/')}
  }


router.get('/dashboard',verifyLogin, function(req, res, next) {
  res1=req.session.data
  console.log(res1[0].name)
  let dt
  var sql="Select * from bus where institutionid=?";
  var a=false;
  var b=false;
  if(req.session.pch)
  {
    a=req.session.pch
    req.session.pch=false
  }
  if(req.session.pchok)
  {
    b=req.session.pchok
    req.session.pchok=false
  }
  db.query(sql,[res1[0].institutionid],(err,ress)=>{
    if(err){console.log(err)}
    else{
      dt=ress;
      len=ress.length;
      console.log(dt)
      res.render('inst/dashboard', {res1, dt,len,a,b});
    }
  })
  
  
});


router.get("/addbus",verifyLogin,(req,res)=>{
    res1=req.session.data
    if(req.session.addbusserror){
        errerdata="Error in adding bus please try again";
        res.render("inst/addbus",{res1,errerdata})
        req.session.addbusserror=false
      }
      else{
        res.render("inst/addbus",{res1})
      }
    
})
router.post("/addbus",verifyLogin,(req,res)=>{
    res1=req.session.data;
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var date = year + "-" + month + "-" + day;
    var data=[[req.body.busnumber,req.body.model,req.body.ownrent,res1[0].institutionid,res1[0].institutioncode,req.body.regnumber,req.body.totalseat,date,'active']]
    dbHelper.addbus(data).then((status1)=>{
        if(status1=="errorinadding")
        {
            req.session.addbusserror=true
            redirect("/inst/addbus")
        }
        else if(status1=="added")
        {
            res.redirect("/inst/bus")
        }
    })
})



router.post("/companyadd",(req,res)=>{
  dbHelper.addcompany(req.body).then((status1)=>{
    if(status1='errorinadding')
    {
      console.log(status1);
      res.redirect("/signup")
    }
    else if(status1='entredintologin')
    {
      console.log(status1);
      res.redirect("/")
    }
  })
})
router.post("/login",(req,res)=>{
  
})
router.get("/addinstitution",verifyLogin,(req,res)=>{
  res1=req.session.data;
  var errerdata;
  if(req.session.addinsterr){
    errerdata="Error in adding institution please try again"
  }
  res.render("sadmin/addinst",{res1,errerdata})
  req.session.addinsterr=false;
})
router.post("/addinstitution",verifyLogin,(req,res)=>{
  res1=req.session.data;
  dbHelper.addinstitution(req.body).then((status1)=>{
    if(status1=='errorinadding')
    {
      console.log(status1);
      req.session.addinsterr=true;
      res.redirect("/sadmin/addinstitution")
    }
    else if(status1='entredintologin')
    {
      console.log(status1);
      res.redirect("/sadmin/dashboard")
    }
  })
})
router.post("/instedit",verifyLogin,(req,res)=>{
  res1=req.session.data
  if(req.session.ederror)
  {
    dbHelper.getinst(req.session.edid).then((status1)=>{
      if(status1=="gettingerror")
      {
        console.log("Getting data error");
        res.redirect("/sadmin/dashboard");
        req.session.ederror=false;
      }
      else{
        dt=status1;
        res.render("sadmin/editinst",{dt,res1})
        req.session.ederror=false
      }
    })
  }
  else
  {
    dbHelper.getinst(req.body).then((status1)=>{
      if(status1=="gettingerror")
      {
        console.log("Getting data error");
        res.redirect("/sadmin/dashboard");
      }
      else{
        dt=status1;
        res.render("sadmin/editinst",{dt,res1})
      }
    })
  }
})
router.post("/editinst1",verifyLogin,(req,res)=>{
  res1=req.session.data;
  dbHelper.editinst(req.body).then((status1)=>{
    if(status1=="editingerror")
    {
      req.session.ederror=true;
      req.session.edid=req.body.institutionid;
      res.redirect("/sadmin/instedit");
    }
    else{
      console.log(status1);
      res.redirect("/sadmin/dashboard")
    }
  })
})
router.get("/profile",verifyLogin,(req,res)=>{
  res1=req.session.data;
  console.log(res1)
  dbHelper.getprofile(res1).then((status1)=>{
    if(status1=="gettingerror")
    {
      console.log(status1)
      res.render("inst/profile",{res1})
    }
    else{
     var dt=status1;
     console.log(dt)
      res.render("inst/profile",{dt,res1})
    }
  })
})
router.post("/instdelete",verifyLogin,(req,res)=>{
  res1=req.session.data;
  dbHelper.delinst(req.body).then((status1)=>{
    if(status1=="deleteerror")
    {
      console.log(status1)
    }
    else if(status1=="deleteerrorinlogin")
    {
      console.log("not deleted from login")
    }
    else if(status1=="deleted")
    {
      res.redirect("/sadmin/dashboard")
    }
  })
})
router.post("/institutionedit",verifyLogin,(req,res)=>{
  res1=req.session.data;
  dbHelper.editinstitution(req.body).then((status1)=>{
    if(status1=="editingerror")
    {
      
      res.redirect("/inst/profile");
    }
    else{
      console.log(status1);
      res.redirect("/inst/dashboard")
    }
  })
})
router.get("/changepassword",verifyLogin,(req,res)=>{
  res1=req.session.data;
  var em=res1[0].email;
  res.render("inst/changepassword",{res1,em})
})
router.post("/changepassword",verifyLogin,(req,res)=>{
  res1=req.session.data;
  dbHelper.changepassword(req.body).then((status1)=>{
    if(status1=="errorinchange")
    {
      console.log("error in change")
      req.session.pch=true;
      res.redirect("/inst/dashboard")
    }
    else if(status1=="changed")
    {
      req.session.pchok=true;
      res.redirect("/inst/dashboard")
    }
  })
})
router.get("/bus",verifyLogin,(req,res)=>{
  res1=req.session.data;
  instid=res1[0].institutionid;
  var sql="Select * from bus where institutionid=?"
  db.query(sql,[instid],(err,ress)=>{
    if(err){console.log(err)}
    else{
      dt=ress;
      len=ress.length
      res.render('inst/bus',{dt,len,res1});
    }
  })
    
})


router.post("/editbus",verifyLogin,(req,res)=>{
  res1=req.session.data
  if(req.session.ederror)
  {
    dbHelper.getbus(req.body).then((status1)=>{
      if(status1=="gettingerror")
      {
        console.log("Getting data error");
        res.redirect("/inst/bus");
        req.session.ederror=false;
      }
      else{
        dt=status1;
        res.render("inst/editbus",{dt,res1})
        req.session.ederror=false
      }
    })
  }
  else
  {
    dbHelper.getbus(req.body).then((status1)=>{
      if(status1=="gettingerror")
      {
        console.log("Getting data error");
        res.redirect("/inst/bus");
      }
      else{
        dt=status1;
        console.log(status1)
        res.render("inst/editbus",{dt,res1})
      }
    })
  }
})




router.post("/editbus1",verifyLogin,(req,res)=>{
  res1=req.session.data;
  dbHelper.editbus(req.body).then((status1)=>{
    if(status1=="editingerror")
    {
      req.session.ederror=true;
      req.session.edid=req.body.busid;
      res.redirect("/inst/bus");
    }
    else{
      console.log(status1);
      dt=status1;
      res.redirect("/inst/bus")
    }
  })
})
router.post("/deletebus",verifyLogin,(req,res)=>{
  res1=req.session.data;
  dbHelper.delbus(req.body).then((status1)=>{
    if(status1=="deleteerror")
    {
      console.log(status1)
    }
    else if(status1=="deleted")
    {
      res.redirect("/inst/bus")
    }
  })
})
router.get("/teacher",verifyLogin,(req,res)=>{
  res1=req.session.data;
  var dt=false;
  dt=req.session.deldeperror;
  req.session.deldeperror=false
  dbHelper.getteacherpage(res1).then((status1)=>{
    if(status1[0]=="erroringetting")
    {
      teacher=status1[1];
      lent=teacher.length
      res.render("inst/teacher",{res1,dt,teacher,lent})
    }
    else{
      var dp=status1[0];
      teacher=status1[1];
      lent=teacher.length
      lend=dp.length
      res.render("inst/teacher",{res1,dp,dt,teacher,lent,lend})
    }
  })
  
})
router.get("/adddepartment",verifyLogin,(req,res)=>{
  res1=req.session.data;
  if(req.session.adddepserror){
    errerdata="Error in adding department please try again";
    res.render("inst/adddepartment",{res1,errerdata})
    req.session.adddepserror=false
  }
  else{
    res.render("inst/adddepartment",{res1})
  }
})
router.post("/adddepartment",verifyLogin,(req,res)=>{
  res1=req.session.data;
  dbHelper.adddepartment(req.body,res1).then((status1)=>{
    if(status1=="errorinadding")
    {
      req.session.adddepserror=true;
      res.redirect("/inst/adddepartment")
    }
    else{
      res.redirect("/inst/teacher")
    }
  })
})
router.post("/deletedepartment",verifyLogin,(req,res)=>{
  res1=req.session.data;
  dbHelper.depdel(res1,req.body).then((status1)=>{
    if(status1=="deletingerror")
    {
      req.session.deldeperror=true;
      res.redirect("/inst/teacher")
    }
    else{
      req.session.deldeperror=false;
      res.redirect("/inst/teacher")
    }
  })
})
router.get("/addteacher",verifyLogin,(req,res)=>{
  res1=req.session.data;
  instid=res1[0].institutionid;
  var sql="Select * from department where institutionid=?"
  db.query(sql,[instid],(err,ress)=>{
    if(err){console.log(err)}
    else{
      dt=ress;
      len=ress.length
      if(req.session.addteacherserror){
        errerdata="Error in adding teacher please try again";
        res.render("inst/addteacher",{res1,errerdata,dt})
        req.session.addteacherserror=false
      }
      else{
      res.render('inst/addteacher',{dt,len,res1});
      }
    }
  })
    
})
router.post("/addteacher",verifyLogin,(req,res)=>{
  res1=req.session.data;
  dbHelper.addteacher(res1,req.body).then((status1)=>{
    if(status1=="errorinadding")
    {
      req.session.addteacherserror=true;
      res.redirect("/inst/addteacher")
    }
    else if(status1=='entredintologin')
    {
      res.redirect("/inst/teacher")
    }
  })
})
router.get("/teachers/:id",verifyLogin,(req,res)=>{
  depid=parseInt(req.params.id);
  res1=req.session.data;
  
  var instid=parseInt(res1[0].institutionid);
  console.log(depid,instid)
  const query = 'SELECT teacher.*, department.name as departmentname FROM teacher inner join department on department.departmentid=teacher.departmentid WHERE teacher.departmentid = ? and teacher.institutionid=?';
  db.query(query, [depid,instid], (error, results) => {
    if (error) {
      console.error(error);
       res.status(500).json({ error: 'Error fetching teachers' });
    } else {
      res.json(results);
      console.log(results)
    }
  });
})

router.get("/academics",verifyLogin,(req,res)=>{
  res1=req.session.data;
  var dt=false;
  dt=req.session.deldeperror;
  req.session.deldeperror=false
  dbHelper.getacademicpage(res1).then((status1)=>{
    if(status1[0]=="erroringetting")
    {
      ac=status1[1];
      clas=status1[2];
      sem=status1[3];
      batch=status1[4]
      lenac=ac.length
      lenclas=clas.length
      res.render("inst/academics",{res1,dt,teac,clas,sem,batch,lenac,lenclas,})
    }
    else{
      var dp=status1[0];
      ac=status1[1];
      clas=status1[2];
      sem=status1[3];
      batch=status1[4]
      lenac=ac.length
      lenclas=clas.length
      res.render("inst/academics",{res1,dp,ac,clas,sem,batch,lenac,lenclas,dt})
    }
  })
  
})
router.get("/addacademicyear",verifyLogin,(req,res)=>{
  res1=req.session.data;
  if(req.session.addacademicsyearerror){
    errerdata="Error in adding academic year please try again";
    res.render("inst/addacademicyear",{res1,errerdata})
    req.session.addacademicyearerror=false
  }
  else{
    res.render("inst/addacademicyear",{res1})
  }
  
})
router.post("/addacademicyear",verifyLogin,(req,res)=>{
  res1=req.session.data
  dbHelper.addacademicyear(res1,req.body).then((status1)=>{
    if(status1=="addingerror")
    {
      req.session.addacademicyearerror=true;
      res.redirect("/inst/addacademicyear")
    }
    else if(status1=="added")
    {
      res.redirect("/inst/academics")
    }
  })
})

router.get("/addclass",verifyLogin,(req,res)=>{
  res1=req.session.data;
  var dt=false;
  dt=req.session.deldeperror;
  req.session.deldeperror=false
  dbHelper.getaddclasspage(res1).then((status1)=>{
    if(req.session.addclasserror){
      errerdata="Error in adding academic year please try again. check if the class is already added";
      if(status1[0]=="erroringetting")
    {
      dp=status1[1];
      sem=status1[2];
      batch=status1[3];
      lent=dp.length
      res.render("inst/addclass",{res1,dt,dp,lent,sem,batch,errerdata})
    }
    else{
      var ac=status1[0];
      dp=status1[1];
      sem=status1[2];
      batch=status1[3];
      lenac=ac.length
      lend=dp.length
      res.render("inst/addclass",{res1,dp,dt,ac,lenac,lend,sem,batch,errerdata})
    }
      req.session.addclasserror=false
    }
    else{
      if(status1[0]=="erroringetting")
    {
      dp=status1[1];
      sem=status1[2];
      batch=status1[3];
      lent=dp.length
      res.render("inst/addclass",{res1,dt,dp,lent,sem,batch})
    }
    else{
      var ac=status1[0];
      dp=status1[1];
      sem=status1[2];
      batch=status1[3];
      lenac=ac.length
      lend=dp.length
      res.render("inst/addclass",{res1,dp,dt,ac,lenac,lend,sem,batch})
    }
    }
    
  })
  
})
router.post("/addclass",verifyLogin,(req,res)=>{
  res1=req.session.data
  dbHelper.addclass(res1,req.body).then((status1)=>{
    if(status1=="errorinadding")
    {
      req.session.addclasserror=true;
      res.redirect("/inst/addclass")
    }
    else if(status1=="added")
    {
      res.redirect("/inst/academics")
    }
  })
})

router.get("/getclass/:id",verifyLogin,(req,res)=>{
  depid=parseInt(req.params.id);
  res1=req.session.data;
  console.log("entred")
  var instid=parseInt(res1[0].institutionid);
  console.log(depid,instid)
  const query = 'SELECT class.*,teacher.name as teachername, department.departmentid, department.name as departmentname FROM class inner join department on department.departmentid=class.departmentid left join teacher on teacher.teacherid=class.teacherid WHERE class.departmentid = ? and class.institutionid=?';
  db.query(query, [depid,instid], (error, resu) => {
    if (error) {
      console.error(error);
       res.status(500).json({ error: 'Error fetching teachers' });
    } else {
      res.json(resu);
      console.log(resu)
    }
  });
})

router.post("/deleteclass",verifyLogin,(req,res)=>{
  res1=req.session.data;
  dbHelper.clasdel(res1,req.body).then((status1)=>{
    if(status1=="deletingerror")
    {
      req.session.deldeperror=true;
      res.redirect("/inst/academics")
    }
    else{
      req.session.deldeperror=false;
      res.redirect("/inst/academics")
    }
  })
});
router.post("/assignclass",verifyLogin,(req,res)=>{
  var res1=req.session.data;
  var classid=req.body.classid;
  var classname=req.body.classname;
  dbHelper.getassignteacher(res1,req.body).then((status1)=>{
    console.log(status1)
    if(status1=="gettingerror"){

    }
    else if(status1=="noteachers")
    {
      var noteac="All teacher are assinged and no teacher left"
      res.render("inst/assignclass",{res1,noteac,classid,classname})
    }
    else
    {
      var teac=status1;
      res.render("inst/assignclass",{res1,teac,classid,classname})
    }
  })
})
router.post("/assignclass1",verifyLogin,(req,res)=>{
  var res1=req.session.data;
  var classid=req.body.teacherid;
  var classname=req.body.classname;
  dbHelper.assignclass(res1,req.body).then((status1)=>{
    if(status1=="assigningerror"){

    }
    else if(status1='assigned')
    {
      var teac=status1;
      res.redirect("/inst/academics")
    }
  })
})

router.post("/deleteassign",verifyLogin,(req,res)=>{
  var res1=req.session.data;
  var classid=req.body.teacherid;
  var classname=req.body.classname;
  dbHelper.delassign(res1,req.body).then((status1)=>{
    if(status1=="assigningerror"){

    }
    else if(status1='assigned')
    {
      var teac=status1;
      res.redirect("/inst/academics")
    }
  })
})

router.get("/trip",verifyLogin,(req,res)=>{
  res1=req.session.data;
  var dt=false;
  dt=req.session.deldeperror;
  req.session.deldeperror=false
  dbHelper.gettrippage(res1).then((status1)=>{
    if(status1[0]=="erroringetting")
    {
      ac=status1[1];
      trip=status1[2];
      sem=status1[3];
      batch=status1[4]
      
      // lenclas=clas.length
      res.render("inst/trip",{res1,dt,teac,trip,sem,batch})
    }
    else{
      var dp=status1[0];
      ac=status1[1];
      trip=status1[2];
      sem=status1[3];
      batch=status1[4]
      
      res.render("inst/trip",{res1,dp,ac,trip,sem,batch,dt})
    }
  })
  
})
router.get("/addtrip",verifyLogin,(req,res)=>{
  res1=req.session.data;
  var dt=false;
  dt=req.session.deldeperror;
  req.session.deldeperror=false
   if(req.session.addtriperror){
      errerdata="Error in adding academic year please try again. check if the class is already added";
     
      
      res.render("inst/addtrip",{res1,errerdata})
   
      req.session.addtriperror=false
    }
    else{
    
   
      res.render("inst/addtrip",{res1})
    
    }
    
  
  
})
router.post("/addtrip",verifyLogin,(req,res)=>{
  res1=req.session.data
  dbHelper.addtrip(res1,req.body).then((status1)=>{
    if(status1=="errorinadding")
    {
      req.session.addtriperror=true;
      res.redirect("/inst/addtrip")
    }
    else if(status1=="added")
    {
      res.redirect("/inst/trip")
    }
  })
})


router.post("/assignbus",verifyLogin,(req,res)=>{
  var res1=req.session.data;
  var tripid=req.body.tripid;
  var tripname=req.body.tripname;
  dbHelper.getassignbus(res1,req.body).then((status1)=>{
    console.log(status1)
    if(status1=="gettingerror"){

    }
    else if(status1=="nobus")
    {
      var noteac="All bus are assinged and no teacher left"
      res.render("inst/assignbus",{res1,noteac,tripid,tripname})
    }
    else
    {
      var bus=status1;
      res.render("inst/assignbus",{res1,bus,tripname,tripid})
    }
  })
})
router.post("/assignclass1",verifyLogin,(req,res)=>{
  var res1=req.session.data;
  var classid=req.body.teacherid;
  var classname=req.body.classname;
  dbHelper.assignclass(res1,req.body).then((status1)=>{
    if(status1=="assigningerror"){

    }
    else if(status1='assigned')
    {
      var teac=status1;
      res.redirect("/inst/academics")
    }
  })
})
module.exports = router;
