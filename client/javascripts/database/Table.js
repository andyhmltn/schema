/**
 * Table
 */
var Table = Backbone.Model.extend({
    initialize: function(table_name, callback) {
        // Set table name:
        this.table_name = table_name;
        this.set('name', table_name);
        
        // Create empty arrays for columns and rows:
        this.columns = [];
        this.rows = [];
        
        // Set table to this, for build columns and data callbacks:
        var table = this;
        
        this.buildColumns(function() {
            table.getInitialData(function() {
                if (callback) {
                    callback();
                }
            });
        });
        
        // Get statistics about table:
        this.getStatistics(function(num_rows) {
            console.warn("Need to add number of rows to toolbar:", num_rows);
        });
    },
    
    
    /**
     * Build columns
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
     * Retrieve data for initially filling tableview
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
     * Add column to table
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
     * Get columns
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
     * Render tableview
     */
    renderView: function() {
        if (this.view) {
            this.view.render();
        }
    }
});
