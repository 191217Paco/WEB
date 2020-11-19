const mysql = require('mysql');

var connect = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: 'roo',
    database: 'Taller'
});
connect.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});



module.exports=connect;