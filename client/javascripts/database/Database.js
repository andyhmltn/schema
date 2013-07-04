/**
 *
 */
var DBConnection = Backbone.Model.extend({
    /**
     *
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
     *
     */
    query: function (sql, callback) {
        $.post('/api/query', {
            token: window.token,
            query: sql
        }, function (data) {
            if (data.success) {
                callback(false, data.rows);
            } else {
                callback(true, data.rows);
            }
        }, 'json');
    },
    
    
    /**
     *
     */
    queryOrLogout: function (sql, callback) {
        this.query(sql, function(err, rows) {
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
