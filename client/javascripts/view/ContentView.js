var ContentView = Backbone.View.extend({
    initialize: function(table) {
        // Start loading indicator:
        this.setLoading(true);
        
        this.table = table;
        
        this.tableview = new TableView(query);
        this.tablestructure = new TableStructure(table);
        this.tableinfo = new TableInfo(table);
        
        this.initializeToolbar();
        this.initializePane();
        
        // Render content view:
        var key = this.remember();
        if (key == 'structure') {
            this.tablestructure.render();
        } else if (key == 'info') {
            this.tableinfo.render();
        } else {
            this.tableview.render();
        }
    },
    
    initializeToolbar: function() {
        // Clear toolbar:
        toolbar.clear();
        
        var contentview = this;
        
        // Add structure item to toolbar:
        toolbar.addItem('left', 'Structure', function() {
            contentview.setLoading(true);
            contentview.remember('structure');
            contentview.tablestructure.render();
        });
        
        // Add content item to toolbar:
        toolbar.addItem('left', 'Content', function() {
            contentview.setLoading(true);
            contentview.remember('content');
            contentview.tableview.render();
        });
        
        // Add info item to toolbar:
        toolbar.addItem('left', 'Table Info', function() {
            contentview.setLoading(true);
            contentview.remember('info');
            contentview.tableinfo.render();
        });
        
        // Add console item to toolbar:
        toolbar.addItem('left', 'Query', function() {
            pane.toggle();
        });
    },
    
    remember: function(key) {
        if (!key) {
            return localStorage['contentview_previous'];
        }
        localStorage['contentview_previous'] = key;
    },
    
    initializePane: function() {
        // Add SQL editor into pane:
        var sqleditor = new SQLEditor();
        pane.render(sqleditor.render());
    },
    
    /**
     * Turn on or off the loading indicator on the content view
     * 
     * @param  boolean loading Whether to turn the indicator on or off
     * @return void
     */
    setLoading: function (loading) {
        if (loading) {
            $('#main').addClass('loading');
        } else {
            $('#main').removeClass('loading');
        }
    }
});
