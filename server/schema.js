var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'student', 'stduent');
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
db.createTables = function () {

  var User = db.define('Users', {
    id: { type: Sequelize.INTEGER, 
      primaryKey: true, 
      autoIncrement: true
    },
    username: { 
      type: Sequelize.STRING, 
      unique: true
    }
  });

  var Message = db.define('Messages', {
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    text: Sequelize.STRING,
    roomname: Sequelize.STRING
  });

};


module.exports = db;

/* Sequelize comes with built in support for promises
 * making it easy to chain asynchronous operations together */
// User.sync()
//   .then(function() {
//     // Now instantiate an object and save it:
//     return User.create({username: 'Jean Valjean'});
//   })
//   .then(function() {
//     // Retrieve objects from the database:
//     return User.findAll({ where: {username: 'Jean Valjean'} });
//   })
//   .then(function(users) {
//     users.forEach(function(user) {
//         console.log(user.username + ' exists');
//     });
//     db.close();
//   })
//   .catch(function(err) {
//     // Handle any error in the chain
//     console.error(err);
//     db.close();
//   });

// CREATE DATABASE chat;

// USE chat;

// DROP TABLE IF EXISTS users;

// CREATE TABLE users (
//   user_id INT AUTO_INCREMENT,
//   user_name VARCHAR(25),
//   PRIMARY KEY (user_id)
// );

// DROP TABLE IF EXISTS messages; 

// CREATE TABLE messages (
//   id INT AUTO_INCREMENT,
//   text VARCHAR(300),
//   user_id INT NOT NULL,
//   room_name varchar(25) NOT NULL,
//   PRIMARY KEY (id),
//   FOREIGN KEY (user_id) REFERENCES users (user_id)
// );


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/