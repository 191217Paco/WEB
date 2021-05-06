var express = require('express');
var router = express.Router();
const userDAO = require('../models/UserDAO');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/registro',((req, res) => {
    res.render('register')
}))
router.post('/create_register',  (req,res)=>{
    console.log("Bueno aca vamos")
    let username = req.body.username;
    let obj = req.body;
    userDAO.finUser(username,(data)=>{
       if (!data){
           let user ={
               name: obj.name,
               lastname: obj.lastname,
               username: obj.username,
               password:bcrypt.hashSync( obj.password, saltRounds),
               email: obj.email
           };
           userDAO.insertUser(user, (data)=>{
               if (data.affectedRows === 0){
                   req.flash('error', 'No se inserto correctamente, 0 lineas afectadas');
                   res.render('register');
               }else{
                   req.flash('error', 'usuario registrado exitosamente');
                   res.redirect('/');
               }
           });
       }else{
           req.flash('error','usuario existente')
           res.redirect('/register');
       }

    });
})

module.exports = router;