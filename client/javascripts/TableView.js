var TableView = Backbone.Model.extend({
    selector: '#main .tableview',
    
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
        var selector = this.selector;
        
        $(selector).find('tbody').on('click', 'td', function() {
            $(selector).find('tbody td.active').removeClass('active');
            $(this).addClass('active').attr('contenteditable', 'true');
        });
        
        $(selector).on('blur', 'tbody td.active', function() {
            console.log($(this).html());
            $(this).removeClass('active');
        });
    }
});
