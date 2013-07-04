/**
 * SQL editor
 */
var SQLEditor = Backbone.Model.extend({
    /**
     * Set query
     */
    initialize: function(query) {
        if (!query) {
            query = "";
        }
        
        this.query = query;
    },
    
    
    /**
     * Return rendered SQLEditor
     */
    render: function() {
        return _.template($('#template-sql-editor').html(), {
            query: this.query
        });
    }
});
