/**
 * TableView
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var TableView = Backbone.View.extend({
    /**
     * jQuery selector for the TableView
     * @type {String}
     */
    selector: '#main .tableview',
    
    
    /**
     * Number of records to offset by
     * @type {Number}
     */
    offset: 0,
    
    
    /**
     * Number of results to return per page
     * @type {Number}
     */
    limit: 100,
    
    
    /**
     * Field to order by
     * @type {String}
     */
    order_field_name: '',
    
    
    /**
     * Direction to order fields
     * @type {String}
     */
    order_direction: 'desc',
    
    
    /**
     * Initialise view
     * @param  {String} table Table to view
     * @return {undefined}
     */
    initialize: function(table) {
        this.table = table;
        
        // Remove previous bindings:
        $('#statusbar').off();
    },
    
    
    /**
     * Render view
     * @return {undefined}
     */
    render: function() {
        console.info("Rendering tableview");
        
        var tableview = this;
        var offset = this.offset;
        var limit = this.limit;
        
        tableview.table.getFullColumns(function(columns) {
            tableview.getRows(offset, limit, function(rows, num_rows) {
                // Save number of rows:
                tableview.num_rows = num_rows;
                
                // Render HTML:
                $('#main').html(_.template(
                    $('#template-tableview').html(),
                    {
                        tableview: tableview,
                        columns: columns,
                        rows: rows,
                        num_rows: num_rows,
                        offset: offset,
                        limit: limit,
                        order_field: tableview.order_field_name
                    }
                ));
                
                // Bind inputs:
                tableview.bindInputs();
                
                // Stop loading:
                contentview.setLoading(false);
            });
        });
    },
    
    
    /**
     * Get table rows
     * @param  {Number}   offset   MySQL offset
     * @param  {Number}   limit    MySQL limit
     * @param  {Function} callback Function to call with results
     * @return {undefined}
     */
    getRows: function(offset, limit, callback) {
        var order_by = '';
        if (this.order_field_name) {
            order_by = _.str.sprintf(
                ' ORDER BY %s %s ',
                this.order_field_name,
                this.order_direction
            );
        }
        
        var sql = _.str.sprintf(
            "SELECT SQL_CALC_FOUND_ROWS * FROM `%s` %s LIMIT %d, %d;",
            table.get('name'),
            order_by,
            offset,
            limit
        );
        
        database.queryOrLogout(sql, function(rows, num_rows) {
            if (callback) {
                callback(rows, num_rows);
            }
        });
    },
    
    
    /**
     * Bind to tableview inputs
     * @return {undefined}
     */
    bindInputs: function() {
        var tableview = this;
        
        // Bind to save:
        this.bindSave();
        
        // Select cell if double-clicked on:
        $(this.selector).on('dblclick', 'tbody td', function() {
            $(this).addClass('active').attr('contenteditable', 'true').selectText();
        });
        
        // Bind to onclick on the pagination buttons in the titlebar:
        $('#statusbar, .titlebar').on('click', '.btn', function() {
            if ($(this).hasClass('next')) {
                tableview.nextPage();
            } else if ($(this).hasClass('prev')) {
                tableview.prevPage();
            }
        });
        
        // If enter key is pressed, send "blur" event to save the field:
        $(this.selector).on('keydown', 'td', function(e) {
            if (e.keyCode == '13') {
                e.preventDefault();
                $(this).blur();
            }
        });
        
        // Bind to column headings:
        $(this.selector).find('thead th').click(function() {
            var orderBy = $(this).attr('data-column-name');
            tableview.orderBy(orderBy);
        });
    },
    
    
    /**
     * Order by field
     * @param  {String} field_name Field to order by
     * @return {undefined}
     */
    orderBy: function(field_name) {
        if (this.order_field_name == field_name) {
            if (this.order_direction == 'desc') {
                this.order_direction = 'asc';
            } else {
                this.order_direction = 'desc';
            }
        } else {
            this.order_field_name = field_name;
            this.order_direction = 'desc';
        }
        
        contentview.setLoading(true);
        this.render();
    },
    
    
    bindSave: function() {
        var tableview = this;
        
        // Deselect cell if user moves on:
        $(this.selector).on('blur', 'tbody td.active', function() {
            // Remove edit attributes:
            $(this).removeClass('active').removeAttr('contenteditable');
            
            // Check there is a primary key:
            if ($(this).parent().find('.primary').length < 1) {
                alert('No primary key - unable to identify the cell in order to save it.');
                return false;
            }
            
            // Build where clause:
            var where = '1 = 1 ';
            
            // Get primary keys:
            _.each($(this).parent().find('.primary'), function(item) {
                var key = $(item).attr('data-column-name');
                var val = $(item).attr('data-value');
                
                where = where + _.str.sprintf(' AND %s = "%s" ', key, val);
            });
            
            // Build SQL:
            var column = $(this).attr('data-column-name');
            var value = $(this).text();
            var sql = _.str.sprintf("UPDATE `%s` SET %s = '%s' WHERE %s", tableview.table.get('name'), column, value, where);
            
            var cell = this;
            $(cell).addClass('loading');
            $(cell).animate({
                'text-indent': '12px',
                'background-position': '2px'
            }, 300);
            $(cell).css('background', '');
            
            database.query(sql, function(err) {
                $(cell).animate({
                    'text-indent': '0px',
                    'background-position': '-20px'
                }, 300, function() {
                    $(cell).removeClass('loading');
                    
                    if (err) {
                        $(cell).css('background', 'red');
                    }
                });
            });
        });
    },
    
    
    /**
     * Calculate the offset for advancing to the next page of query results
     * @return {Boolean} True if page could be changed, false otherwise
     */
    nextPage: function() {
        if (this.offset + this.limit < this.num_rows) {
            contentview.setLoading(true);
            this.offset += this.limit;
            this.render();
            return true;
        }
        return false;
    },
    
    
    /**
     * Calculate the offset for returning to the previous page of query results
     * @return {Boolean} True if page could be changed, false otherwise
     */
    prevPage: function() {
        if (this.offset - this.limit >= 0) {
            contentview.setLoading(true);
            this.offset -= this.limit;
            this.render();
            return true;
        }
        return false;
    }
});
