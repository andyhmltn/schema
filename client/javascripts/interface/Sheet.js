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
        var _this = this;
        
        // When cancel button inside sheet is clicked, hide the sheet:
        $(document).on('#sheet click', 'button.cancel', function() {
            _this.hide();
        });
        
        return this;
    },
    
    
    /**
     * Render new sheet template
     * @param  {String} template   Template to render
     * @param  {Array}  parameters Template parameters
     * @return {Sheet} Return self
     */
    setTemplate: function(template, parameters) {
        // Get template and check it could be loaded:
        var template = $(template).html();
        if (!template) {
            console.error("Could not load the desired template");
            return false;
        }
        
        // Build template:
        var html = _.template(template, parameters);
        
        // Load in built template:
        $(this.selector).html(html);
        
        // Check for inner div:
        var inner = $(this.selector + ' > div');
        
        // If there was an inner div, work out its dimensions:
        if (inner) {
            // Get width and height of inner div:
            var width = $(inner).outerWidth();
            var height = $(inner).outerHeight();
            
            // Add any margins:
            width += parseInt($(inner).css('margin-left'));
            width += parseInt($(inner).css('margin-right'));
            height += parseInt($(inner).css('margin-top'));
            height += parseInt($(inner).css('margin-bottom'));
            
            // Set width, height and margin (for centering):
            $(this.selector).width(width + 'px');
            $(this.selector).css('margin-left', -(parseInt(width) / 2) + 'px');
            $(this.selector).height(height + 'px');
        }
        
        // Return self for method chaining:
        return this;
    },
    
    
    /**
     * Show sheet
     * @return {Sheet} Return self
     */
    show: function() {
        this.open = true;
        
        $(this.selector).css('margin-top', '-' + ($(this.selector).height() + 10) + 'px');
        
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
        this.open = false;
        
        $(this.selector).animate({
            'margin-top': '-' + ($(this.selector).height() + 10) + 'px'
        }, 350);
        return this;
    },
    
    
    /**
     * Bind callback to 'ok' button being pressed
     * @param  {Function} callback Function to run
     * @return {undefined}
     */
    bindComplete: function(callback) {
        $('#sheet .buttons .complete').click(function() {
            if (callback) {
                callback();
            }
        });
    }
});
