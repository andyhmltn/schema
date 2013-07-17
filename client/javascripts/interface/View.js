/**
 * View
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var View = Backbone.View.extend({
    /**
     * Slide the view up or down
     * @param  {String} amount Distance (pixels) to move view. Negative
     *                         to move up, positive to move down.
     * @param  {Number} speed  Speed of animation
     * @return {undefined}
     */
    slideAround: function (amount, speed) {
        $('#main').animate({
            top: amount + 'px'
        }, speed);
    }
});
