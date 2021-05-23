const mysql = require('mysql');
// const mysqlConfig = require('../../config.js');

// const connection =
// mysql.createConnection(mysqlConfig).connect((err) => {
//   if (err) {
//     throw err;
//   } else {
//     console.log('connected!!');
//   }
// });
var connection = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: 'chillara',
  database: 'badmovies'
});

// console.log('what is connection in db????', connection);

module.exports = {connection: connection}