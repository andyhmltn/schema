/**
 * Cell
 * 
 * Takes a column, cell and tableview and performs editing and saving actions.
 * 
 * @author  Tim Davies <mail@timdavi.es>
 */
var Cell = Backbone.Model.extend({
    /**
     * Requires column, cell and tableview parameters.
     * @param  {Array} parameters Parameters
     * @return {undefined}
     */
    initialize: function(parameters) {
        this.column = parameters.column;
        this.cell = parameters.cell;
        this.tableview = parameters.table;
        this.table = parameters.tableview.table;
    },
    
    
    /**
     * Edit the cell
     * @param  {Function} callback Function to execute when cell editing
     *                             is finished
     * @return {undefined}
     */
    editCell: function(callback) {
        var cell = this.cell;
        var _this = this;
        
        if (this.column.isText()) {
            var textEdit = new CellSheet_Text(this);
            textEdit.onComplete(function(value) {
                _this.save(value);
            });
            textEdit.display();
        } else if (this.column.isDate()) {
            var datePicker = new CellSheet_Date(this);
            datePicker.onComplete(function(value) {
                _this.save(value);
            })
            datePicker.display();
        } else {
            // Remove any old bindings:
            $(cell).off();
            
            // Make active and enable editing:
            $(cell).addClass('active')
                        .attr('contenteditable', 'true')
                        .selectText();
            
            // Check for user pressing enter:
            $(cell).keydown(function(e) {
                if (e.keyCode == '13') {
                    e.preventDefault();
                    $(cell).blur();
                }
            });
            
            // When the user clicks away from field, return the new value:
            $(cell).blur(function() {
                callback($(cell).text());
            });
        }
    },
    
    
    /**
     * Set loading/saving status
     * @param  {Boolean} status Whether to turn loading/saving on or off
     * @return {undefined}
     */
    setLoading: function(status) {
        var cell = this.cell;
        
        if (status) {
            // Start animation to indicate it's saving:
            $(cell).addClass('loading');
            $(cell).animate({
                'text-indent': '12px',
                'background-position': '2px'
            }, 300);
            
            $(cell).css('background', '');
        } else {
            $(cell).removeClass('active').removeAttr('contenteditable');
            
            $(cell).animate({
                'text-indent': '0px',
                'background-position': '-20px'
            }, 300, function() {
                $(cell).removeClass('loading');
            });
            
        }
    },
    
    
    /**
     * Save new value
     * @param  {String} value New value to save
     * @return {undefined}
     */
    save: function(value) {
        var cell = this.cell;
        var _this = this;
        
        this.setLoading(true);
        
        $(cell).text(value);
        
        // Check there is a primary key:
        if ($(cell).parent().find('.primary').length < 1) {
            alert('No primary key - unable to identify the cell in order to save it.');
            return false;
        }
        
        // Build where clause:
        var where = '1 = 1 ';
        
        // Get primary keys:
        _.each($(cell).parent().find('.primary'), function(item) {
            var key = $(item).attr('data-column-name');
            var val = $(item).attr('data-value');
            
            where = where + _.str.sprintf(' AND %s = "%s" ', key, val);
        });
        
        // Get column:
        var column = $(cell).attr('data-column-name');
        
        // Build SQL:
        var sql = _.str.sprintf(
            "UPDATE `%s` SET %s = '%s' WHERE %s",
            this.table.get('name'),
            column, value, where
        );
        
        // Execute query and return:
        database.query(sql, function(err, rows) {
            _this.setLoading(false);
        });
    },
    
    
    /**
     * Get value in field
     * @return {String}
     */
    getValue: function() {
        return $(this.cell).text();
    }
});
