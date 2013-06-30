/**
 * Pane
 */
var Pane = Backbone.Model.extend({
    isOpen: false,
    selector: "#pane",
    
    open: function() {
        $(this.selector).animate({
            top: '45px'
        }, 200);
        
        view.slideAround(195, 200);
    },
    
    close: function() {
        $(this.selector).animate({
            top: '-105px'
        }, 200);
        
        view.slideAround(45, 200);
    },
    
    toggle: function() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
});
