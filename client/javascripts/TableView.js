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
    
    
    renderGeneric: function() {
        var tableview = this;
        
        // Add SQL editor into pane:
        var sqleditor = new SQLEditor();
        pane.render(sqleditor.render());
        
        // Clear toolbar:
        toolbar.clear();
        
        // Add structure item to toolbar:
        toolbar.addItem('left', 'Structure', 'structure.png', function() {
            tableview.renderStructure();
        });
        
        // Add content item to toolbar:
        toolbar.addItem('left', 'Content', 'content.png', function() {
            tableview.renderContentView();
        });
        
        // Add info item to toolbar:
        toolbar.addItem('left', 'Table Info', 'info.png', function() {
            tableview.renderInfo();
        });
        
        // Add console item to toolbar:
        toolbar.addItem('left', 'Query', 'query.png', function() {
            pane.toggle();
        });
    },
    
    
    /**
     * Render content view
     */
    renderContentView: function() {
        this.renderGeneric();
        
        // Render HTML:
        $('#main').html(_.template(
            $('#template-tableview').html(),
            {
                table: this.table,
            }
        ));
        
        this.bindInputs();
    },
    
    
    renderStructure: function() {
        this.renderGeneric();
        
        // Render HTML:
        $('#main').html(_.template(
            $('#template-tablestructure').html(),
            {
                table: this.table,
            }
        ));
        
        this.bindInputs();
    },
    
    
    renderInfo: function() {
        this.renderGeneric();
        
        // Render HTML:
        $('#main').html(_.template(
            $('#template-tableinfo').html(),
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
