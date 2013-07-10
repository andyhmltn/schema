/**
 * Holds an SQL query and allows basic manipulation of certain
 * parameters, such as the LIMIT clause
 */
var Query = Backbone.Model.extend({
    /**
     * Initialize object with query and begin parsing.
     *
     * @param string query SQL statement to parse
     */
    initialize: function(query) {
        this.set('query', query);
        this.set('limit', 100);
        this.set('offset', 0);
    },
    
    
    /**
     * Set maximum number of results to return
     *
     * @param integer limit Maximum number of results
     *
     * @return void
     */
    setLimit: function (limit) {
        this.set('limit', limit);
    },
    
    
    /**
     * Set result offset for pagination
     *
     * @param integer offset Offset for pagination
     *
     * @return void
     */
    setOffset: function (offset) {
        this.set('offset', offset);
    },
    
    
    /**
     * Convert query into SQL
     *
     * @return string SQL
     */
    toSQL: function() {
        var sql = this.get('query');
        sql += _.str.sprintf(
            " LIMIT %d, %d",
            this.get('offset'),
            this.get('limit')
        );
        return sql;
    },
    
    
    nextPage: function() {
        this.set('offset', this.get('offset') + this.get('limit'));
        console.log(this.get('offset'));
    },
    prevPage: function() {
        this.set('offset', this.get('offset') - this.get('limit'));
        console.log(this.get('offset'));
    }
});
