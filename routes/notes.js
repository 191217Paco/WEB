const express = require('express');
const router = express.Router();
let clients;
let listService;
let c;
let ClientDAO = require('../models/ClientDAO');
let ServiceDAO = require('../models/ServiceDAO');
let CarDAO = require('../models/CarDAO');
let NoteDAO = require('../models/DAONote')



/*ruta de accesos principal a vista*/
router.get('/notes', (req, res) => {
    ClientDAO.getClients((data) => {
        if (data.affectedRows === 0){
            req.flash('error', 'Algo salio mal');
            res.redirect('/addC');
        }else{
            console.log("noteees"+data)
            clients = data;
            res.render('addNote', {clients : clients})
        }
    })

});

/*ruta de acceso imprimmir cars de notas*/
router.get('/viewNote', (req, res) => {
    let content;
    let list=[];
    let servicios=[];

    NoteDAO.getNotes((notes)=>{
        let carro = {};
        let cliente = {};
        let servicio = {};
        let nota = {};
        console.log("viewwwww"+notes)
        if (notes.affectedRows === 0){
            req.flash('error', 'Algo salio mal');
            console.log("error en DAON"+notes.affectedRows);
        }else{
            for (const note of notes){
                nota = note;
                console.log("nota "+note.cars_id)
                CarDAO.getCar(note.cars_id, (car)=>{
                    console.log("carro "+car)
                    carro = car;

                    /*
                    ClientDAO.getClient(car.client_id, (client)=>{
                        cliente = client;
                    })*/
                    ServiceDAO.getService(note.cars_id, (services)=>{

                        for (const i of services){
                            console.log("servicios"+i.servicio)
                            servicios.push(i);
                        }
                        console.log(servicios);
                    })
                })
                content={
                    nota,
                    carro,
                    cliente,
                    servicios
                }
                list.push(content);
                console.log(list);
            }
            res.render('seeNote',{list : list});
        }

    })
})

/*Crear notes paso final*/
router.get('/addS/:id',(req, res) => {
    let idc = req.params.id;
    let acumulador = 0;
    console.log("el arrary "+listService);
    for (const item of listService){
        acumulador = acumulador + item.price;
    }
    console.log("total : "+ acumulador)
    let note = {
        total:acumulador,
        status:"adeudo",
        cars_id: idc,
        user_id: 3
    }
    NoteDAO.postNote(note, (data)=>{
        if (data.affectedRows === 0){
            req.flash('error', 'Algo salio mal');
            res.redirect('/home/main');
        }else{
            res.redirect('/home/main');
        }
    })
})



/*primer paso de craccion de notas*/
router.post('/addCar',(req, res) => {
    let acumulador = 0;
    let car = {
        marca : req.body.marca,
        model : req.body.model,
        client_id :req.body.selectC
    }
    CarDAO.postCar(car,(data)=>{
        if (data.affectedRows === 0){
            console.log("Hay un problema amiguito")
        }else{
            c = data.insertId;
            ServiceDAO.getService(c,(data)=>{
                if (data.affectedRows === 0){
                    res.redirect('/home/main')
                }else {
                    listService = data;
                    for (const item of listService){
                        acumulador = acumulador + item.price;
                    }
                    res.render('carrito',{shopping : listService, idC:c, acum:acumulador});
                }
            })
        }
    })
})
/*Carrito de compras*/
router.post('/addService', (req, res) => {
    let acumulador = 0;
    let service = {
        servicio : req.body.servicio,
        cars_id : c,
        price : req.body.price
    }
    ServiceDAO.postService(service,(data)=>{
        if (data.affectedRows === 0){
            console.log("Hay un problema amiguito")
        }else{
            console.log(data.insertId);
            ServiceDAO.getService(c,(data)=>{
                if (data.affectedRows === 0){
                    res.redirect('/home/main')
                }else {
                    listService = data;
                    for (const item of listService){
                        acumulador = acumulador + item.price;
                    }
                    res.render('carrito',{shopping : listService, idC : c, acum:acumulador});
                }
            })
        }
    })
})

module.exports = router;