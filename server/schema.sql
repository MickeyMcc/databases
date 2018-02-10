DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id INT AUTO_INCREMENT,
  user_name VARCHAR(25),
  PRIMARY KEY (user_id)
);

DROP TABLE IF EXISTS messages; 

CREATE TABLE messages (
  id INT AUTO_INCREMENT,
  text VARCHAR(300),
  user_id INT NOT NULL,
  room_name varchar(25) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

