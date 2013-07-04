/**
 * Pane
 */
var Pane = Backbone.Model.extend({
    isOpen: false,
    selector: "#pane",
    
    open: function() {
        this.isOpen = true;
        
        $(this.selector).animate({
            top: '45px'
        }, 200);
        
        view.slideAround(195, 200);
    },
    
    close: function() {
        this.isOpen = false;
        
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
    },
    
    render: function(html) {
        $(this.selector).html(html);
    }
});
