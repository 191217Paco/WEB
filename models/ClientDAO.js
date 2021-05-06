const connect = require('../config/dbmysql');
var DAO ={
    insertClient: (client, callback) => {
        let sql = 'INSERT INTO Client SET ?';
        connect.query(sql,client,(err,data) =>{
            if (err) throw err;
            return callback(data);
        });
    },
    getClient: (id, callback) =>{
       let sql = 'SELECT * FROM Client WHERE id = ?'
        console.log(sql+id);
       connect.query(sql,id,(err,data) =>{
           console.log("DAOOOOOO "+ data.id)
           if (err) throw  err;
           return callback(data);
       });
    },
    getClients: (callback) =>{
        let sql = 'SELECT * FROM Client';
        connect.query(sql,(err,data)=>{

           if (err) throw err;
           return callback(data);
        });
    },

    deleteClient: (id , callback) => {
        console.log("DELETE FROM Client WHERE id = "+id)
        let sql = 'DELETE FROM Client WHERE id = ?'
        connect.query(sql,id,(err,data) =>{
            if(err) throw err;
            return callback(data);
        });
    },
    updateClient:(client,callback)=>{
        let sql= 'UPDATE Client SET name=?,lastname=?,email=?, phone=? WHERE id=?';
        bd.query(sql,[client.name,client.lastname,client.email,client.phone,client.id ],(err,data)=>{
            if (err)throw err;
            return callback(data);
        });
    }

}


module.exports = DAO