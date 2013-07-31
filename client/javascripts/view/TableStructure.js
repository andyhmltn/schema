/**
 * TableStructure View
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var TableStructure = Backbone.View.extend({
    /**
     * Initialise object and store table
     * @param  {Table} table Table to display
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
        console.info("Rendering TableStructure");
        var tablestructure = this;
        
        table.getFullColumns(function(columns) {
            $('#main').html(_.template(
                $('#template-tablestructure').html(),
                {
                    table: table,
                    columns: columns
                }
            ));
            
            tablestructure.bindInputs();
            contentview.setLoading(false);
        });
    },
    
    
    /**
     * Bind the various inputs in the view
     * @return {undefined}
     */
    bindInputs: function() {
        var tablestructure = this;
        $('#structure').off();
        
        // Bind to field name:
        $('#structure').on('dblclick', 'td.fieldname', function() {
            $(this).attr('contenteditable', true).selectText();
        });
        
        // If enter key is pressed, send "blur" event to save the field:
        $('#structure').on('keydown', 'td.fieldname', function(e) {
            if (e.keyCode == '13') {
                e.preventDefault();
                $(this).blur();
            }
        });
        
        // Save the field when user clicks away from it:
        $('#structure').on('blur', 'td.fieldname', function() {
            // Set content editable and set text colour to grey:
            $(this).attr('contenteditable', false).css('color', 'grey');
            
            // Get old column name:
            var column_name = $(this).parent().find('input.column_name').val();
            
            // Get new column name:
            var new_column_name = $(this).text();
            
            // Print debugging message:
            console.info('Changing', column_name, 'to', new_column_name);
            
            // Get column object:
            var column = tablestructure.table.getColumn(column_name);
            if (!column) {
                console.error("Could not find the column");
                return;
            }
            
            // Give this to variable for callback:
            var td = this;
            
            // Change column name:
            column.changeFieldName(new_column_name, function(err) {
                if (err) {
                    console.error("Could not change field name from", column_name, 'to', new_column_name)
                    return;
                }
                
                // Set column name as new value:
                $(td).parent().find('input.column_name').val(new_column_name);
                
                // Reset colour to indicate field change has saved:
                $(td).css('color', '');
                
                // Set name in column object:
                column.set('name', new_column_name);
                
                // Refresh data in table:
                _.each(tablestructure.table.get('rows'), function (row) {
                    row[new_column_name] = row[column_name];
                    delete row[column_name];
                });
            });
        });
        
        // Bind to Allow Null checkbox:
        $('#structure').on('click', 'input.allownull', function() {
            // Get checkbox:
            var checkbox = $(this);
            
            // Check if clicked on or clicked off:
            if (checkbox.is(':checked')) {
                var allownull = true;
            } else {
                var allownull = false;
            }
            
            // Find column name:
            var column_name = $(this).parent().parent().find('input.column_name').val();
            
            // Set allow null:
            tablestructure.table.setAllowNull(column_name, allownull, null, function() {
                if (allownull) {
                    checkbox.prop('checked', false);
                } else {
                    checkbox.prop('checked', true);
                }
                
                console.error("An error occurred whilst executing SQL to alter the NULL setting");
            });
        });
        
        // Display data type dialogue when data type is clicked on:
        $('#structure').on('click', 'td.datatype div', function() {
            // Get current row and field name:
            var currentRow = $(this).parent().parent();
            var currentColumnName = currentRow.find('input.column_name').val();
            
            // Get current data type:
            var currentDataType = $(this).text().trim();
            
            // Set data type picker template:
            sheet.setTemplate('#template-datatype-picker', {
                type: currentDataType,
                datatypeList: tablestructure.getDatatypeList()
            });
            
            // When a category is clicked on, filter the data types:
            $('#sheet .type-categories li').click(function() {
                // Remove active class from previous category:
                $('#sheet .type-categories li.active').removeClass('active');
                
                // Get category key to filter with from class:
                var category = $(this).attr('class');
                
                // Add active class to selected category:
                $(this).addClass('active');
                
                // If the category is set to 'all', show all of the data types:
                if (category == 'all') {
                    $('#sheet .type-list div').show();
                } else {
                    // Otherwise, hide all of the data types then show only
                    // those in the category clicked on:
                    $('#sheet .type-list div').hide();
                    $('#sheet .type-list div.' + category).show();
                }
            });
            
            // Function for loading the description for the currently selected
            // type into the description box:
            var loadDescription = function() {
                var datatype = $('#sheet .type-list li.active').text().trim();
                $('#datatype-desc').html(_.template($('#template-datatype-desc').html(), {
                    type: datatype,
                    description: tablestructure.getTypeDescription(datatype)
                }));
            };
            
            // Load the description for the currently selected type:
            loadDescription();
            
            // When each of the types are clicked, load its description:
            $('#sheet .type-list li').click(function() {
                $('#sheet .type-list li.active').removeClass('active');
                $(this).addClass('active');
                $('#sheet').find('input.datatype-value').val($(this).text().trim());
                loadDescription();
            });
            
            // When the cancel button is pressed, hide the sheet:
            $('#sheet button.cancel').click(function() {
                sheet.hide();
            });
            
            // When the 'Change Data Type' button is pressed, alter the
            // data type:
            $('#sheet button.complete').click(function() {
                // Hide the sheet:
                sheet.hide();
                
                // Get new data type:
                var datatype = $('#sheet').find('input.datatype-value').val();
                
                // Change data type:
                tablestructure.alterDataType(currentColumnName, datatype);
                
                // Render tablestructure again:
                tablestructure.render();
            });
            
            // Display sheet:
            sheet.show();
        });
    },
    
    
    /**
     * Returns list of categorised data types
     * @return {Array} Data types
     */
    getDatatypeList: function() {
        return {
            'numeric': [
                'INT',
                'INTEGER',
                'SMALLINT',
                'TINYINT',
                'MEDIUMINT',
                'BIGINT',
                'DECIMAL',
                'NUMERIC',
                'FLOAT',
                'DOUBLE',
                'BOOLEAN',
                'BOOL',
                'BIT'
            ],
            'string': [
                'CHAR',
                'VARCHAR',
                'TINYTEXT',
                'TEXT',
                'MEDIUMTEXT',
                'LONGTEXT',
                'TINYBLOB',
                'BLOB',
                'MEDIUMBLOB',
                'LONGBLOB',
                'BINARY',
                'VARBINARY',
                'ENUM',
                'SET'
            ],
            'datetime': [
                'DATE',
                'DATETIME',
                'TIMESTAMP',
                'TIME',
                'YEAR'
            ]
        };
    },
    
    
    /**
     * Get description of data type
     * @param  {String} type Data type name
     * @return {String} Description of data type
     */
    getTypeDescription: function(type) {
        if (datatype_definitions.hasOwnProperty(type)) {
            return datatype_definitions[type];
        }
        
        return datatype_definitions['default'];
    },
    
    
    /**
     * Change data type for a column
     * @param  {String} columnName  Column to alter
     * @param  {String} newDataType Data type to be used instead
     * @return {undefined}
     */
    alterDataType: function(columnName, newDataType) {
        var column = this.table.getColumn(columnName);
        
        // column.alterDataType(newDataType);
        // console.log(column);
        
        var sql = _.str.sprintf(
            "ALTER TABLE `%s` CHANGE `%s` `%s` %s;",
            this.table.get('name'),
            columnName,
            columnName,
            newDataType
        );
        
        database.query(sql, function(err, result) {
            if (err) {
                console.error("There was an error altering the data type");
            } else {
                console.info("Data type changed");
            }
        });
        
        console.log(sql);
    }
});
