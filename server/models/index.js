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
      console.log('models post messages');
      db.query(`INSERT INTO messages (text, room_name, user_id)` + 
        ` VALUES ('${message}', '${roomName}', ` + 
        `(SELECT user_id FROM users WHERE user_name = '${userName}'));`, function(err, response) {
            if (err) {console.log(err)}
            else {
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
      console.log('users post');
      var queryString = `INSERT INTO users (users.user_name) VALUES ('${userName}');`;
      db.query(
        queryString, function(err, results) {
          if (err) {console.log(err, 'this is the err')}
          else {console.log(results, 'therese are teh results')}
          console.log('done!');
          callback();
        }
      );
    }
  }
};

