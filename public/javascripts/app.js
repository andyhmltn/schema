window.sidebar = new Sidebar;

var SchemaRouter = Backbone.Router.extend({
    routes: {
        ""                     : "redirectToServerPicker",
        "servers/"             : "showServerPicker",
        "database/"            : "listDatabases",
        "database/:database/"  : "viewDatabase",
        "database/:database/"  : "viewDatabase",
    },
    
    redirectToServerPicker: function() {
        if (window.token) {
            window.location = "#/database/";
        } else {
            window.location = "#/servers/";
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
        window.sidebar.clear();
        var login = new Login();
        login.displayLogin();
    },
    
    viewDatabase: function(database_name) {
        this.needLogin();
        window.sidebar.clear();
        
        var db = new DBConnection();
        
        // Populate left nav (database switcher):
        db.queryOrLogout('USE ' + database_name + ';', function (rows) {
            db.queryOrLogout('SHOW TABLES;', function (rows) {
                window.rows = rows;
                
                _.each(rows, function (row) {
                    var table_name = row[_.keys(row)[0]];
                    window.sidebar.addItem(table_name, '', '#/database/' + database_name + '/' + table_name + '/');
                });
            });
        });
    },
    
    listDatabases: function (server_id) {
        this.needLogin();
        window.sidebar.clear();
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
