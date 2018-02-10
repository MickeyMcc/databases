var mysql = require('mysql');
var Sequelize = require('sequelize');

var database = new Sequelize('chat', 'student', 'student', {
  host: 'localhost'
});

database.authenticate()
  .then(() => {
    console.log('connection established');
  })
  .catch(() => {
    console.log('Unable to connect to the database');
  });

module.exports = database;

var User = database.define('User', {
  username: Sequelize.STRING
});

var Message = database.define('Message', {
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

Message.belongsTo(User);
User.hasMany(Message);

User.sync();
Message.sync();

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

module.exports.messages = Message;
module.exports.users = User;

