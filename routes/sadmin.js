var express = require('express');
var router = express.Router();
var db = require('../config/connection')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const dbHelper=require('../config/sadmindb')
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
  var sql="Select * from institution";
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
  db.query(sql,(err,ress)=>{
    if(err){console.log(err)}
    else{
      dt=ress;
      len=ress.length;
      console.log(dt)
      res.render('sadmin/dashboard', {res1, dt,len,a,b});
    }
  })
  
  
});
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
      res.render("sadmin/profile",{res1})
    }
    else{
     var dt=status1;
     console.log(dt)
      res.render("sadmin/profile",{dt,res1})
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
router.post("/companyedit",verifyLogin,(req,res)=>{
  res1=req.session.data;
  dbHelper.editcompany(req.body).then((status1)=>{
    if(status1=="editingerror")
    {
      
      res.redirect("/sadmin/profile");
    }
    else{
      console.log(status1);
      res.redirect("/sadmin/dashboard")
    }
  })
})
router.get("/changepassword",verifyLogin,(req,res)=>{
  res1=req.session.data;
  var em=res1[0].email;
  res.render("sadmin/changepassword",{res1,em})
})
router.post("/changepassword",verifyLogin,(req,res)=>{
  res1=req.session.data;
  dbHelper.changepassword(req.body).then((status1)=>{
    if(status1=="errorinchange")
    {
      console.log("error in change")
      req.session.pch=true;
      res.redirect("/sadmin/dashboard")
    }
    else if(status1=="changed")
    {
      req.session.pchok=true;
      res.redirect("/sadmin/dashboard")
    }
  })
})
module.exports = router;
