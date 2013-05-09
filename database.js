// Create database connection:
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('settings.db');

module.exports = {
    getUser: function (email, password, callback) {
        sql = "SELECT * FROM users WHERE email = ? AND password = ?";
        
        db.get(sql, [email, password], function(err, row) {
            if (!err) {
                if (row) {
                    return callback(row);
                } else {
                    return callback(false);
                }
            } else {
                return callback(false);
            }
        });
    }
}
