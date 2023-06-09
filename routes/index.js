var express = require('express');
var router = express.Router();
var db = require('../config/connection')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const dbHelper=require('../config/indexdb')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {login:true});
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
  dbHelper.login1(req.body).then((status1)=>{
    if(status1[0]=='errorinlogin'){
      res.redirect("/")
    }
    else{
      if(status1[1]=='company'){
        req.session.loggedIn=true;
        console.log("loginsucess")
        console.log(status1)
        req.session.data=status1[2];
        console.log(req.session.data)
        res.redirect("/sadmin/dashboard")
      }
      else if(status1[1]=='institution')
      {
        req.session.loggedIn=true;
        console.log("loginsucess")
        console.log(status1)
        req.session.data=status1[2];
        res.redirect("/inst/dashboard")
      }
    }
  })
})
router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/')
})
module.exports = router;
