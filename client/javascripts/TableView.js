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
        // Clear toolbar and add items:
        toolbar.clear();
        toolbar.addItem('left', 'Servers', '', function() {
            pane.toggle();
        });
        
        // Render HTML:
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
