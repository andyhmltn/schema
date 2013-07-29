/**
 * ServerView
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var ServerView = Backbone.View.extend({
    /**
     * Close the pane is it's open
     * @constructor
     * @return {undefined}
     */
    initialize: function() {
        if (pane.isOpen) {
            pane.close();
        }
    },
    
    
    /**
     * Render view
     * @return {undefined}
     */
    render: function() {
        var serverview = this;
        
        // Set loading:
        view.setLoading(true);
        
        // Populate sidebar with databases:
        sidebar.populateFromServer(function(rows) {
            // Get server information for 'report':
            database.getServerInformation(function(serverInformation) {
                // Get the server size:
                var server_size = parseInt(serverInformation.size);
                
                // Default unit is MB:
                var size_unit = 'MB';
                
                // Check for gigabytes:
                if (server_size >= 1000) {
                    server_size /= 1000;
                    size_unit = 'GB';
                }
                
                // Check for terabytes:
                if (server_size >= 1000) {
                    server_size /= 1000;
                    size_unit = 'TB';
                }
                
                // Make sure the output is sensible and doesn't look bad
                // in the circle:
                if (server_size.toString().indexOf('.') > -1) {
                    server_size = server_size.toFixed(1)
                }
                
                // Render template:
                $('#main').html(_.template(
                    $('#template-list-databases').html(),
                    {
                        server_name: window.server_name,
                        num_databases: rows.length,
                        size: server_size,
                        size_unit: size_unit,
                        version: serverInformation.version,
                        charset: serverInformation.charset
                    }
                ));
                
                // Stop loading:
                view.setLoading(false);
                
                // Start loading real-time queries:
                serverview.startRealTimeQueries();
            });
        });
    },
    
    
    /**
     * Get currently running queries and render
     * @return {undefined}
     */
    getRealtimeQueries: function() {
        var sql = "SHOW PROCESSLIST;"
        
        database.query(sql, function(err, result) {
            $('.section.queries').html(_.template(
                $('#template-realtime-queries').html(),
                {
                    queries: result
                }
            ));
            
        })
    },
    
    
    /**
     * Start polling for queries
     * @return {[type]} [description]
     */
    startRealTimeQueries: function() {
        if (window.realtime_queries) {
            clearInterval(window.realtime_queries);
        }
        
        window.realtime_queries = setInterval(this.getRealtimeQueries, 1000);
        this.getRealtimeQueries();
    }
});
