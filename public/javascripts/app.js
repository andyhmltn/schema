var SchemaRouter = Backbone.Router.extend({
    routes: {
        ""                 : "redirectToServerPicker",
        "login/"           : "showLogin",
        "logout/"          : "logoutUser",
        "servers/"         : "showServerPicker",
        "servers/:server/" : "showDatabasePicker",
    },
    
    redirectToServerPicker: function() {
        window.location = "#/servers/";
    },
    
    checkAppLoaded: function() {
        window.appView = new AppView();
        $('body').html(window.appView.render().el);
    },
    
    showLogin: function() {
        var loginView = new LoginView();
        $('body').html(loginView.render().el);
    },
    
    showServerPicker: function() {
        this.checkAppLoaded();
        
        window.appView.setNavTitle("Pick a server");
        
        // Get servers:
        serverCollection = new Servers;
        serverCollection.fetch();
        
        // Give servers to server picker:
        serverPickerView = new ServerPickerView({
            collection: serverCollection
        });
        
        serverPickerView.render();
        window.appView.$el.find('ul.sidenav').html(serverPickerView.el);
    },
    
    showDatabasePicker: function (server_id) {
        this.checkAppLoaded();
        
        // Get server:
        server = new Server({
            id: server_id
        });
        server.fetch({
            'success': function() {
                window.appView.setNavTitle(server.get('name'));
            },
            'error': function() {
                console.log("an error occurred");
            }
        });
    },
    
    logoutUser: function() {
        window.user.setLoggedOut();
    }
});

$(function() {
    // This should be retrieved from auth call, but for now, we'll just define
    // it here:
    window.app_key = 'changeme';
    
    // Create user:
    window.user = new User();
    var router = new SchemaRouter();
    Backbone.history.start();
});
