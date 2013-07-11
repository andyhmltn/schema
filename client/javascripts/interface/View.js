/**
 * View
 */
var View = Backbone.View.extend({
    /**
     * Slide the view up or down
     * 
     * @param  string amount Distance (pixels) to move view
     * @param  int    speed  Speed of animation
     * 
     * @return void
     */
    slideAround: function (amount, speed) {
        $('#main').animate({
            top: amount + 'px'
        }, speed);
    }
});
