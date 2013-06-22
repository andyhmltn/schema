/**
 * Manages sidebar
 */
Sidebar = {
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
     *
     * @return void
     */
    addItem: function(text, icon, position) {
        // callback instanceof Function
        this.items.push({
            text: text,
            icon: icon
        });
        
        this.render();
    },
    
    
    /**
     * Render sidebar
     *
     * @return void
     */
    render: function() {
        var html = _.template($(this.template).html(), {
            items: this.items
        });
        
        $(this.selector).html(html);
    }
};
