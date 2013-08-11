/**
 * QueryView
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var QueryView = Backbone.View.extend({
    /**
     * Initialise object
     * @param {Table} table Table object
     * @return {undefined}
     */
    initialize: function(table) {
        this.table = table;
        
        pane.setSQL(
            _.str.sprintf(
                'SELECT * FROM `%s` LIMIT 100;',
                this.table.get('name')
            )
        );
        pane.setQueryChangeCallback(this.render);
    },
    
    
    /**
     * Render QueryView
     * @return {undefined}
     */
    render: function() {
        pane.open();
        
        // Get the query from the pane textarea:
        var sql = pane.getSQL();
        
        statusbar.clear('main .left');
        
        database.query(sql, function(err, rows, cols) {
            $('#main').html(_.template(
                $('#template-queryview').html(),
                {
                    rows: rows,
                    columns: cols
                }
            ));
        })
        
        this.bindInputs();
        contentview.setLoading(false);
    },
    
    
    /**
     * Bindinputs
     * @return {undefined}
     */
    bindInputs: function() {
        
    }
});
