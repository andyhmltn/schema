/**
 * Table
 */
var Table = Backbone.Model.extend({
    initialize: function(table_name) {
        this.set('name', table_name);
    },
    
    
    getFullColumns: function(callback) {
        var table = this;
        
        database.queryOrLogout('SHOW FULL columns FROM ' + table.get('name') + ';', function (columns) {
            var cols = [];
            
            _.each(columns, function(row) {
                cols.push(new Column({
                    name: row.Field,
                    datatype: row.Type,
                    collation: row.Collation,
                    null: row.Null,
                    key: row.Key,
                    default: row.Default,
                    extra: row.Extra,
                    privileges: row.Privileges,
                    comment: row.Comment,
                    table: table
                }))
            });
            
            table.set('columns', cols);
            
            if (callback) {
                callback(cols);
            }
        });
    },
    
    
    /**
     * Get single column
     *
     * @param string column_name Column name
     *
     * @return void
     */
    getColumn: function(column_name) {
        var columns = this.get('columns');
        var returnColumn = false;
        
        _.each(columns, function(column) {
            if (column.get('name') == column_name) {
                returnColumn = column;
            }
        });
        
        return returnColumn;
    },
    
    
    /**
     * Change a column to allow or disallow null
     *
     * @param string  column_name Column name
     * @param boolean allow_null  Whether to allow or disallow null values
     *
     * @return void
     */
    setAllowNull: function(column_name, allow_null, success_callback, error_callback) {
        // Get column:
        var column = this.getColumn(column_name);
        
        // Find column and modify null setting:
        if (column) {
            column.setAllowNull(allow_null, success_callback, error_callback);
        } else {
            console.error("Could not find column");
        }
    }
});
