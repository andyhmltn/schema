var User = function() {
    this.email = "";
    this.gravatar = "";
    
    /**
     * Load session from cookie.
     */
    this.loadSession = function() {
        console.log('loaded');
    };
    
    this.loadSession();
};
