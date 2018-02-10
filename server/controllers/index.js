var models = require('../models');
var qs = require('querystring');
var bodyParser = require('body-parser');

module.exports = {
  messages: {
    get: function (req, res) { 
      models.messages.get(function(err, data) {
        console.log('controller get');
        res.json(data);
      }); 
      
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('messages controller post');
      // var newMessage = '';
      // req.on('data', function(data) {
      //   newMessage += data;
      // });
      // req.on('end', function() {
      //   newMessage = qs.parse(newMessage);
      //   console.log(newMessage, 'THIS IS THE NEW MESSAGE');
      console.log('REQUEST BODY', req.body);
      var userName = req.body.username; //fix property lookup
      var message = req.body.message; //ditto
      var roomName = req.body.roomname; //double ditto
      console.log(userName, message, username);
      models.messages.post(userName, message, roomName, function() {
        res.end();
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) { },
    
    post: function (req, res) { 
      console.log('users post');
      // var newUser = [];
      // req.on('data', function(data) {
      //   newUser.push(data);
      // });
      // console.log('waiting for data to end');
      // req.on('end', function() {
      console.log('data has ended');
      newUser = req.body.username;
      //userName = newUser.username; //fix property lookup
      console.log(newUser, 'THIS IS THE NEW USER');

      models.users.post(newUser, function() {
        console.log('res end');
        res.end();
      });
    }
  }
};

