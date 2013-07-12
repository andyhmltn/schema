function return_json (res, data, status) {
    if (!status) {
        status = 200;
    }
    
    res.status(status).end(JSON.stringify(data));
}

function parse_type(type_id) {
    // Figure out type:
    for (var type in mysql.Types) {
        var key = mysql.Types[type];
        
        if (type_id == key) {
            return type;
        }
    }
    
    return false;
}

module.exports = function(app) {
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
                return_json(res, {
                    token: token,
                });
            } else {
                return_json(res, {
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
        Object.keys(app.user_connections).forEach(function(key) {
            if (key == req.param.token) {
                console.log('FOUND IT:', key);
            }
        });
        if (app.user_connections[req.param.token]) {
            return_json(res, {
            });
        } else {
            console.log(app.user_connections);
            return_json(res, {
            }, 404);
        }
    })
    
    
    /**
     * Send query to server
     */
    app.post('/api/query', function(req, res) {
        var token = req.body.token;
        var query = req.body.query;
        
        console.log("> Executing SQL: " + query);
        
        if (!app.user_connections.hasOwnProperty(token)) {
            return return_json(res, {
                error: true,
                message: 'Token invalid'
            });
        }
        
        app.user_connections[token].query(query, function(err, rows, columns) {
            if (err) {
                return return_json(res, {
                    error: true,
                    message: 'Error in query'
                });
            }
            
            // Parse columns to get datatypes, etc:
            // columns = parse_columns(columns);
            if (columns) {
                columns.forEach(function(item) {
                    if (item.type) {
                        item.type = parse_type(item.type);
                    }
                });
            }
            
            return_json(res, {
                success: true,
                rows: rows,
                columns: columns
            });
        });
    });
}
