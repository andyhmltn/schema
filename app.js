// Get dependencies:
var express = require('express');
var http = require('http');
var path = require('path');

// Create express app and connect to SQLite DB:
app = express();
app.database = require('./database');

// Define settings and middleware for all environments:
app.set('port', process.env.PORT || 8000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// Configure development settings and middleware:
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// Define database connection store:
app.user_connections = {};

// Start connection monitor to run every 30 seconds:
var monitor = require('./monitor')(app);
setInterval(monitor, 30000);

// Render single-page app:
app.get('/', function(req, res) {
    res.render('app', {});
});

// API routes:
require('./api.js')(app);

// Start server:
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
