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
     * Get datatype without any other parameters or information
     *
     * @return string Datatype
     */
    getRawDatatype: function() {
        var parts = this.parseDataType();
        var type = parts[0];
        
        var bracket_location = type.indexOf('(');
        if (bracket_location == -1) {
            return type.trim();
        }
        
        return type.substr(0, bracket_location);
    },
    
    
    /**
     * Is column datatype an integer of some sort
     *
     * @return boolean
     */
    isIntegerType: function() {
        var integer_patterns = [
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
            'BIT'
        ];
        
        // Get raw datatype:
        var datatype = this.getRawDatatype();
        
        for (var i = 0; i < integer_patterns.length; i++) {
            var pattern = integer_patterns[i];
            
            if (pattern.toLowerCase() == datatype.toLowerCase()) {
                return true;
            }
        }
        
        return false;
    },
    
    
    /**
     * Is column datatype a string of some sort
     *
     * @return boolean
     */
    isStringType: function() {
        
    },
    
    
    /**
     * Is column datatype date/time related
     *
     * @return boolean
     */
    isDateType: function() {
        
    },
    
    
    /**
     * Is column the primary key
     *
     * @return boolean True if column is a primary key
     */
    isPrimaryKey: function() {
        return this.get('key') == 'PRI';
    },
    
    
    /**
     * Is column unsigned
     *
     * @return boolean True if column is unsigned
     */
    isUnsigned: function() {
        return this.get('datatype').search("unsigned") > -1;
    },
    
    
    /**
     * Is column able to be unsigned (e.g. it's an integer)
     *
     * @return boolean True if column can be unsigned
     */
    isUnsignedValid: function() {
        // if (this.isUnsigned()) {
        //     return true;
        // }
        if (this.isIntegerType()) {
            return true;
        }
        
        return false;
    },
    
    
    /**
     * Get field maximum length
     *
     * @return integer Length
     */
    getLength: function() {
        var type = this.get('datatype');
        var regex = /[0-9]+/;
        var matches = regex.exec(type);
        
        if (matches) {
            return matches[0];
        }
        
        return null;
    },
    
    
    /**
     * Change name of column
     *
     * @param string column_name     Old column name
     * @param string new_column_name New column name
     *
     * @return void
     */
    changeFieldName: function(new_column_name, callback) {
        // Build SQL:
        var sql = _.str.sprintf(
            "ALTER TABLE `%s` CHANGE `%s` `%s` %s",
            this.get('table').get('name'),
            this.get('name'),
            new_column_name,
            this.get('datatype')
        );
        
        database.query(sql, callback);
    }
});
