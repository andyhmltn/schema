/**
 * Holds an SQL query and allows basic manipulation of certain
 * parameters, such as the LIMIT clause
 * 
 * @class
 * @author  Tim Davies <mail@timdavi.es>
 */
var Query = Backbone.Model.extend({
    /**
     * Initialise the object
     * 
     * Stores the query 'title' which is the descriptor for the query.
     * e.g. a custom query is currently just titled "Custom Query", however
     * a table contentview will have the name of the table being queried
     * as the query title.
     * 
     * @constructor
     * 
     * @return {undefined}
     */
    initialize: function() {
        this.set('query_title', table.get('Custom Query'));
        this.set('limit', 100);
        this.set('offset', 0);
    },
    
    
    /**
     * Build a query object from custom SQL
     * @param  {String} sql SQL to be executed
     * @return {undefined}
     */
    loadFromSQL: function(sql) {
        this.set('sql', sql);
    },
    
    
    /**
     * Build a query object around displaying the contents of a table.
     * @param  {String} table Table that will be viewed
     * @return {undefined}
     */
    loadFromTable: function(table) {
        this.set('query_title', table.get('name'));
        this.set('sql', _.str.sprintf(
            "SELECT SQL_CALC_FOUND_ROWS * FROM `%s`",
            table.get('name')
        ));
    },
    
    
    /**
     * Convert query to SQL
     * @return {String} Query as SQL
     */
    toSQL: function() {
        var sql = this.get('sql');
        sql += _.str.sprintf(
            " LIMIT %d, %d",
            this.get('offset'),
            this.get('limit')
        );
        return sql;
    },
    
    
    /**
     * Execute the query by sending it to the API
     * @param  {Function} callback Function to be run once the query has
     *                             finished executing and has returned.
     * @return {undefined}
     */
    execute: function(callback) {
        var query = this;
        
        database.query(query.toSQL(), function (err, rows, columns, num_rows) {
            query.set('rows', rows);
            query.set('num_rows', num_rows);
            
            var cols = [];
            _.each(columns, function(row) {
                cols.push(new Column({
                    name: row.name
                }));
            });
            
            query.set('columns', cols);
            
            if (callback) {
                callback();
            }
            
            //     _.each(columns, function(row) {
            //         cols.push(new Column({
            //             name:       row.Field,
            //             datatype:   row.Type,
            //             collation:  row.Collation,
            //             null:       row.Null,
            //             key:        row.Key,
            //             default:    row.Default,
            //             extra:      row.Extra,
            //             privileges: row.Privileges,
            //             comment:    row.Comment
            //         }));
            //     });
        });
    },
    
    
    /**
     * Calculate the offset for advancing to the next page of query results
     * @return {Boolean} True if page could be changed, false otherwise
     */
    nextPage: function() {
        var max_pages = Math.ceil(this.get('num_rows') / this.get('limit'));
        var next_page = Math.ceil(this.get('offset') / this.get('limit')) + 1;
        
        if (next_page < max_pages) {
            contentview.setLoading(true);
            this.set('offset', this.get('offset') + this.get('limit'));
            this.execute();
            return true;
        }
        
        return false;
    },
    
    
    /**
     * Calculate the offset for returning to the previous page of query results
     * @return {Boolean} True if page could be changed, false otherwise
     */
    prevPage: function() {
        if (this.get('offset') - this.get('limit') >= 0) {
            contentview.setLoading(true);
            this.set('offset', this.get('offset') - this.get('limit'));
            this.execute();
            return true;
        }
        
        return false;
    }
});
