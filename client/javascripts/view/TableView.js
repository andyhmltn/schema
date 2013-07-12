var TableView = Backbone.View.extend({
    selector: '#main .tableview',
    
    initialize: function(query) {
        var tableview = this;
        this.query = query;
        
        this.query.on('change:rows', function() {
            console.info("Query changed - rendering");
            tableview.render();
        });
        
        // Assign tableview to variable for statusbar callback:
        var tableview = this;
        
        // Remove previous bindings:
        $('#statusbar').off();
        
        // Bind to onclick on the pagination buttons on the sidebar:
        $('#statusbar').on('click', 'div.right.btn', function() {
            if ($(this).hasClass('next')) {
                var changed = tableview.query.nextPage();
            } else if ($(this).hasClass('prev')) {
                var changed = tableview.query.prevPage();
            }
            
            if (changed) {
                tableview.refresh();
            }
        });
    },
    
    
    /**
     * Render content view
     */
    render: function() {
        var tableview = this;
        
        this.query.execute(function() {
            // Render HTML:
            $('#main').html(_.template(
                $('#template-tableview').html(),
                {
                    tableview: tableview
                }
            ));
            
            // Get tableview selector:
            var selector = this.selector;
            
            // Bind to double-click event on cells:
            $(selector).find('tbody').on('dblclick', 'td', function() {
                $(selector).find('tbody td.active').removeClass('active');
                $(this).addClass('active').attr('contenteditable', 'true').selectText();
            });
            
            // Deselect cell if user moves on:
            $(selector).on('blur', 'tbody td.active', function() {
                $(this).removeClass('active');
            });
            
            // If enter key is pressed, send "blur" event to save the field:
            $(selector).on('keydown', 'td', function(e) {
                if (e.keyCode == '13') {
                    e.preventDefault();
                    $(this).blur();
                }
            });
        });
    }
});
