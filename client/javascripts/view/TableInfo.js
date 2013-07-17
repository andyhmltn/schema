/**
 * TableInfo View
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var TableInfo = Backbone.View.extend({
    /**
     * Initialise object and store table
     * @param  {Table} table Table to display information about
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
        var tableview = this;
        
        // Render HTML:
        $('#main').html(_.template(
            $('#template-tableinfo').html(),
            {
                table: table,
            }
        ));
        
        contentview.setLoading(false);
    }
});
