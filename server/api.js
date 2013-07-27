module.exports = function(app) {
    var _this = this;
    
    this.return_json = function(res, data, status) {
        if (!status) {
            status = 200;
        }
        
        res.status(status).end(JSON.stringify(data));
    }

    this.parse_type = function(type_id) {
        // Figure out type:
        for (var type in mysql.Types) {
            var key = mysql.Types[type];
            
            if (type_id == key) {
                return type;
            }
        }
        
        return false;
    }
    
    
    /**
     * Make connection to database and return token which the client can
     * use to make subsequent requests to the database.
     *
     * @todo Add validation to the parameters
     * @todo Add tests
     * @todo Add PostgreSQL support
     */
    app.post('/api/connect', function(req, res) {
        var hostname = req.body.hostname;
        var username = req.body.username;
        var password = req.body.password;
        var port = req.body.port;
        
        app.database.makeDBConnection(hostname, username, password, port, function (token) {
            if (token) {
                _this.return_json(res, {
                    token: token,
                });
            } else {
                _this.return_json(res, {
                    error: true,
                    message: 'Could not connect'
                });
            }
        });
    });
    
    
    /**
     * Log user out, close their DB connections, etc.
     */
    app.post('/api/auth/:token', function(req, res) {
        if (app.user_connections[req.param.token]) {
            _this.return_json(res, {
            });
        } else {
            console.log(app.user_connections);
            _this.return_json(res, {
            }, 404);
        }
    });
    
    
    /**
     * Send query to server
     */
    app.post('/api/query', function(req, res) {
        var token = req.body.token;
        var query = req.body.query;
        
        console.log("> Executing SQL: " + query);
        
        if (!app.user_connections.hasOwnProperty(token)) {
            return _this.return_json(res, {
                error: true,
                message: 'Token invalid'
            });
        }
        
        app.user_connections[token].query(query, function(err, rows, columns) {
            if (err) {
                return _this.return_json(res, {
                    error: true,
                    message: 'Error in query'
                });
            }
            
            // Get number of rows:
            var select_rows = 'SELECT FOUND_ROWS() as num_rows;';
            app.user_connections[token].query(select_rows, function(err, num_rows) {
                // Parse columns to get datatypes, etc:
                if (columns) {
                    columns.forEach(function(item) {
                        if (item.type) {
                            item.type = _this.parse_type(item.type);
                        }
                    });
                }
                
                // Return query result:
                _this.return_json(res, {
                    success: true,
                    rows: rows,
                    columns: columns,
                    num_rows: num_rows[0].num_rows
                });
            });
        });
    });
    
    
    /**
     * Returns information on the server
     * 
     * Information includes:
     *     - Total size of all databases
     *     - Database version number
     *     - Charset in use
     * 
     * @return {undefined}
     */
    app.post('/api/server-information', function(req, res) {
        var token = req.body.token;
        
        app.database.getServerSize(token, function(size) {
            app.database.getServerVersion(token, function(version) {
                app.database.getServerCharset(token, function(charset) {
                    _this.return_json(res, {
                        success: true,
                        size: size,
                        version: version,
                        charset: charset
                    });
                });
            });
        });
    });
    
    
    /**
     * Returns information about the database
     * 
     * Information includes:
     *     - Total size of all tables
     * 
     * @return {undefined}
     */
    app.post('/api/database-information', function(req, res) {
        var token = req.body.token;
        var database_name = req.body.database_name;
        
        app.database.getDatabaseSize(token, database_name, function(size) {
            _this.return_json(res, {
                success: true,
                db_size: size
            });
        });
    });
}
