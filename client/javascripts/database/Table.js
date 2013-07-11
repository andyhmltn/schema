/**
 * Table
 */
var Table = Backbone.Model.extend({
    initialize: function(table_name) {
        this.set('name', table_name);
        
        // // Set table name:
        // this.table_name = table_name;
        // this.set('name', table_name);
        
        // // Create empty arrays for columns and rows:
        // this.columns = [];
        // this.rows = [];
        
        // // Set table to this, for build columns and data callbacks:
        // var table = this;
        
        // this.buildColumns(function() {
        //     if (callback) {
        //         callback();
        //     }
        // });
        
        // // Get statistics about table:
        // this.getStatistics(function(num_rows) {
        //     $('#statusbar div.left').html(num_rows + ' rows found');
            
        //     if (num_rows <= 100) {
        //         $('#statusbar .right.btn').hide();
        //     } else {
        //         $('#statusbar .right.btn').show();
        //     }
        // });
    },
    
    
    /**
     * Build columns
     */
    // buildColumns: function(callback) {
    //     var table = this;
        
    //     database.queryOrLogout('SHOW FULL columns FROM ' + this.table_name + ';', function (rows) {
    //         _.each(rows, function(row) {
    //             table.addColumn(row);
    //         });
            
    //         if (callback) {
    //             callback();
    //         }
    //     });
    // },
    
    
    /**
     * Get statistics for table
     *
     * @param callback
     *
     * @return void
     */
    // getStatistics: function(callback) {
    //     var sql = "SELECT COUNT(*) AS num_rows FROM " + this.table_name;
    //     database.query(sql, function (err, rows) {
    //         if (err) {
    //             return callback(false);
    //         }
            
    //         if (callback) {
    //             callback(rows[0]['num_rows']);
    //         }
    //     });
    // },
    
    
    /**
     * Add column to table
     */
    // addColumn: function (row) {
    //     this.columns.push(new Column({
    //         name: row.Field,
    //         datatype: row.Type,
    //         collation: row.Collation,
    //         null: row.Null,
    //         key: row.Key,
    //         default: row.Default,
    //         extra: row.Extra,
    //         privileges: row.Privileges,
    //         comment: row.Comment,
    //         table: this
    //     }));
        
    //     this.renderView();
    // },
    
    
    /**
     * Get columns
     */
    // getColumns: function () {
    //     return this.columns;
    // },
    
    
    /**
     * Get single column
     *
     * @param string column_name Column name
     *
     * @return void
     */
    // getColumn: function(column_name) {
    //     var columns = this.getColumns();
    //     var returnColumn = false;
        
    //     _.each(columns, function(column) {
    //         if (column.get('name') == column_name) {
    //             returnColumn = column;
    //         }
    //     });
        
    //     return returnColumn;
    // },
    
    
    /**
     * Add row to table
     */
    // addRow: function (row) {
    //     this.rows.push(row);
    //     // this.renderView();
    // },
    
    
    /**
     * Return list of rows
     */
    // getRows: function () {
    //     return this.rows;
    // },
    
    
    /**
     * Set view
     */
    // setView: function (view) {
    //     this.view = view;
    //     this.renderView();
    // },
    
    
    /**
     * Render tableview
     */
    // renderView: function() {
    //     if (this.view) {
    //         this.view.render();
    //     }
    // },
    
    
    /**
     * Change a column to allow or disallow null
     *
     * @param string  column_name Column name
     * @param boolean allow_null  Whether to allow or disallow null values
     *
     * @return void
     */
    // setAllowNull: function(column_name, allow_null, success_callback, error_callback) {
    //     // Get column:
    //     var column = this.getColumn(column_name);
        
    //     // Find column and modify null setting:
    //     if (column) {
    //         column.setAllowNull(allow_null, success_callback, error_callback);
    //     } else {
    //         console.error("Could not find column");
    //     }
    // }
});
