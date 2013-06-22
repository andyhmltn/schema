var DatabasePicker = function() {
    
    this.displayPicker = function() {
        var db = new DBConnection();
        
        // Populate left nav (database switcher):
        db.queryOrLogout("SHOW DATABASES;", function (rows) {
            for (var row_id in rows) {
                var row = rows[row_id];
                window.sidebar.addItem(row.Database, '', '#/database/' + row.Database + '/', 0);
            }
        });
        
        $('#main').html(_.template(
            $('#template-database-picker').html(),
            {
            }
        ));
        
        // this.bindInputs();
    };
    
};
