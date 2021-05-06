const connect = require('../config/dbmysql');

module.exports = {
    finUser: (username, callback) => {
        console.log("dato entrante DAO "+ username);
        let sql = 'SELECT * FROM Taller.User WHERE username = ?';
        connect.query(sql, username,(err, data) => {
            if (err) throw err;
            if (data.length>0) return callback(data[0]);
            return callback(null);
        });
    },
    insertUser: (user, callback) => {
        let sql = 'INSERT INTO User SET ?';
        connect.query(sql,user,(err,data) =>{
            if (err) throw err;
            return callback(data);
        });
    },
    getAllUser:(callback) =>{
        let sql = 'SELECT * FROM User';
        connect.query(sql,(err,data)=>{
            if (err) throw err;
            if (data.length>0) return callback(data);
            return callback(null);
        });
    },
    updateUser:(user,callback)=>{
        let sql= 'UPDATE user SET nombre=?,apellidoPaterno=?,apellidoMaterno=? WHERE idUser=?';
        bd.query(sql,[user.nombre,user.apellidoPaterno,user.apellidoMaterno,user.idUser],(err,data)=>{
            if (err)throw err;
            return callback(data);
        });
    },
    updatePassword:(user,callback)=>{
        let sql= 'UPDATE user SET password=? WHERE idUser=?';
        connect.query(sql,[user.password,user.idUser],(err,data)=>{
            if (err)throw err;
            return callback(data);
        });
    },
    deleteUser:(idUser,callback)=>{
        let sql= 'DELETE FROM user WHERE idUser=?';
        connect.query(sql,idUser,(err,data)=>{
            if (err)throw err;
            return callback(data);
        })
    }
};