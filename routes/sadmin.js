var express = require('express');
var router = express.Router();
var db = require('../config/connection')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const dbHelper=require('../config/sadmindb')
/* GET home page. */
router.get('/profile', function(req, res, next) {
  res.render('login', {login:true});
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
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
module.exports = router;
