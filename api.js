module.exports = function(app) {
    /**
     * Authenticate user
     */
    app.post('/api/auth', function(req, res) {
        res.render('app', {});
    });
    
    /**
     * Return list of servers
     */
    app.get('/api/servers/', function(req, res) {});
    
    /**
     * Make connection to server
     */
    app.get('/api/servers/:id/', function(req, res) {});
    
    /**
     * Delete server from user's list
     */
    app.delete('/api/servers/:id/', function(req, res) {});
    
    /**
     * Modify server information
     */
    app.put('/api/servers/:id/', function(req, res) {});
    
    /**
     * Create server
     */
    app.post('/api/servers/:id/', function(req, res) {});
    
    /**
     * Send query to server
     */
    app.post('/api/servers/:id/query', function(req, res) {});
}
