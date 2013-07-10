var TableView = Backbone.Model.extend({
    selector: '#main .tableview',
    
    initialize: function(table) {
        this.table = table;
        this.addInitialData();
        this.table.setView(this);
        
        if (pane.isOpen) {
            view.setOffset(195);
        }
        
        var tableview = this;
        
        $('#statusbar').off();
        $('#statusbar').on('click', 'div.right.btn', function() {
            if ($(this).hasClass('next')) {
                tableview.query.nextPage();
            } else if ($(this).hasClass('prev')) {
                tableview.query.prevPage();
            }
            
            tableview.refresh();
        });
    },
    
    
    addInitialData: function() {
        var tableview = this;
        var table = this.table;
        var sql = _.str.sprintf("SELECT * FROM %s", table.get('name'));
        
        // Build query:
        this.query = new Query(sql);
        this.query.setLimit(100);
        this.query.setOffset(0);
        
        // Get SQL:
        sql = this.query.toSQL();
        
        database.queryOrLogout(sql, function (rows) {
            _.each(rows, function(row) {
                table.addRow(row);
            });
            
            tableview.render();
        });
    },
    
    
    refresh: function() {
        this.table.rows = [];
        var table = this.table;
        var tableview = this;
        
        // Get SQL:
        sql = this.query.toSQL();
        
        database.queryOrLogout(sql, function (rows) {
            _.each(rows, function(row) {
                table.addRow(row);
            });
            
            tableview.render();
        });
    },
    
    
    /**
     * Render view
     */
    render: function() {
        console.info("Rendering TableView");
        this.renderContentView();
    },
    
    
    /**
     * Render elements common to all views
     */
    renderGeneric: function() {
        var tableview = this;
        
        // Add SQL editor into pane:
        var sqleditor = new SQLEditor();
        pane.render(sqleditor.render());
        
        // Clear toolbar:
        toolbar.clear();
        
        // Add structure item to toolbar:
        toolbar.addItem('left', 'Structure', 'structure.png', function() {
            tableview.renderStructure();
        });
        
        // Add content item to toolbar:
        toolbar.addItem('left', 'Content', 'content.png', function() {
            tableview.renderContentView();
        });
        
        // Add info item to toolbar:
        toolbar.addItem('left', 'Table Info', 'info.png', function() {
            tableview.renderInfo();
        });
        
        // Add console item to toolbar:
        toolbar.addItem('left', 'Query', 'query.png', function() {
            pane.toggle();
        });
    },
    
    
    /**
     * Render content view
     */
    renderContentView: function() {
        this.renderGeneric();
        
        // Render HTML:
        $('#main').html(_.template(
            $('#template-tableview').html(),
            {
                table: this.table,
            }
        ));
        
        this.bindInputs();
    },
    
    
    /**
     * Render table structure view
     */
    renderStructure: function() {
        this.renderGeneric();
        
        // Render HTML:
        $('#main').html(_.template(
            $('#template-tablestructure').html(),
            {
                table: this.table,
            }
        ));
        
        var tableview = this;
        
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
            tableview.table.setAllowNull(column_name, allownull, null, function() {
                if (allownull) {
                    checkbox.prop('checked', false);
                } else {
                    checkbox.prop('checked', true);
                }
                
                console.error("An error occurred whilst executing SQL to alter the NULL setting");
            });
        });
        
        // Bind to field name:
        $('#structure').on('dblclick', 'td.fieldname', function() {
            $(this).attr('contenteditable', true).selectText();
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
            var column = tableview.table.getColumn(column_name);
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
                _.each(tableview.table.getRows(), function (row) {
                    row[new_column_name] = row[column_name];
                    delete row[column_name];
                });
            });
        });
        
        // If enter key is pressed, send "blur" event to save the field:
        $('#structure').on('keydown', 'td.fieldname', function(e) {
            if (e.keyCode == '13') {
                e.preventDefault();
                $(this).blur();
            }
        });
    },
    
    
    /**
     * Render table information view
     */
    renderInfo: function() {
        this.renderGeneric();
        
        // Render HTML:
        $('#main').html(_.template(
            $('#template-tableinfo').html(),
            {
                table: this.table,
            }
        ));
        
        this.bindInputs();
    },
    
    
    /**
     * Bind inputs
     */
    bindInputs: function() {
        var selector = this.selector;
        
        $(selector).find('tbody').on('dblclick', 'td', function() {
            $(selector).find('tbody td.active').removeClass('active');
            $(this).addClass('active').attr('contenteditable', 'true').selectText();
        });
        
        $(selector).on('blur', 'tbody td.active', function() {
            $(this).removeClass('active');
        });
        
        // If enter key is pressed, send "blur" event to save the field:
        $(selector).on('keydown', 'td', function(e) {
            if (e.keyCode == '13') {
                e.preventDefault();
                $(this).blur();
            }
        });
    }
});
