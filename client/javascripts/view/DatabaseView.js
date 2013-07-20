/**
 * View tables in the sidebar and show statistics about the database as a
 * whole in the content area, including tips on how to optimise tables,
 * information on amount of storage used, etc.
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var DatabaseView = Backbone.View.extend({
    /**
     * Store database_name for displaying on the information screen.
     * @param  {Object} parameters Object parameters
     * @return {undefined}
     */
    initialize: function(parameters) {
        this.database_name = parameters.database_name;
    },
    
    /**
     * Render view
     * @return {undefined}
     */
    render: function() {
        $('#main').html(_.template(
            $('#template-view-database').html(),
            {
                server_name: window.database_name,
                database_name: this.database_name
            }
        ));
    }
});
