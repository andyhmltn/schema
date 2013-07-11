/**
 * View
 */
var View = Backbone.View.extend({
    slideAround: function (amount, speed) {
        $('#main').animate({
            top: amount + 'px'
        }, speed);
    }
});
