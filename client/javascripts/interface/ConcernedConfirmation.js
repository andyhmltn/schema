/**
 * Display a warning confirmation prompt to the user
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var ConcernedConfirmation = Backbone.View.extend({
    /**
     * Return itself
     * @return {Prompt}
     */
    initialize: function() {
        return this;
    },
    
    
    /**
     * Display warning confirmation
     * @param  {String}   title          Confirmation title
     * @param  {String}   subtitle       Text to display under title
     * @param  {String}   ok_message     Text on 'ok' button
     * @param  {String}   cancel_message Text on cancel button
     * @param  {Function} callback       Function called when complete button
     *                                   pressed
     * @return {undefined}
     */
    display: function(title, subtitle, ok_message, cancel_message, callback) {
        // Render prompt template:
        sheet.setTemplate('#template-concerned-confirmation', {
            title: title,
            subtitle: subtitle,
            ok_message: ok_message,
            cancel_message: cancel_message
        });
        
        // Display prompt:
        sheet.show();
        
        // If the 'ok' button is pressed, return the value via callback and
        // hide the prompt:
        $('#sheet .complete').click(function() {
            sheet.hide();
            callback(true);
        });
    }
});
