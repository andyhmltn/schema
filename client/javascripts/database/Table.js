/**
 * Table
 */
var Table = Backbone.Model.extend({
    initialize: function(table_name, callback) {
        this.table_name = table_name;
        this.columns = [];
        this.rows = [];
        
        var table = this;
        
        this.buildColumns(function() {
            table.getInitialData(function() {
                callback();
            });
        });
        
        // Get statistics about table:
        this.getStatistics(function(num_rows) {
            console.log("Need to add number of rows to toolbar:", num_rows);
        });
    },
    
    /**
     *
     */
    buildColumns: function(callback) {
        var table = this;
        
        database.queryOrLogout('SHOW columns FROM ' + this.table_name + ';', function (rows) {
            _.each(rows, function(row) {
                table.addColumn(row);
            });
            
            if (callback) {
                callback();
            }
        });
    },
    
    
    /**
     *
     */
    getInitialData: function(callback) {
        var table = this;
        var sql = _.str.sprintf("SELECT * FROM %s LIMIT 50;", this.table_name);
        
        database.queryOrLogout(sql, function (rows) {
            _.each(rows, function(row) {
                table.addRow(row);
            });
            
            if (callback) {
                callback();
            }
        });
    },
    
    
    /**
     * Get statistics for table
     *
     * @param callback
     *
     * @return void
     */
    getStatistics: function(callback) {
        var sql = "SELECT COUNT(*) AS num_rows FROM " + this.table_name;
        database.query(sql, function (err, rows) {
            if (err) {
                return callback(false);
            }
            
            if (callback) {
                callback(rows[0]['num_rows']);
            }
        });
    },
    
    
    /**
     *
     */
    addColumn: function (row) {
        this.columns.push(new Column({
            default: row.Default,
            extra: row.Extra,
            name: row.Field,
            key: row.Key,
            null: row.Null,
            datatype: row.Type
        }));
        
        this.renderView();
    },
    
    
    /**
     *
     */
    getColumns: function () {
        return this.columns;
    },
    
    
    /**
     * Get single column
     *
     * @param string column_name Column name
     *
     * @return void
     */
    getColumn: function(column_name) {
        var columns = this.getColumns();
        var returnColumn = false;
        
        _.each(columns, function(column) {
            if (column.get('name') == column_name) {
                returnColumn = column;
            }
        });
        
        return returnColumn;
    },
    
    
    /**
     * Add row to table
     */
    addRow: function (row) {
        this.rows.push(row);
        this.renderView();
    },
    
    
    /**
     * Return list of rows
     */
    getRows: function () {
        return this.rows;
    },
    
    
    /**
     * Set view
     */
    setView: function (view) {
        this.view = view;
        this.renderView();
    },
    
    
    /**
     *
     */
    renderView: function() {
        if (this.view) {
            this.view.render();
        }
    }
});
