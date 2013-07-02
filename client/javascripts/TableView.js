var TableView = Backbone.Model.extend({
    initialize: function(table) {
        this.table = table;
        this.table.setView(this);
        
        if (pane.isOpen) {
            view.setOffset(195);
        }
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
        // Add SQL editor into pane:
        var sqleditor = new SQLEditor();
        pane.render(sqleditor.render());
        
        // Clear toolbar and add items:
        toolbar.clear();
        toolbar.addItem('left', 'Console', 'terminal.png', function() {
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
