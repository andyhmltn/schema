/**
 * Database
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var Database = Backbone.Model.extend({
    /**
     * Make database connection via API
     * 
     * The API returns a token that can be used to make queries to the
     * database.
     * 
     * @param  {String}   hostname Database hostname
     * @param  {String}   username Database username
     * @param  {String}   password Database password
     * @param  {Number}   port     Port database is running on
     * @param  {Function} callback Function to be called once connection has
     *                             been made
     * 
     * @return {undefined}
     */
    connectToDatabase: function(hostname, username, password, port, callback) {
        $.post('/api/connect', {
            hostname: hostname,
            username: username,
            password: password,
            port: port,
        }, function(data) {
            if (data.error) {
                callback(false);
            } else {
                callback(data.token);
            }
        }, 'json');
    },
    
    
    /**
     * Query the database
     * 
     * Database queries are made via the API and involve sending the raw SQL
     * and the connection token which is obtained when the initial connection
     * is made.
     * 
     * @param  {String}   sql      SQL query to execute
     * @param  {Function} callback Function to be called when the query has
     *                             been made with the results of the query:
     *                             the rows returned, the columns and a count
     *                             of the number of rows available.
     * @return {undefined}
     */
    query: function (sql, callback) {
        $.post('/api/query', {
            token: window.token,
            query: sql
        }, function (data) {
            if (data.success) {
                callback(false, data.rows, data.columns, data.num_rows);
            } else {
                callback(true, data.rows, data.columns, data.num_rows);
            }
        }, 'json');
    },
    
    
    /**
     * Query the database and - if there is a failure - log the user out.
     * 
     * @param  {String}   sql      SQL query to execute
     * @param  {Function} callback Function to be called when the query has
     *                             been made with the results of the query:
     *                             the rows returned, the columns and a count
     *                             of the number of rows available.
     * 
     * @deprecated Deprecated - bad way of doing things.
     * 
     * @return {undefined}
     */
    queryOrLogout: function (sql, callback) {
        console.warn("Deprecated function queryOrLogout used");
        this.query(sql, function(err, rows, columns) {
            if (err) {
                window.token = '';
                localStorage['token'] = '';
                window.location = '#/';
            } else {
                callback(rows);
            }
        });
    }
});
