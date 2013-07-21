/**
 * The ContentView manages the main area of the app. It chooses what should
 * be displayed (although it takes orders from the sidebar). It controls the
 * TableStructure, TableView and TableInfo views as well as the query pane.
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var ContentView = Backbone.View.extend({
    /**
     * Initialise ContentView
     * 
     * Creates the TableView, TableStructure and TableInfo objects,
     * sets up the toolbar and pane and looks into LocalStorage to see
     * which view was displayed last.
     * 
     * @param  {Table} table Table to display
     * @return {undefined}
     */
    initialize: function(table) {
        // Start loading indicator:
        this.setLoading(true);
        
        // Store table for later:
        this.table = table;
        
        // Get contentview:
        contentview = this;
        
        // Create TableView, TableStructure and TableInfo objects:
        this.tableview = new TableView(query);
        this.tablestructure = new TableStructure(table);
        this.tableinfo = new TableInfo(table);
        
        // Set up toolbar and pane:
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
    
    
    /**
     * Set up toolbar making them control the ContentView
     * @return {undefined}
     */
    initializeToolbar: function() {
        // Clear toolbar:
        toolbar.clear();
        
        // Store this as contentview for use inside callbacks:
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
    
    
    /**
     * Set the remember key or return it if no key is provided.
     * 
     * The remember key is used to determine which view to display by
     * default next time.
     * 
     * @param  {String} key String that determines the view to load by default
     * @return {String|undefined} String only returned if key wasn't passed
     */
    remember: function(key) {
        // If key isn't set, return it:
        if (!key) {
            return localStorage['contentview_previous'];
        }
        
        // If key was set, store it in LocalStorage:
        localStorage['contentview_previous'] = key;
    },
    
    
    /**
     * Initialise pane: create SQLEditor object and render it into the pane.
     * @return {undefined}
     */
    initializePane: function() {
        // Add SQL editor into pane:
        var sqleditor = new SQLEditor();
        pane.render(sqleditor);
    },
    
    
    /**
     * Turn on or off the loading indicator on the content view
     * 
     * @param  {Boolean} loading Whether to turn the indicator on or off
     * @return {undefined}
     */
    setLoading: function (loading) {
        view.setLoading(loading);
    }
});
