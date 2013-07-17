/**
 * Pane
 * 
 * The pane is currently only used for housing the custom query editor,
 * however could be used for confirmation / extra information dialogues.
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var Pane = Backbone.View.extend({
    /**
     * Stores current status of pane
     * @type {Boolean} True indicates the pane is open
     */
    isOpen: false,
    
    
    /**
     * DOM selector for targeting the pane
     * @type {String}
     */
    selector: "#pane",
    
    
    /**
     * Open the pane and tell the view to slide down to make room for it.
     * @return {undefined}
     */
    open: function() {
        this.isOpen = true;
        
        $(this.selector).animate({
            top: '45px'
        }, 200);
        
        view.slideAround(195, 200);
    },
    
    
    /**
     * Close the pane and tell the view to slide up
     * @return {undefined}
     */
    close: function() {
        this.isOpen = false;
        
        $(this.selector).animate({
            top: '-105px'
        }, 200);
        
        view.slideAround(45, 200);
    },
    
    
    /**
     * If the pane is open, close it. If it's closed, open it.
     * @return {undefined}
     */
    toggle: function() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    },
    
    
    /**
     * Render an object into the pane
     * @param  {Object} object Object to render, must have a render() method.
     * @return {undefined}
     */
    render: function(object) {
        $(this.selector).html(object.render());
    }
});
