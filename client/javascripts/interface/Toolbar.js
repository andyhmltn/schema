/**
 * Manages ui-toolbar
 */
var Toolbar = Backbone.View.extend({
    /**
     * Define handlebars templates
     */
    section_template: '#template-ui-toolbar-section',
    
    /**
     * Define toolbar sections
     */
    sections: {
        'left':  'div.ui-toolbar div.section.left',
        'right': 'div.ui-toolbar div.section.right',
    },
    
    
    /**
     * Define empty arrays for toolbar section contents
     */
    section_items: {
        'left':  [],
        'right': []
    },
    
    
    /**
     * Remove all items from section
     *
     * @param string section Section to clear
     *
     * @return void
     */
    clearSection: function (section) {
        this.section_items[section] = [];
        this.renderSection(section);
    },
    
    
    /**
     * Clear all sections
     *
     * @return void
     */
    clear: function () {
        for (section_key in this.sections) {
            this.clearSection(section_key);
        }
        this.render();
    },
    
    
    /**
     * Render section of toolbar
     *
     * @param string section Section to render
     *
     * @return void
     */
    renderSection: function (section) {
        // Get selector and section items:
        var selector = $(this.sections[section]);
        var items = this.section_items[section];
        
        // Give each of the items a random ID:
        _.each(items, function(item) {
            item.id = "template_" + Math.random().toString().substr(2)
        });
        
        // Render handlebars template:
        var html = _.template($(this.section_template).html(), {
            items: items
        });
        
        // Bind callbacks:
        _.each(items, function(item) {
            if (item.callback) {
                $(document).on('click', '#' + item.id, function(e) {
                    $(selector).find('.active').removeClass('active');
                    $(this).addClass('active');
                    e.preventDefault();
                    item.callback();
                });
            }
        });
        
        // Output HTML:
        selector.html(html);
    },
    
    
    /**
     * Render entire toolbar
     *
     * @return void
     */
    render: function () {
        for (section_key in this.sections) {
            this.renderSection(section_key);
        }
    },
    
    
    /**
     * Adds an icon to the toolbar
     *
     * @param string  section  Section for the icon to be created under
     * @param string  text     Icon text
     * @param string  callback Callback to be triggered when clicked
     * @param boolean active   Whether item should be active or not
     *
     * @return void
     */
    addItem: function (section, text, callback, active) {
        // callback instanceof Function
        this.section_items[section].push({
            text: text,
            callback: callback,
            active: active
        });
        
        this.renderSection(section);
    }
});
