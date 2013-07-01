var chokidar = require('chokidar');
var glob = require('glob');
var fs = require('fs');


/**
 * Template rendering
 */
module.exports = {
    /**
     * Rebuilds templates
     *
     * @return void
     */
    rebuildTemplates: function () {
        console.log("> Building templates");
        
        glob("client/views/templates/*.html", {}, function (err, files) {
            if (err) {
                return;
            }
            
            var files_complete = 0;
            var text = "";
            
            files.forEach(function (file) {
                fs.readFile(file, 'utf8', function (err, data) {
                    var name = file.replace('client/views/templates/', '').replace('.html', '');
                    var header = '<script type="text/x-handlebars-template" id="template-' + name + '">';
                    var footer = '</script>';
                    
                    text += header + data + footer;
                    ++files_complete;
                    
                    if (files_complete == files.length) {
                        fs.writeFile("client/views/built/templates.html", text, function(err) {
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
    },
    
    
    /**
     * Monitors templates directory for changes
     *
     * @return void
     */
    startMonitoring: function () {
        // Create monitor to watch templates directory:
        var template_watch = chokidar.watch('client/views/templates/', {
            ignored: /^\./,
            persistent: true,
            ignoreInitial: true
        });
        
        // Start monitoring templates directory for changes and rebuild
        // every time a template changes:
        template_watch
            .on('add', this.rebuildTemplates)
            .on('change', this.rebuildTemplates)
            .on('unlink', this.rebuildTemplates);
        
        // Rebuild templates:
        this.rebuildTemplates();
    }
}
