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
                
                statusbar.clear('main .left').addMainViewButton("Add New Row", function() {
                    // Add empty row:
                    var row = {};
                    
                    _.each(columns, function(column) {
                        var value = "";
                        var datatype = column.getDatatype().toUpperCase();
                        
                        if (datatype == 'DATETIME') {
                            value = '0000-00-00 00:00:00';
                            value = new Date();
                        }
                        if (datatype == 'DATE') {
                            value = '0000-00-00';
                            value = new Date();
                        }
                        if (datatype == 'TIME') {
                            value = '00:00';
                            value = new Date();
                        }
                        if (datatype == 'YEAR') {
                            value = '0000';
                            value = new Date();
                        }
                        if (datatype == 'TIMESTAMP') {
                            value = new Date();
                        }
                        
                        row[column.get('name')] = value;
                    });
                    
                    var newRow = _.template($('#template-row').html(), {
                        row: row,
                        columns: columns,
                        edit: true
                    });
                    
                    $('#tableview table tbody').append(newRow);
                    
                    // Scroll to it:
                    var DOMtableview = $('#tableview')[0];
                    $(DOMtableview).scrollTop(DOMtableview.scrollHeight);
                    
                    tableview.bindInputs();
                    
                    $('#tableview tbody tr.newRow td:first-child input').select();
                    
                    statusbar.addMainViewButton("Save changes", function() {
                        $('#tableview tbody tr.newRow').each(function(row) {
                            
                        });
                        $(this).remove();
                    });
                });
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
        // Build order by clause:
        var order_by = '';
        if (this.order_field_name) {
            order_by = _.str.sprintf(
                ' ORDER BY %s %s ',
                this.order_field_name,
                this.order_direction
            );
        }
        
        // Build SQL for retrieving rows for tableview:
        var sql = _.str.sprintf(
            "SELECT * FROM `%s` %s LIMIT %d, %d;",
            table.get('name'),
            order_by,
            offset,
            limit
        );
        
        database.query(sql, function(err, rows) {
            // Check to see if any errors occurred:
            if (err) {
                alert("Error - could not execute query to retrieve table rows");
                return;
            }
            
            // Build SQL for getting total number of rows:
            var sql = _.str.sprintf(
                "SELECT COUNT(*) as c FROM `%s`;",
                table.get('name')
            );
            
            // Query database for the number of rows and then execute the
            // callback, if it's valid, with the rows and the row count:
            database.query(sql, function(err, count_rows) {
                // Check for an error - default number of rows to 0 if there
                // is an error, and log to console:
                if (err) {
                    console.error(
                        "An error occurred whilst calculating number of rows for `%s`",
                        table.get('name')
                    );
                    
                    var num_rows = 0;
                } else {
                    var num_rows = count_rows[0]['c'];
                }
                
                // Check the callback and, if valid, return with results:
                if (callback) {
                    callback(rows, num_rows);
                }
            });
        });
    },
    
    
    /**
     * Bind to tableview inputs
     * @return {undefined}
     */
    bindInputs: function() {
        var tableview = this;
        
        $(this.selector).off();
        
        // Select cell if double-clicked on:
        $(this.selector).on('dblclick', 'tbody td', function() {
            var currentValue = $(this).text();
            
            var column = tableview.table.getColumn($(this).attr('data-column-name'));
            
            var cell = new Cell({
                column: column,
                cell: $(this),
                tableview: tableview
            });
            
            cell.editCell(function(value) {
                if (value != currentValue) {
                    cell.save(value);
                }
            });
        });
        
        $('#statusbar, .titlebar').off();
        
        // Bind to onclick on the pagination buttons in the titlebar:
        $('#statusbar, .titlebar').on('click', '.btn', function() {
            if ($(this).hasClass('next')) {
                tableview.nextPage();
            } else if ($(this).hasClass('prev')) {
                tableview.prevPage();
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
