/**
 * Status Bar
 * 
 * The status bar sits at the bottom of the screen and is used for holding
 * view controls and status information.
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var StatusBar = Backbone.View.extend({
    /**
     * jQuery selector for status bar
     * @type {String}
     */
    selector: 'div.ui-statusbar#statusbar',
    
    /**
     * Initialise StatusBar
     * @return {undefined}
     */
    initialize: function() {
    },
    
    
    /**
     * Render StatusBar
     * @return {undefined}
     */
    render: function() {
        
    },
    
    
    /**
     * Whether to show pagination controls or not
     * @param  {Boolean} value If true, display the controls, otherwise hide
     *                         them
     * @return {undefined}
     */
    displayPaginationControls: function(value) {
        console.info(
            "Changing pagination controls to %s",
            value ? 'display' : 'not display'
        );
    },
    
    
    /**
     * Clear all buttons, pagination controls and status text
     * @return {StatusBar} Returns self
     */
    clear: function(section) {
        console.info("Clearing StatusBar");
        this.displayPaginationControls(false);
        
        if (section) {
            var selector = this.selector + ' .' + section;
        } else {
            var selector = this.selector;
        }
        
        $(selector).find('button').remove();
        return this;
    },
    
    
    /**
     * Add button to sidebar section of status bar
     * @param  {String}   button_text Text to be displayed on the button
     * @param  {Function} callback    Function to be called when button
     *                                is clicked
     * @return {undefined}
     */
    addSidebarButton: function(button_text, callback) {
        console.info("Adding button to StatusBar (%s)", button_text);
        var element = $('<button></button>').html(button_text).click(callback);
        $(this.selector).find('.sidebar').append(element);
    },
    
    
    /**
     * Add button to main view section of status bar
     * @param  {String}   button_text Text to be displayed on the button
     * @param  {Function} callback    Function to be called when button
     *                                is clicked
     * @return {undefined}
     */
    addMainViewButton: function(button_text, callback) {
        console.info("Adding button to StatusBar (%s)", button_text);
        var element = $('<button></button>').html(button_text).click(callback);
        $(this.selector).find('.main .left').append(element);
    }
});
