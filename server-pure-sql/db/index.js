var mysql = require('mysql');

var dbconnection = mysql.createConnection({
  user: 'student',
  password: 'student',
  database: 'chat',
  host: 'localhost'
});

dbconnection.connect();
module.exports = dbconnection;


// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


