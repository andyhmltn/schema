/**
 * View
 */
var View = Backbone.View.extend({
    slideAround: function (amount, speed) {
        $('#main').animate({
            top: amount + 'px'
        }, speed);
    },
    
    setOffset: function (amount) {
        $('#main .titlebar').css('top', amount + 'px');
        $('#main, #main .tableview').css('top', (amount + 30) + 'px');
    }
});
