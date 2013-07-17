/**
 * SQL editor
 * 
 * @class
 * @author  Tim Davies <maiL@timdavi.es>
 */
var SQLEditor = Backbone.View.extend({
    /**
     * Store query and initialise object
     * @param  {String} query Query to display (blank by default)
     * @constructor
     * @return {undefined}
     */
    initialize: function(query) {
        if (!query) {
            query = "";
        }
        
        this.query = query;
    },
    
    
    /**
     * Return rendered SQLEditor
     * @return {String} Rendered HTML
     */
    render: function() {
        return _.template($('#template-sql-editor').html(), {
            query: this.query
        });
    }
});
