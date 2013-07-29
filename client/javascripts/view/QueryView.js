/**
 * QueryView
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var QueryView = Backbone.View.extend({
    /**
     * Initialise object
     * @return {undefined}
     */
    initialize: function() {
        
    },
    
    
    /**
     * Render QueryView
     * @return {undefined}
     */
    render: function() {
        pane.render();
        pane.open();
        
        $('#main').html(_.template(
            $('#template-queryview').html(),
            {
            }
        ));
        
        this.bindInputs();
        contentview.setLoading(false);
    },
    
    
    /**
     * Bindinputs
     * @return {undefined}
     */
    bindInputs: function() {
        
    }
});
