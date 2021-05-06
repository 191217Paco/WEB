const express = require('express');
const router = express.Router();
let DAOClient = require('../models/ClientDAO');
let clients ;


router.get('/main',(req,res)=>{
    //metodo utilizado para validar la session
    if (req.isAuthenticated()){
        res.render('main');
        console.log('aceptado');
        console.log('supongo que usuario');
    }else {
        res.render('login');
        console.log('Denegado');
    }
});
/*opciones de menu*/
router.get('/addC',(req,res) =>{
    res.render('addClient');
});

router.get('/seeC', (req,res) =>{
    DAOClient.getClients((data)=>{
        if (data.affectedRows === 0){
            req.flash('error', 'Algo salio mal');
            res.redirect('/addC');
        }else{
            console.log("estamos en aprietos?")
            clients = data;
            console.log(data);
            res.render('seeClient',{ client : clients});
        }
    })

});

router.get('/editC/:id',(req,res) =>{
    const id = req.params.id;
    DAOClient.getClient(id, (data)=>{
        if (data.affectedRows === 0){
            req.flash('error', 'Algo salio mal');
            res.redirect('/addC');
        }else{
            let client = data;
            console.log("clieteee "+client);
            res.render('editClient',{client : client});
        }
    })
})



router.get('/seeClient', (req,res) => {
    DAOClient.getClients((data)=>{
        if (data.affectedRows === 0){
            req.flash('error', 'Algo salio mal');
            res.redirect('/addC');
        }else{
            console.log("estamos en aprietos?")
            console.log(data);
        }
    })
})

router.post('/putClient/:id',(req, res) =>{
    let content = req.body
    let client = {
        id : req.params.id,
        name : content.name,
        lastname: content.lastname,
        email : content.email,
        phone: content.phone
    }
    DAOClient.updateClient(client,(data)=>{
        if (data.affectedRows === 0){
            req.flash('error', 'Algo salio mal');
            res.redirect('/home/main');
        }else{
            res.render('main');
        }
    })


})

router.get('/delC/:id',(req,res) =>{
    console.log('cliente a eliminar'+req.params.id);
    const id = req.params.id;
    DAOClient.deleteClient(id, (data) =>{
        if(data.affectedRows === 0 ){
            console.log("no se encontro");
        }else{
            console.log('se encontro a este wey : ');
            res.redirect('/home/seeC')
        }
    })
})

router.post('/addClient', (req,res) =>{
    let content = req.body;
    let client = {
        name : content.name,
        lastname: content.lastname,
        email : content.email,
        phone: content.phone
    }
    DAOClient.insertClient(client, (data) =>{
        if (data.affectedRows === 0){
            req.flash('error', 'Algo salio mal');
            res.redirect('/home/addC');
        }else {
            req.flash('error', 'usuario registrado exitosamente');
            res.redirect('/home/main');
        }
    })
});


module.exports = router;
