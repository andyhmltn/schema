debug = true;
override_console = false;

if (override_console) {
    if (window.hasOwnProperty('console')) {
        _console = console;
    } else {
        _console = false;
    }

    console = {
        log: function(message) {
            if (_console && debug == true) {
                _console.log(message);
            }
        },
        
        info: function(message) {
            if (_console && debug == true) {
                _console.info(message);
            }
        },
        
        warn: function(message) {
            if (_console && debug == true) {
                _console.warn(message);
            }
        },
        
        error: function(message) {
            if (_console && debug == true) {
                _console.error(message);
            }
        }
    };
}
