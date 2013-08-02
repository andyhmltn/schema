/**
 * QueryPane
 * 
 * The query pane is used for displaying the query that produced the results
 * in the tableview and for editing queries (custom queries).
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var QueryPane = Backbone.Model.extend({
    /**
     * Function to run when query changes
     * @type {Function}
     */
    queryChangeCallback: null,
    
    
    /**
     * Speed of sliding up and down
     * @type {Number}
     */
    animationSpeed: 300,
    
    
    /**
     * Stores current status of pane
     * @type {Boolean} True indicates the pane is open
     */
    isOpen: false,
    
    
    /**
     * DOM selector for targeting the pane
     * @type {String}
     */
    selector: "#pane",
    
    
    /**
     * Open the pane and tell the view to slide down to make room for it.
     * @return {undefined}
     */
    open: function() {
        if (!this.isOpen) {
            console.info("Opening QueryPane");
            
            this.isOpen = true;
            
            $(this.selector).animate({
                top: '45px'
            }, this.animationSpeed);
            
            view.slideAround(195, this.animationSpeed);
        }
    },
    
    
    /**
     * Close the pane and tell the view to slide up
     * @return {undefined}
     */
    close: function() {
        console.info("Closing QueryPane");
        
        if (this.isOpen) {
            this.isOpen = false;
            
            $(this.selector).animate({
                top: '-105px'
            }, this.animationSpeed);
            
            view.slideAround(45, this.animationSpeed);
        }
    },
    
    
    /**
     * Render QueryPane
     * @return {undefined}
     */
    render: function() {
        console.info("Rendering QueryPane");
        
        $(this.selector).html(
            _.template($('#template-sql-editor').html(), {
                query: this.get('query')
            })
        );
        
        this.bindInputs();
    },
    
    
    /**
     * Bind inputs
     * @return {undefined}
     */
    bindInputs: function() {
        var _this = this;
        
        $(this.selector).find('#executeQuery').click(function() {
            if (_this.queryChangeCallback) {
                _this.queryChangeCallback();
            }
        });
    },
    
    
    /**
     * Return the SQL in the QueryPane textarea
     * @return {String} SQL 
     */
    getSQL: function() {
        var sql = $(this.selector).find('textarea').val();
        this.set('query', sql);
        return sql;
    },
    
    
    /**
     * Set QueryPane textarea contents
     * @param  {String} sql SQL
     * @return {undefined}
     */
    setSQL: function(sql) {
        $(this.selector).find('textarea').val('foo!');
        this.set('query', sql);
    },
    
    
    /**
     * Set function to be called when query is altered
     * @param  {Function} callback Function to call
     * @return {undefined}
     */
    setQueryChangeCallback: function(callback) {
        this.queryChangeCallback = callback;
    }
});
