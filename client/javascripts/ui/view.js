/**
 * View
 */
var View = Backbone.Model.extend({
    slideAround: function (amount, speed) {
        $('#main .titlebar').animate({
            top: amount + 'px'
        }, speed);
        
        $('#main, #main .tableview').animate({
            top: (amount + 30) + 'px'
        }, speed);
    },
    
    setOffset: function (amount) {
        $('#main .titlebar').css('top', amount + 'px');
        $('#main, #main .tableview').css('top', (amount + 30) + 'px');
    }
});
