mysql = require('mysql');

module.exports = {
    /**
     * Generate a 32 character unique alphanumeric string that does not exist
     * as a key in a collection.
     *
     * @param collection collection Collection to check token against
     *
     * @return string Unique token
     */
    getUniqueIDAgainstCollection: function (collection) {
        while (true) {
            // Generate token:
            var token = "";
            for (var i = 0; i < 32; ++i) {
                token += Math.random().toString(36).slice(2,3);
            }
            
            // Check if it's inside the collection:
            if (!collection.hasOwnProperty(token)) {
                return token;
            }
        }
    },
    
    
    /**
     * Make database connection
     *
     * @param string   hostname Hostname or IP of database
     * @param string   username Database username
     * @param string   password Database password
     * @param string   port     Port to connect to database on
     * @param callable callback Callback to fire when connection is made, or fails.
     *
     * @return void
     */
    makeDBConnection: function (hostname, username, password, port, callback) {
        // Generate unique token:
        var token = this.getUniqueIDAgainstCollection(app.user_connections);
        
        // Create connection:
        app.user_connections[token] = mysql.createConnection({
            host: hostname,
            user: username,
            password: password
        });
        
        // Connect and fire callback:
        app.user_connections[token].connect(function(err) {
            if (err) {
                callback(false);
            }
            
            callback(token);
        });
    }
}
