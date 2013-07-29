/**
 * Sheet
 * 
 * The sheet is a view which slides down covering the main view and blocks
 * input in other parts of the app until it has been dismissed.
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var Sheet = Backbone.View.extend({
    /**
     * jQuery selector
     * @type {String}
     */
    selector: 'div.ui-sheet#sheet',
    
    
    /**
     * Initialise sheet
     * @return {Sheet} Returns self
     */
    initialize: function() {
        return this;
    },
    
    
    /**
     * Render new sheet template
     * @param  {String} template   Template to render
     * @param  {Array}  parameters Template parameters
     * @return {Sheet} Return self
     */
    setTemplate: function(template, parameters) {
        var template = $(template).html();
        var html = _.template(template, parameters);
        
        $(this.selector).html(html);
        
        // Check for width and height parameters:
        var width = $(this.selector).find('input.width').val();
        var height = $(this.selector).find('input.height').val();
        
        if (width) {
            $(this.selector).width(width + 'px');
            $(this.selector).css('margin-left', -(parseInt(width) / 2) + 'px');
        }
        
        if (height) {
            $(this.selector).height(height + 'px');
        }
        
        return this;
    },
    
    
    /**
     * Show sheet
     * @return {Sheet} Return self
     */
    show: function() {
        $(this.selector).animate({
            'margin-top': '0px'
        }, 350);
        return this;
    },
    
    
    /**
     * Hide sheet
     * @return {Sheet} Return self
     */
    hide: function() {
        $(this.selector).animate({
            'margin-top': '-260px'
        }, 350);
        return this;
    }
});
