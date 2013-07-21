database = new Database;
sidebar = new Sidebar;
toolbar = new Toolbar;
view = new View;
pane = new Pane;


/**
 * Backbone Router for Schema
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var SchemaRouter = Backbone.Router.extend({
    /**
     * Define routes for Schema
     * @type {Object}
     */
    routes: {
        "database/:database/:table/" : "viewTable",
        "database/:database/"        : "viewDatabase",
        "database/"                  : "listDatabases",
        "servers/"                   : "showServerPicker",
        ""                           : "redirectToServerPicker",
    },
    
    
    /**
     * Redirect the user to the connection page if a token doesn't exist,
     * otherwise redirect them to the database picker.
     * @return {undefined}
     */
    redirectToServerPicker: function() {
        if (window.token) {
            window.location = "#/database/";
        } else {
            window.location = "#/servers/";
        }
    },
    
    
    /**
     * Use to make sure that the user is logged in. Redirects the user to
     * the login page if they have no token.
     * @return {undefined}
     */
    needLogin: function() {
        if (!window.token) {
            var token = localStorage['token'];
            window.server_name = localStorage['server_name'];
            
            if (token) {
                window.token = token;
            } else {
                window.location = "#/servers/";
            }
        }
    },
    
    
    /**
     * Show server picker - the screen where you pick which server to
     * connect to.
     * @return {undefined}
     */
    showServerPicker: function() {
        toolbar.clear();
        sidebar.clear();
        var login = new Login();
        login.displayLogin();
    },
    
    
    /**
     * View database - get the tables so that the user can pick which to view
     * @param  {String} database_name Database picked
     * @return {undefined}
     */
    viewDatabase: function(database_name) {
        this.needLogin();
        
        // Render database viewer:
        var databaseView = new DatabaseView({
            database_name: database_name,
        });
        databaseView.render();
    },
    
    
    /**
     * View table - create the contentview so the user can pick between
     * the various options (e.g. tableview, table structure, etc).
     * @param  {String} database_name Database picked
     * @param  {String} table_name    Table picked
     * @return {undefined}
     */
    viewTable: function(database_name, table_name) {
        this.needLogin();
        
        table = new Table(table_name);
        query = new Query();
        query.loadFromTable(table);
        contentview = new ContentView(table);
        
        // Populate left nav (database switcher):
        sidebar.populateFromDatabase(database_name, table_name);
    },
    
    
    /**
     * List databases that are available
     * @return {undefined}
     */
    listDatabases: function () {
        this.needLogin();
        sidebar.clear();
        toolbar.clear();
        
        var databasePicker = new DatabasePicker();
        databasePicker.displayPicker();
    },
});


/**
 * Upon DOM-ready, start the application
 * @return {undefined}
 */
$(function() {
    var router = new SchemaRouter();
    Backbone.history.start();
    
    $(document).on('click', '#showMenu', function() {
        $('.ui-sidebar').fadeIn('fast');
    });
});
