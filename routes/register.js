var express = require('express');
var router = express.Router();
const userDAO = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
router.get('/r',((req, res) => {
    res.render('register')
}))
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
                   res.redirect('/register');

               }else{
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