/**
 * View
 */
var View = Backbone.Model.extend({
    slideAround: function (amount, speed) {
        console.log("Sliding down");
        $('#main .titlebar').animate({
            top: amount + 'px'
        }, speed);
        
        $('#main, #main .tableview').animate({
            top: (amount + 30) + 'px'
        }, speed);
    }
});
