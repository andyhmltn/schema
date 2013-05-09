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
        $.ajax({
            url: '/api/auth',
            type: 'POST',
            dataType: 'json',
            data: {
                email: $('#login-email').val(),
                password: $('#login-password').val()
            },
            error: function(data) {
                alert('Incorrect username or password');
            },
            success: function(data) {
                window.user.setLoggedIn(data);
            }
        });
        
        return false;
    },
    
    render: function () {
        this.$el.html(this.template());
        return this;
    }
});
