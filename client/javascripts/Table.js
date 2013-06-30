/**
 * Table
 */
var Table = function(table_name, callback) {
    /**
     * List of columns
     */
    this.columns = [];
    
    
    /**
     * List of rows
     */
    this.rows = [];
    
    
    /**
     * Name of table in database
     */
    this.table_name = table_name;
    
    
    /**
     * Initialise table object
     */
    this.init = function() {
        this.db = new DBConnection();
        var table = this;
        
        this.buildColumns(function() {
            table.getInitialData(function() {
                callback();
            });
        });
        
        // Get statistics about table:
        this.getStatistics(function(num_rows) {
            console.log(num_rows);
        });
    };
    
    
    /**
     *
     */
    this.buildColumns = function(callback) {
        var table = this;
        
        this.db.queryOrLogout('SHOW columns FROM ' + this.table_name + ';', function (rows) {
            _.each(rows, function(row) {
                table.addColumn(row);
            });
            
            if (callback) {
                callback();
            }
        });
    };
    
    
    /**
     *
     */
    this.getInitialData = function(callback) {
        var table = this;
        var sql = _.str.sprintf("SELECT * FROM %s LIMIT 50;", this.table_name);
        
        this.db.queryOrLogout(sql, function (rows) {
            _.each(rows, function(row) {
                table.addRow(row);
            });
            
            console.log(rows);
            
            if (callback) {
                callback();
            }
        });
    };
    
    
    /**
     * Get statistics for table
     *
     * @param callback
     *
     * @return void
     */
    this.getStatistics = function(callback) {
        var sql = "SELECT COUNT(*) AS num_rows FROM " + this.table_name;
        this.db.query(sql, function (err, rows) {
            if (err) {
                return callback(false);
            }
            
            if (callback) {
                callback(rows[0]['num_rows']);
            }
        });
    };
    
    
    /**
     *
     */
    this.addColumn = function (row) {
        this.columns.push(row);
        this.renderView();
    };
    
    
    /**
     *
     */
    this.getColumns = function () {
        return this.columns;
    };
    
    
    
    /**
     * Add row to table
     */
    this.addRow = function (row) {
        this.rows.push(row);
        this.renderView();
    };
    
    
    /**
     * Return list of rows
     */
    this.getRows = function () {
        return this.rows;
    };
    
    
    /**
     * Set view
     */
    this.setView = function (view) {
        this.view = view;
        this.renderView();
    }
    
    
    /**
     *
     */
    this.renderView = function() {
        if (this.view) {
            console.log('Rendering view');
            this.view.render();
        }
    }
    
    
    /**
     *
     */
    this.init();
};
