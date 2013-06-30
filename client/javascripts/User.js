/**
 *
 */
var User = Backbone.Model.extend({
    email: "",
    gravatar: "",
    
    /**
     *
     */
    initialize: function() {
        this.loadSession();
    },
    
    /**
     * Load session from cookie.
     */
    loadSession: function() {
    }
});
