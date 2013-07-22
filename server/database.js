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
    },
    
    
    /**
     * Get size of all databases on server
     * @param  {String}   token    Authentication token
     * @param  {Function} callback Function to call with result
     * @return {undefined}
     */
    getServerSize: function(token, callback) {
        var sql = "SELECT ROUND(SUM(data_length + index_length) / 1024 / 1024, 1) AS db_size ";
        sql +=    "FROM   information_schema.tables;";
        
        app.user_connections[token].query(sql, function(err, rows) {
            if (callback) {
                callback(rows[0].db_size);
            }
        });
    },
    
    
    /**
     * Get size of a specific database
     * @param  {String}   token         Authentication token
     * @param  {String}   database_name Name of database
     * @param  {Function} callback      Function to call with result
     * @return {undefined}
     */
    getDatabaseSize: function(token, database_name, callback) {
        var sql = "SELECT ROUND(SUM(data_length + index_length) / 1024 / 1024, 1) AS db_size ";
        sql +=    "FROM   information_schema.tables ";
        sql +=    "WHERE  TABLE_SCHEMA = '" + database_name + "'";
        
        app.user_connections[token].query(sql, function(err, rows) {
            if (callback) {
                callback(rows[0].db_size);
            }
        });
    },
    
    
    /**
     * Get version number of database server
     * @param  {String}   token    Authentication token
     * @param  {Function} callback Function to call with result
     * @return {undefined}
     */
    getServerVersion: function(token, callback) {
        var sql = "SHOW VARIABLES WHERE Variable_name = 'version';";
        
        app.user_connections[token].query(sql, function(err, rows) {
            if (callback) {
                callback(rows[0].Value);
            }
        });
    },
    
    
    /**
     * Get charset in use on database server
     * @param  {String}   token    Authentication token
     * @param  {Function} callback Function to call with result
     * @return {undefined}
     */
    getServerCharset: function(token, callback) {
        var sql = "SHOW VARIABLES WHERE Variable_name = 'character_set_system';";
        
        app.user_connections[token].query(sql, function(err, rows) {
            if (callback) {
                callback(rows[0].Value);
            }
        });
    },
}
