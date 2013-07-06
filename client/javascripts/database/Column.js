/**
 * Table column
 */
var Column = Backbone.Model.extend({
    initialize: function() {
    },
    
    parseDataType: function() {
        if (this.get('parsed_datatype')) {
            return this.get('parsed_datatype');
        }
        
        var type = this.get('datatype').split(' ');
        
        this.set('parsed_datatype', type);
        return type;
    },
    
    getDataType: function() {
        var type = this.parseDataType();
        var datatype = type[0];
        
        var type_patterns = [
            'INTEGER',
            'INT',
            'SMALLINT',
            'TINYINT',
            'MEDIUMINT',
            'BIGINT',
            'DECIMAL',
            'NUMERIC',
            'FLOAT',
            'DOUBLE',
            'BIT',
            
            'CHAR',
            'VARCHAR',
            'BINARY',
            'VARBINARY',
            'BLOB',
            'TEXT',
            'ENUM',
            'SET',
            
            'DATE',
            'DATETIME',
            'TIMESTAMP',
            'TIME',
            'YEAR'
        ];
    },
    
    /**
     * Check whether the column is allowed to contain null values
     *
     * @return boolean Whether column can contain a null value
     */
    getNull: function() {
        var nullAllowed = this.get('null').toLowerCase();
        if (nullAllowed == 'yes') {
            return true;
        } else {
            return false;
        }
    },
    
    
    /**
     * Change whether column is allowed to contain null values
     *
     * @param boolean allow_null Value to change setting to
     *
     * @return void
     */
    setAllowNull: function(allow_null, success_callback, error_callback) {
        console.info("Setting allow null to", allow_null, "for column", this.get('name'));
        
        // Get parameters for SQL:
        var table_name = this.get('table').get('name');
        var column_name = this.get('name');
        var type = this.get('datatype');
        
        // Build allow_null for SQL:
        if (allow_null) {
            allow_null = "NULL";
        } else {
            allow_null = "NOT NULL";
        }
        
        // Build SQL:
        var sql = _.str.sprintf(
            "ALTER TABLE `%s` MODIFY `%s` %s %s;",
            table_name,
            column_name,
            type,
            allow_null
        );
        
        // Execute SQL and run callbacks:
        database.query(sql, function(err, rows) {
            if (err && error_callback) {
                error_callback();
            } else if (success_callback) {
                success_callback();
            }
        });
    },
    
    
    /**
     * Is column the primary key
     *
     * @return boolean True if column is a primary key
     */
    isPrimaryKey: function() {
        return this.get('key') == 'PRI';
    }
});
