var models = require('../models');
var qs = require('querystring');

module.exports = {
  messages: {
    get: function (req, res) { 
      console.log('GET REQUEST FOR MESSAGES');
      models.messages.get(function(err, data) {
        console.log('controller get');
        res.json(data);
      }); 
      
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('REQUEST BODY', req.body);
      var userName = req.body.username; //fix property lookup
      var message = req.body.message; //ditto
      var roomName = req.body.roomname; //double ditto
      
      models.messages.post(userName, message, roomName, function() {
        res.end();
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) { },
    
    post: function (req, res) { 
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

