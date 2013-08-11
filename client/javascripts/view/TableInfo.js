/**
 * TableInfo View
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var TableInfo = Backbone.View.extend({
    /**
     * Initialise object and store table
     * @param  {Table} table Table to display information about
     * @constructor
     * @return {undefined}
     */
    initialize: function(table) {
        this.table = table;
    },
    
    
    /**
     * Render view
     * @return {undefined}
     */
    render: function() {
        var tableview = this;
        
        statusbar.clear('main .left');
        
        // Get the syntax for creating this table:
        tableview.getTableSyntax(function(syntax) {
            
            // Get table statistics:
            tableview.getTableStatistics(function(statistics) {
                
                // Render HTML:
                $('#main').html(_.template(
                    $('#template-tableinfo').html(),
                    {
                        table: table,
                        syntax: syntax,
                        statistics: statistics
                    }
                ));
                
                // Stop loading:
                contentview.setLoading(false);
            });
        });
    },
    
    
    /**
     * Get syntax to create table
     * @param  {Function} callback Callback once query is complete
     * @return {undefined}
     */
    getTableSyntax: function(callback) {
        var sql = _.str.sprintf("SHOW CREATE TABLE `%s`;", this.table.get('name'));
        
        database.query(sql, function(err, rows) {
            callback(rows[0]["Create Table"]);
        });
    },
    
    
    /**
     * Get table information and statistics
     * @param  {Function} callback Callback once query is complete
     * @return {undefined}
     */
    getTableStatistics: function(callback) {
        var sql = _.str.sprintf("SHOW TABLE STATUS LIKE '%s';", this.table.get('name'));
        
        database.query(sql, function(err, rows) {
            callback(rows[0]);
        });
    }
});
