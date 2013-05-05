var User = Backbone.Model.extend({
    defaults: {
        email: null,
        logged_in: false,
    },
    
    initialize: function() {
        if (window.token && window.email && window.gravatar) {
            this.token = window.token;
            this.email = window.email;
            this.gravatar = window.gravatar;
            this.logged_in = true;
        } else {
            window.location.replace('/#/login/');
        }
    },
    
    setLoggedIn: function() {
        this.logged_in = true;
        this.fetchData();
        window.location = "#/servers/";
    },
    
    isLoggedIn: function() {
        return this.logged_in;
    },
    
    setLoggedOut: function() {
        user = this;
        
        $.get('/api/auth/logout/', function() {
            user.logged_in = false;
            window.location = "#/login/";
        });
    }
});
