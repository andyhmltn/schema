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
                        limit: limit
                    }
                ));
                
                // Bind inputs:
                tableview.bindInputs();
                
                // Stop loading:
                contentview.setLoading(false);
            });
        });
    },
    
    
    getRows: function(offset, limit, callback) {
        var sql = _.str.sprintf(
            "SELECT SQL_CALC_FOUND_ROWS * FROM `%s` LIMIT %d, %d;",
            table.get('name'),
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
        
        // Select cell if double-clicked on:
        $(this.selector).on('dblclick', 'tbody td', function() {
            $(this).addClass('active').attr('contenteditable', 'true').selectText();
        });
        
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
            
            database.query(sql, function(err) {
                if (err) {
                    console.log('error updating');
                } else {
                    console.log('updated');
                }
            });
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
