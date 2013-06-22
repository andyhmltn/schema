var Login = function() {
    this.displayLogin = function() {
        $('#main').html(_.template(
            $('#template-connect-to-server').html(),
            {
                hostname: '',
                username: '',
                password: '',
                port:     '',
                db_type:  ''
            }
        ));
        
        this.bindInputs();
    };
    
    this.bindInputs = function() {
        $('#server-connect-button').click(function() {
            var hostname = $('#connect-hostname').val();
            var username = $('#connect-username').val();
            var password = $('#connect-password').val();
            var port     = $('#connect-port').val();
            
            db = new DBConnection();
            db.connectToDatabase(hostname, username, password, port, function(token) {
                if (token) {
                    window.token = token;
                    localStorage['token'] = token;
                    window.location = "#/database/";
                } else {
                    alert("Sorry, could not connect");
                }
            });
        });
    };
};
