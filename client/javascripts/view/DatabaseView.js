/**
 * View tables in the sidebar and show statistics about the database as a
 * whole in the content area, including tips on how to optimise tables,
 * information on amount of storage used, etc.
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var DatabaseView = Backbone.View.extend({
    /**
     * Store database_name for displaying on the information screen.
     * @param  {Object} parameters Object parameters
     * @return {undefined}
     */
    initialize: function(parameters) {
        this.database_name = parameters.database_name;
    },
    
    /**
     * Render view
     * @return {undefined}
     */
    render: function() {
        // Set loading:
        view.setLoading(true);
        
        // Assign this to variable for callbacks:
        var database_view = this;
        
        // Populate left nav (database switcher):
        database.queryOrLogout('USE `' + database_view.database_name + '`;', function (rows) {
            database.queryOrLogout('SHOW TABLES;', function (rows) {
                sidebar.clear();
                
                _.each(rows, function (row) {
                    var table_name = row[_.keys(row)[0]];
                    sidebar.addItem(
                        table_name,
                        '',
                        '#/database/' + database_view.database_name + '/' + table_name + '/',
                        undefined,
                        false
                    );
                });
                
                // Render sidebar:
                sidebar.render();
                
                // Render template:
                $('#main').html(_.template(
                    $('#template-view-database').html(),
                    {
                        server_name: window.server_name,
                        database_name: database_view.database_name,
                        num_tables: rows.length
                    }
                ));
                
                // Stop loading:
                view.setLoading(false);
            });
        });
    }
});
