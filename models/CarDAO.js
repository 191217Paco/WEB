const connect = require('../config/dbmysql');
let DAO ={
    postCar: (car, callback) => {
        let sql = 'INSERT INTO Cars SET ?';
        connect.query(sql,car,(err,data) =>{
            if (err) throw err;
            return callback(data);
        });
    },
    getCar: (id, callback) =>{
        let sql = 'SELECT * FROM Cars WHERE id = ?'
        connect.query(sql,id,(err,data) =>{

            if (err) throw  err;
            return callback(data);
        });
    },
    getCars: (callback) =>{
        let sql = 'SELECT * FROM Cars;';
        connect.query(sql,(err,data)=>{
            if (err) throw err;
            return callback(data);
        });
    },
    deleteCar: (id , callback) => {
        let sql = 'DELETE FROM Cars WHERE id = ?;'
        connect.query(sql,id,(err,data) =>{
            if(err) throw err;
            return callback(data);
        });
    }
}

module.exports = DAO;