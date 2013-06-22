/**
 * Manages sidebar
 */
Sidebar = function () {
    /**
     * Initialise function
     */
    this.init = function () {
        $(document).on('click', '.ui-sidebar li a', function(e) {
            $('.ui-sidebar li a.active').removeClass('active');
            $(this).addClass('active');
        });
    };
    this.init();
    
    
    /**
     * Define sidebar and template selectors
     */
    this.selector = 'div.ui-sidebar#sidebar';
    this.template = '#template-ui-sidebar';
    
    
    /**
     * Define empty array for containing sidebar items
     */
    this.items = [];
    
    
    /**
     * Clear sidebar and render
     *
     * @return void
     */
    this.clear = function() {
        this.items = [];
        this.render();
    };
    
    
    /**
     * Add item to sidebar
     *
     * @param string text
     * @param string icon     
     * @param int    position Position to add item at (optional)
     *
     * @return void
     */
    this.addItem = function(text, icon, url, position) {
        // callback instanceof Function
        this.items.push({
            text: text,
            icon: icon,
            url: url
        });
        
        this.render();
    };
    
    
    /**
     * Render sidebar
     *
     * @return void
     */
    this.render = function() {
        var html = _.template($(this.template).html(), {
            items: this.items
        });
        
        $(this.selector).html(html);
    };
};
