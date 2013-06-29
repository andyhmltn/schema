var TableView = function(table) {
    this.table = table;
    
    
    this.render = function() {
        this.renderContentView();
    };
    
    
    /**
     * Render content view
     */
    this.renderContentView = function() {
        console.log('Rendering table content view');
        
        $('#main').html(_.template(
            $('#template-tableview').html(),
            {
                table: this.table,
            }
        ));
        
        this.bindInputs();
    }
    
    
    /**
     *
     */
    this.bindInputs = function() {
        
    };
    
    this.table.setView(this);
};
