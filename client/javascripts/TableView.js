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
        
        // Clear toolbar:
        toolbar.clear();
        
        // Add structure item to toolbar:
        toolbar.addItem('left', 'Structure', 'structure.png', function() {
            alert('display structure');
        });
        
        // Add content item to toolbar:
        toolbar.addItem('left', 'Content', 'content.png', function() {
            alert('display content');
        });
        
        // Add info item to toolbar:
        toolbar.addItem('left', 'Table Info', 'info.png', function() {
            alert('display info');
        });
        
        // Add console item to toolbar:
        toolbar.addItem('left', 'Query', 'query.png', function() {
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
