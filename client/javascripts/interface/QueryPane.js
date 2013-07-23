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
     * Bind to query attribute and render when it changes
     * @return {undefined}
     */
    initialize: function() {
        pane = this;
        this.on('change:query', function() {
            console.log("Rendering pane");
            pane.render();
        });
    },
    
    
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
        this.isOpen = true;
        
        $(this.selector).animate({
            top: '45px'
        }, 200);
        
        view.slideAround(195, 200);
    },
    
    
    /**
     * Close the pane and tell the view to slide up
     * @return {undefined}
     */
    close: function() {
        this.isOpen = false;
        
        $(this.selector).animate({
            top: '-105px'
        }, 200);
        
        view.slideAround(45, 200);
    },
    
    
    /**
     * If the pane is open, close it. If it's closed, open it.
     * @return {undefined}
     */
    toggle: function() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    },
    
    
    /**
     * Render QueryPane
     * @return {undefined}
     */
    render: function() {
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
        $(this.selector).find('#executeQuery').click(function() {
            var sql = $(this).parent().parent().find('textarea').html();
            query.set('sql', sql);
            query.execute();
        });
    }
});
