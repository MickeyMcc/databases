var models = require('../models');
var qs = require('querystring');

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
      newMessage = '';
      req.on('data', function(data) {
        newMessage += data;
      });
      req.on('end', function() {
        newMessage = qs.parse(newMessage);
      });
      userName = newMessage.user; //fix property lookup
      message = newMessage.message; //ditto
      roomName = newMessage.roomName; //double ditto
       
      models.messages.post(userName, message, roomName, function() {
    
        res.end();
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) { },
    post: function (req, res) { 
      newUser = '';
      req.on('data', function(data) {
        newUser += data;
      });
      req.on('end', function() {
        newUser = qs.parse(newUser);
      });
      userName = newUser.user; //fix property lookup

      models.users.post(userName, function() {
        console.log('res end');
        res.end();
      });
    }
  }
};

