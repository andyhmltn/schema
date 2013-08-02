/**
 * Display a prompt to the user
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var Prompt = Backbone.View.extend({
    /**
     * Return itself
     * @return {Prompt}
     */
    initialize: function() {
        return this;
    },
    
    /**
     * Display prompt to user and execute callback with results
     * @param  {String}   message           Message to display above text field
     * @param  {String}   complete_message  Text to display in 'ok' button
     * @param  {String}   cancel_message    Text to display in 'cancel' button
     * @param  {Function} callback Callback to execute with result
     * @return {undefined}
     */
    display: function(message, complete_message, cancel_message, callback) {
        // Render prompt template:
        sheet.setTemplate('#template-prompt', {
            message: message,
            complete_message: complete_message,
            cancel_message: cancel_message
        });
        
        // Display prompt:
        sheet.show();
        
        // Select input field:
        $('#sheet input.prompt').select();
        
        // If the 'ok' button is pressed, return the value via callback and
        // hide the prompt:
        $('#sheet .complete').click(function() {
            sheet.hide();
            callback($('#sheet input.prompt').val());
        });
    }
});
