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
    },
    
    
    /**
     * Turn on or off the loading indicator on the content view
     * 
     * @param  {Boolean} loading Whether to turn the indicator on or off
     * @return {undefined}
     */
    setLoading: function (loading) {
        if (loading) {
            $('#main').addClass('loading');
        } else {
            $('#main').removeClass('loading');
        }
    }
});
