var chokidar = require('chokidar');
var glob = require('glob');
var fs = require('fs');


/**
 * Template Handler
 * 
 * Manages the monitoring and building of the Underscore templates inside
 * /client/views/templates/
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
module.exports = {
    /**
     * Build templates into a flat file
     * @return {undefined}
     */
    rebuildTemplates: function () {
        console.log("> Building templates");
        
        // Get all templates in directory:
        glob("client/views/templates/*.html", {}, function (err, files) {
            if (err) {
                return;
            }
            
            // Define file counter and empty text variable:
            var files_complete = 0;
            var text = "";
            
            // Loop over files:
            files.forEach(function (file) {
                fs.readFile(file, 'utf8', function (err, data) {
                    // Get name and build script tags to wrap template with:
                    var name = file.replace('client/views/templates/', '').replace('.html', '');
                    var header = '<script type="text/x-handlebars-template" id="template-' + name + '">';
                    var footer = '</script>';
                    
                    // Add template to the rest and increase the number of files completed:
                    text += header + data + footer;
                    ++files_complete;
                    
                    // If all files have been done, write into the template flat file:
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
     * Start monitoring templates directory for changes
     * @return {undefined}
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
