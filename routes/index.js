const express = require('express');
const router = express.Router();
const passport = require('passport')
const PassportLocal = require('passport-local').Strategy;
const userDAO = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET home page. */
router.get('/', (req, res) => {
  let message= req.flash('error');
  res.render('login',{title:'login', message});
});

/*pagina principal*/
router.get('/main',(req,res)=>{
  //metodo utilizado para validar la session
  if (req.isAuthenticated()){
    res.render('main');
    console.log('aceptado');
  }else {
    res.render('login');
    console.log('Denegado');
  }
});
/*Verificacion de acceso, desde el login*/
router.post('/login', passport.authenticate('local',{
  successRedirect:'/main',
  failureRedirect:'/',
  failureFlash:'usuario o contraseña incorrecta'
}));


router.get('/logout',(req, res) => {
  if(req.isAuthenticated()){
     req.logout()
  }
  res.render('login');
});




//configurar la estrategia de Autenticacion
passport.use(new PassportLocal((username,password,done) => {
  userDAO.finUser(username,(data)=>{
    console.log(data)
    if (data)
      if (bcrypt.compareSync(password,data.password))
        return done(null,data);
    return done(null,false,{error:'usuario incorrecto'})
  })
}));
passport.serializeUser((user,done)=>{done(null,user.id);});
passport.deserializeUser((id,done)=>done(null,{id:1,name:'1410'}));


/*
router.get('/r',((req, res) => {
  let message= req.flash('error');
  res.render('register',{title:'login', message});
}));

router.post('/register',  (req,res)=>{
  let username = req.body.user_name;
  let obj = req.body;
  userDAO.finUser(username,(data)=>{
    if (!data){
      let user ={
        user_name: obj.user_name,
        last_name: obj.last_name,
        m_last_name: obj.m_last_name,
        password:bcrypt.hashSync( obj.password, saltRounds),
        email: obj.email
      };
      userDAO.insertUser(user, (data)=>{
        if (data.affectedRows === 0){
          req.flash('error', 'No se inserto correctamente, 0 lineas afectadas');
          res.redirect('/r');

        }else{
          res.redirect('/');
        }
      });
    }else{
      req.flash('error','usuario existente')
      res.redirect('/r');
    }

  });
})*/
module.exports = router;
