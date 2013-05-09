var User = Backbone.Model.extend({
    defaults: {
        token: null,
        email: null,
        logged_in: false,
    },
    
    initialize: function() {
        if (this.token && this.email /*&& window.gravatar*/) {
            this.email = window.email;
            // this.gravatar = window.gravatar;
            this.logged_in = true;
        } else {
            window.location.replace('/#/login/');
        }
    },
    
    setLoggedIn: function(response) {
        this.email = response.email;
        this.token = response.token;
        this.logged_in = true;
        window.location = "#/servers/";
    },
    
    isLoggedIn: function() {
        return this.logged_in;
    },
    
    setLoggedOut: function() {
        user = this;
        
        $.get('/api/auth/', function() {
            user.logged_in = false;
            window.location = "#/login/";
        });
        
        // $.ajax({
        //     url: '/api/auth',
        //     type: 'POST',
        //     data: {
        //         email: $('#login-email').val(),
        //         password: $('#login-password').val()
        //     },
        //     error: function(data) {
        //         alert('Incorrect username or password');
        //     },
        //     success: function(data) {
        //         window.user.setLoggedIn();
        //     }
        // });
        
    }
});
