/**
 * Sidebar
 * 
 * The sidebar is used for displaying lists of content and allowing quick
 * switching between tables. It is permanently on the left-hand side of
 * the screen and has a fixed width, although it would be a good addition
 * if in future it were to be resizable.
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var Sidebar = Backbone.View.extend({
    /**
     * Initialise object by binding to the search box and the individual items
     * @return {undefined}
     */
    initialize: function () {
        var sidebar = this;
        
        // Bind to the individual sidebar items:
        $(document).on('click', '.ui-sidebar li a', function(e) {
            $('.ui-sidebar li a.active').removeClass('active');
            $(this).addClass('active');
        });
        
        // Bind to the search box:
        $(document).on('keyup', '.search input', function () {
            sidebar.search($(this).val());
        });
    },
    
    
    /**
     * Populate sidebar from a database
     * 
     * This method queries the database for a list of tables and populates
     * the sidebar with them. It then binds the click events to alter the
     * ContentView contents.
     * 
     * @param  {String}  database_name Database to query
     * @param  {String}  table_name    Table to set as active
     * @return {undefined}
     */
    populateFromDatabase: function(database_name, table_name) {
        if (this.current_db != database_name) {
            console.log("Populating sidebar from", database_name);
            this.current_db = "" + database_name;
            
            database.queryOrLogout('USE `' + database_name + '`;', function (rows) {
                database.queryOrLogout('SHOW TABLES;', function (rows) {
                    sidebar.clear();
                    
                    _.each(rows, function (row) {
                        var row_table_name = row[_.keys(row)[0]];
                        var active = table_name == row_table_name;
                        sidebar.addItem(row_table_name, '', '#/database/' + database_name + '/' + row_table_name + '/', active, false);
                    });
                    
                    sidebar.render();
                });
            });
        }
    },
    
    
    /**
     * Populate sidebar with a server's databases
     * @param {Function} callback Function to call once completed (optional)
     * @return {undefined}
     */
    populateFromServer: function(callback) {
        database.queryOrLogout("SHOW DATABASES;", function (rows) {
            sidebar.clear();
            
            for (var row_id in rows) {
                var row = rows[row_id];
                sidebar.addItem(row.Database, '', '#/database/' + row.Database + '/', undefined, false);
            }
            
            sidebar.render();
            
            if (callback) {
                callback(rows);
            }
        });
    },
    
    
    /**
     * String to display in search field
     * @type {String}
     */
    search_term: "",
    
    
    /**
     * jQuery selector for sidebar instance
     * @type {String}
     */
    selector: 'div.ui-sidebar#sidebar',
    
    
    /**
     * jQuery selector for sidebar template
     * @type {String}
     */
    template: '#template-ui-sidebar',
    
    
    /**
     * Where the sidebar items live
     * @type {Array}
     */
    items: [],
    
    
    /**
     * Clear sidebar and render
     * @return {undefined}
     */
    clear: function() {
        this.items = [];
        this.render();
    },
    
    
    /**
     * Add item to sidebar
     * 
     * @param  {String}  text   Sidebar item label
     * @param  {String}  icon   Icon to be displayed
     * @param  {String}  url    URL for the item to link to
     * @param  {Boolean} active Whether the item should be active
     * @param  {Boolean} render Whether to render the sidebar after
     *                          adding the item. Default is to render.
     *                          The only time we don't want to render
     *                          is when adding a lot of items.
     * 
     * @todo  Implement icon
     * 
     * @return {undefined}
     */
    addItem: function(text, icon, url, active, render) {
        // Add sidebar item to array:
        this.items.push({
            text: text,
            icon: icon,
            url: url,
            active: active,
        });
        
        // Render if we haven't been told not to:
        if (render || render == undefined) {
            this.render();
        }
    },
    
    
    /**
     * Render sidebar
     * @return {undefined}
     */
    render: function() {
        console.log("Rendering sidebar");
        
        var html = _.template($(this.template).html(), {
            items: this.items,
            search_term: this.search_term
        });
        
        $(this.selector).html(html);
    },
    
    
    /**
     * Search sidebar
     * @param  {String} search_term String to search for in sidebar
     * @return {undefined}
     */
    search: function(search_term) {
        // Trim search term:
        search_term = search_term.trim();
        
        // No point searching twice:
        if (search_term == this.search_term) {
            return;
        }
        
        // Add search term:
        this.search_term = search_term;
        
        // Filter:
        this.filter();
        
        // Make sure search box is selected (bug):
        // $(this.selector).find('div.search input').select();
        $('div.search input').focus().val($('div.search input').val())
    },
    
    
    /**
     * Method that actually performs the searching based on the search term set
     * @return {undefined}
     */
    filter: function() {
        var sidebar = this;
        
        _.each(this.items, function(item) {
            if (item.text.search(sidebar.search_term) > -1) {
                item.hidden = false;
            } else {
                item.hidden = true;
            }
        });
        
        this.render();
    }
});
