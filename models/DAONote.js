const connect = require('../config/dbmysql');
let DAO ={
    postNote: (note, callback) => {
        let sql = 'INSERT INTO Notes SET ?';
        connect.query(sql,note,(err,data) =>{
            if (err) throw err;
            return callback(data);
        });
    },
    getNote: (id, callback) =>{
       let sql = 'SELECT * FROM Notes WHERE id = ?;'
       connect.query(sql,id,(err,data) =>{
           if (err) throw  err;
           return callback(data);
       });
    },
    getNotes: (callback) =>{
        let sql = 'SELECT * FROM Notes;';
        connect.query(sql,(err,data)=>{
            console.log("En DAOOOO "+data)
            if (err) throw err;
            return callback(data);
        });
    },

    deleteNote: (id , callback) => {
        let sql = 'DELETE FROM Notes WHERE id = ?;'
        connect.query(sql,id,(err,data) =>{
            if(err) throw err;
            return callback(data);
        });
    }
}
module.exports = DAO;