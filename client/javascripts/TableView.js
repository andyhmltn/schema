var TableView = Backbone.Model.extend({
    initialize: function(table) {
        this.table = table;
        this.table.setView(this);
    },
    
    
    /**
     *
     */
    render: function() {
        this.renderContentView();
    },
    
    
    /**
     * Render content view
     */
    renderContentView: function() {
        $('#main').html(_.template(
            $('#template-tableview').html(),
            {
                table: this.table,
            }
        ));
        
        this.bindInputs();
    },
    
    
    /**
     *
     */
    bindInputs: function() {
        
    }
});
