LoginView = Backbone.View.extend({
    id: 'login-form',
    template: _.template($('#template-login').html()),
    
    initialize: function () {
        if (window.user.isLoggedIn()) {
            window.location = "#/servers/";
        }
    },
    
    events: {
        "click input[type='submit']": "login",
    },
    
    login: function (event) {
        // Post this to the API:
        $.post('/api/auth/login/', JSON.stringify({
            email: $('#login-email').val(),
            password: $('#login-password').val()
        }), function(data) {
            if (data.success) {
                window.user.setLoggedIn();
            }
        });
        
        return false;
    },
    
    render: function () {
        this.$el.html(this.template());
        return this;
    }
});
