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
        // Populate left nav (database switcher):
        database.queryOrLogout("SHOW DATABASES;", function (rows) {
            for (var row_id in rows) {
                var row = rows[row_id];
                sidebar.addItem(row.Database, '', '#/database/' + row.Database + '/', undefined, false);
            }
            sidebar.render();
            
            database.getServerInformation(function(serverInformation) {
                console.log(serverInformation);
                
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
            });
        });
    }
});
