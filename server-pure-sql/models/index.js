var db = require('../db/index.js');


module.exports = {
  
  messages: {
    get: function (callback) {
      var queryString = 'SELECT messages.id, messages.text, messages.room_name as roomname, users.user_name as username \ from messages join users on (messages.user_id = users.user_id) \ order by messages.id desc';
      //order by messages.id desc';
      db.query(queryString, function(err, res) {
        console.log(res);
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
      db.query('SELECT user_name FROM users WHERE user_name = ?', [userName], function(err, rows, field) {
        if (rows.length !== 0) {
          callback();
        } else {
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
      });
    }
  }
};

