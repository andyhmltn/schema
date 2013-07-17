/**
 * Toolbar
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var Toolbar = Backbone.View.extend({
    /**
     * jQuery selector for the toolbar
     * @type {String}
     */
    section_template: '#template-ui-toolbar-section',
    
    /**
     * Define sections of the toolbar that items can be added to and their
     * selectors
     * @type {Object}
     */
    sections: {
        'left':  'div.ui-toolbar div.section.left',
        'right': 'div.ui-toolbar div.section.right',
    },
    
    
    /**
     * Define arrays for sections in to which toolbar items can be added
     * @type {Object}
     */
    section_items: {
        'left':  [],
        'right': []
    },
    
    
    /**
     * Remove all items from a section
     * @param  {String} section Section key
     * @return {undefined}
     */
    clearSection: function (section) {
        this.section_items[section] = [];
        this.renderSection(section);
    },
    
    
    /**
     * Remove all items from all sections
     * @return {undefined}
     */
    clear: function () {
        for (section_key in this.sections) {
            this.clearSection(section_key);
        }
        this.render();
    },
    
    
    /**
     * Render individual section of toolbar
     * @param  {String} section Section key
     * @return {undefined}
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
     * @return {undefined}
     */
    render: function () {
        for (section_key in this.sections) {
            this.renderSection(section_key);
        }
    },
    
    
    /**
     * Add an item to the toolbar
     * 
     * @param  {[type]}   section  Section for the icon to be created under
     * @param  {[type]}   text     Icon text
     * @param  {Function} callback Callback to be triggered when clicked
     * @param  {[type]}   active   Whether item should be active or not
     * 
     * @return {undefined}
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
