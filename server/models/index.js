var db = require('../db/index.js');


module.exports = {
  
  messages: {
    get: function (callback) {
      var queryString = 'SELECT users.user_name, messages.text, messages.room_name FROM users, messages' +  
      ' WHERE message.user_id = users.user_id);'; 
      //order by messages.id desc';
      db.query(db.queryString, function(err, res) {
        callback(err, res);
      });
    }, // a function which produces all the messages
    post: function(userName, message, roomName, callback) {
      //var queryString = 'SELECT (userName, message, roomName) {
      var queryString = 'INSERT INTO messages (user_id, room_name, text)' + 
        ` VALUES ((SELECT user_id FROM users WHERE user_name = '${userName}'),` + 
        ` "${roomName}", "${message}");`; 
        
      db.query(queryString, function(err, response) {
        if (err) {
          console.log(err);
        } else {
          console.log('good job user posted');
          callback(response);      
        }
      });
    }
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (userName, callback) {
      var queryString = `INSERT INTO users (users.user_name) VALUES ('${userName}');`;
      db.query(
        queryString, function(err, results) {
          if (err) {
            console.log(err, 'this is the err');
          } else {
            console.log('done!');
          }
          callback();
        }
      );
    }
  }
};

