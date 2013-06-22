var SchemaRouter = Backbone.Router.extend({
    routes: {
        ""                 : "redirectToServerPicker",
        "servers/"         : "showServerPicker",
        "databases/"       : "showDatabasePicker",
    },
    
    redirectToServerPicker: function() {
        if (window.token) {
            window.location = "#/servers/";
        } else {
            window.location = "#/databases/";
        }
    },
    
    // showLogin: function() {
    //     // Set up toolbar:
    //     Toolbar.clear();
    //     Toolbar.addItem('left', 'Login', '', '#/login/', 'loginEvent');
    //     Toolbar.addItem('left', 'Servers', '', '#/servers/');
        
    //     // Fill sidebar with saved servers:
    //     // Sidebar.clear();
    //     Sidebar.render();
        
    //     // var loginView = new LoginView();
    //     // $('body').html(loginView.render().el);
    // },
    
    needLogin: function() {
        if (!window.token) {
            var token = localStorage['token'];
            
            if (token) {
                window.token = token;
            } else {
                window.location = "#/servers/";
            }
        }
    },
    
    showServerPicker: function() {
        Toolbar.clear();
        Sidebar.clear();
        var login = new Login();
        login.displayLogin();
    },
    
    showDatabasePicker: function (server_id) {
        this.needLogin();
        Sidebar.clear();
        Toolbar.clear();
        
        var databases = new DatabasePicker();
        databases.displayPicker();
        
        // this.checkAppLoaded();
        
        // // Get server:
        // server = new Server({
        //     id: server_id
        // });
        // server.fetch({
        //     'success': function() {
        //         window.appView.setNavTitle(server.get('name'));
        //     },
        //     'error': function() {
        //         console.log("an error occurred");
        //     }
        // });
    },
});

$(function() {
    window.user = new User;
    
    var router = new SchemaRouter();
    Backbone.history.start();
});
