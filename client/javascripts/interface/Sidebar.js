/**
 * Manages sidebar
 */
var Sidebar = Backbone.View.extend({
    /**
     * Initialise function
     */
    initialize: function () {
        var sidebar = this;
        
        $(document).on('click', '.ui-sidebar li a', function(e) {
            $('.ui-sidebar li a.active').removeClass('active');
            $(this).addClass('active');
        });
        
        $(document).on('keyup', 'input', function () {
            sidebar.search($(this).val());
        });
    },
    
    populateFromDatabase: function(database_name, table_name, refresh) {
        if (!refresh) {
            refresh = false;
        }
        
        if (this.current_db != database_name) {
            console.log("Populating sidebar from", database_name);
            this.current_db = "" + database_name;
            
            database.queryOrLogout('USE `' + database_name + '`;', function (rows) {
                database.queryOrLogout('SHOW TABLES;', function (rows) {
                    sidebar.clear();
                    
                    _.each(rows, function (row) {
                        var row_table_name = row[_.keys(row)[0]];
                        var active = table_name == row_table_name;
                        sidebar.addItem(row_table_name, '', '#/database/' + database_name + '/' + row_table_name + '/', 0, active, false);
                    });
                    
                    sidebar.render();
                });
            });
        }
    },
    
    
    /**
     * Empty by default
     */
    search_term: "",
    
    
    /**
     * Define sidebar and template selectors
     */
    selector: 'div.ui-sidebar#sidebar',
    template: '#template-ui-sidebar',
    
    
    /**
     * Define empty array for containing sidebar items
     */
    items: [],
    
    
    /**
     * Clear sidebar and render
     *
     * @return void
     */
    clear: function() {
        this.items = [];
        this.render();
    },
    
    
    /**
     * Add item to sidebar
     *
     * @param string text
     * @param string icon     
     * @param int    position Position to add item at (optional)
     * @param bool   active   Whether item is active or not
     *
     * @return void
     */
    addItem: function(text, icon, url, position, active, render) {
        // callback instanceof Function
        this.items.push({
            text: text,
            icon: icon,
            url: url,
            active: active,
        });
        
        if (render || render == undefined) {
            this.render();
        }
    },
    
    
    /**
     * Render sidebar
     *
     * @return void
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
     *
     * @param string search_term Search Term
     *
     * @return void
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
     *
     */
    filter: function() {
        var term = this.search_term;
        
        _.each(this.items, function(item) {
            if (item.text.search(term) > -1) {
                item.hidden = false;
            } else {
                item.hidden = true;
            }
        });
        
        this.render();
    }
});
