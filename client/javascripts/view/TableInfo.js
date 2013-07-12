var TableInfo = Backbone.View.extend({
    initialize: function(table) {
        this.table = table;
    },
    
    /**
     * Render view
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
    }
});
