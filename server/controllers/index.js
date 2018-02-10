var db = require('../db');


module.exports = {
  messages: {
    get: function (req, res) { 
      console.log('GET REQUEST FOR MESSAGES');
      db.messages.findAll({include: [db.users]})
        .then((messages) => {
          console.log(JSON.parse(messages));
          res.json(messages);
        });
      
    }, 
    post: function (req, res) {
      console.log('REQUEST BODY', req.body);

      db.users.findOrCreate({where: {'username' : req.body.username}})
        .then(function(err, user) {
          db.messages.create({
            userid: user.id, //<-- user is the param
            text: req.body.message,
            roomname: req.body.roomname,
          }).then(function(message) {
            res.sendStatus(created ? 201 : 200);
          });
        });
    } 
  },

  users: {
    get: function (req, res) { 
      console.log('GET REQUEST FOR USERS');
      db.users.findAll({})
        .then((users) => {
          res.json(messages);
        });
    },
    
    post: function (req, res) { 
      console.log(req.body);
      db.users.findOrCreate({where: {username: req.body.username}})
        .spread(function(user, created) {
          res.sendStatus(created ? 201 : 200);
        });
    }
  }
};

