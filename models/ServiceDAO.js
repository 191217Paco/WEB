const connect = require('../config/dbmysql')
let DAO = {
    postService: (service, callback) => {
        let sql = 'INSERT INTO Service SET ?';
        connect.query(sql,service,(err,data) =>{
            if (err) throw err;
            return callback(data);
        });
    },
    getService: (id, callback) =>{
        let sql = 'SELECT * FROM Service WHERE cars_id = ?;'
        connect.query(sql,id,(err,data) =>{
            if (err) throw  err;
            return callback(data);
        });
    },
    getServices: (callback) =>{
        let sql = 'SELECT * FROM Services;';
        connect.query(sql,(err,data)=>{
            if (err) throw err;
            return callback(data);
        });
    },
    deleteService: (id , callback) => {
        let sql = 'DELETE FROM Service WHERE id = ?;'
        connect.query(sql,id,(err,data) =>{
            if(err) throw err;
            return callback(data);
        });
    }
}
module.exports = DAO;