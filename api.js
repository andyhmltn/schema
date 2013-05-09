function return_json (res, data, status) {
    if (!status) {
        status = 200;
    }
    
    res.status(status).end(JSON.stringify(data));
}

module.exports = function(app) {
    /**
     * Authenticate user
     */
    app.post('/api/auth', function(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        
        app.database.getUser(email, password, function(user) {
            if (user) {
                // Add connection:
                var uniq = 'id' + (new Date()).getTime();
                app.user_connections[uniq] = {
                    email: email,
                    databases: {
                    }
                };
                
                return_json(res, {
                    message: 'Logged in',
                    email: email,
                    token: uniq,
                });
            } else {
                return_json(res, {
                    message: 'Incorrect username or password'
                }, 401);
            }
        });
    });
    
    
    /**
     * Log user out, close their DB connections, etc.
     */
    app.delete('/api/auth/:token', function(req, res) {
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
     * Return list of servers
     */
    app.get('/api/servers', function(req, res) {
        return_json(res, [
            {
                id: 'foobarbaz0',
                name: 'Development',
                hostname: '127.0.0.1',
            },
            {
                id: 'foobarbaz1',
                name: 'Production',
                hostname: 'ariel.snowdon.ripple',
            },
            {
                id: 'foobarbaz2',
                name: 'Staging',
                hostname: 'timdavi.es',
            },
        ]);
    });
    
    /**
     * Make connection to server
     */
    app.get('/api/servers/:id/', function(req, res) {
        return_json(res, {
        });
    });
    
    /**
     * Delete server from user's list
     */
    app.delete('/api/servers/:id/', function(req, res) {
        return_json(res, {
        });
    });
    
    /**
     * Modify server information
     */
    app.put('/api/servers/:id/', function(req, res) {
        return_json(res, {
        });
    });
    
    /**
     * Create server
     */
    app.post('/api/servers/:id/', function(req, res) {
        return_json(res, {
        });
    });
    
    /**
     * Send query to server
     */
    app.post('/api/servers/:id/query', function(req, res) {
        return_json(res, {
        });
    });
}
