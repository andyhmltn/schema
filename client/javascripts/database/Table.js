/**
 * Database table
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var Table = Backbone.Model.extend({
    /**
     * Initialise object and store table name
     * @param  {String} table_name Name of table that object is representing
     * @constructor
     * @return {undefined}
     */
    initialize: function(table_name) {
        this.set('name', table_name);
    },
    
    
    /**
     * Get full column information from MySQL for the table.
     * @param  {Function} callback Function to be called (with the results)
     *                             once the query has finished executing
     * @return {undefined}
     */
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
     * @param {String} column_name Column to retrieve
     * @return {Column|Boolean} False if column could not be found,
     *                          Column otherwise.
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
     * @param  {String} columnName        Name of column
     * @param  {Boolean} allowNull        Whether to allow or disallow null
     * @param  {Function} successCallback Function called when successful
     * @param  {Function} errorCallback   Function called when an error occurred
     * @return {undefined}
     */
    setAllowNull: function(columnName, allowNull, successCallback, errorCallback) {
        // Get column:
        var column = this.getColumn(columnName);
        
        // Find column and modify null setting:
        if (column) {
            column.setAllowNull(allowNull, successCallback, errorCallback);
        } else {
            console.error("Could not find column");
        }
    }
});
