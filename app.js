// Get dependencies:
var express = require('express');
var http = require('http');
var path = require('path');
var chokidar = require('chokidar');
var glob = require('glob');
var fs = require('fs');

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

// Monitor templates directory for changes:
function rebuild_templates() {
    console.log("> Building templates");
    
    glob("views/templates/*.html", {}, function (err, files) {
        if (err) {
            return;
        }
        
        var files_complete = 0;
        var text = "";
        
        files.forEach(function (file) {
            fs.readFile(file, 'utf8', function (err, data) {
                var name = file.replace('views/templates/', '').replace('.html', '');
                var header = '<script type="text/x-handlebars-template" id="template-' + name + '">';
                var footer = '</script>';
                
                text += header + data + footer;
                ++files_complete;
                
                if (files_complete == files.length) {
                    fs.writeFile("views/built/templates.html", text, function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("> Templates successfully rebuilt");
                        }
                    }); 
                }
            });
        });
    });
}

rebuild_templates();

var template_watch = chokidar.watch('views/templates/', {
    ignored: /^\./,
    persistent: true,
    ignoreInitial: true
});

template_watch
    .on('add', rebuild_templates)
    .on('change', rebuild_templates)
    .on('unlink', rebuild_templates);

// Render single-page app:
app.get('/', function(req, res) {
    res.render('app', {});
});

// API routes:
require('./api.js')(app);

// Start server:
http.createServer(app).listen(app.get('port'), function(){
    console.log('> Schema is listening on port ' + app.get('port'));
});
