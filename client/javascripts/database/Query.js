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
        this.set('query_title', table.get('Custom Query'));
        // this.set('query', query);
        // this.set('limit', 100);
        // this.set('offset', 0);
    },
    
    loadFromSQL: function(sql, table) {
        this.sql = sql;
        this.column_sql = _.str.sprintf("SHOW FULL columns FROM %s", table);
    },
    
    loadFromTable: function(table, callback) {
        this.set('query_title', table.get('name'));
        
        this.sql = _.str.sprintf("SELECT * FROM %s", table.get('name'));
        this.column_sql = _.str.sprintf("SHOW FULL columns FROM %s", table.get('name'));
        callback();
    },
    
    execute: function(callback) {
        var query = this;
        
        database.queryOrLogout(query.sql, function (rows) {
            query.set('rows', rows);
            
            database.queryOrLogout(query.column_sql, function (columns) {
                var cols = [];
                _.each(columns, function(row) {
                    cols.push(new Column({
                        name:       row.Field,
                        datatype:   row.Type,
                        collation:  row.Collation,
                        null:       row.Null,
                        key:        row.Key,
                        default:    row.Default,
                        extra:      row.Extra,
                        privileges: row.Privileges,
                        comment:    row.Comment
                    }));
                });
                
                query.set('columns', cols);
                callback();
            });
        });
    },
    
    getColumns: function() {
    }
    
    
    /**
     * Set maximum number of results to return
     *
     * @param integer limit Maximum number of results
     *
     * @return void
     */
    // setLimit: function (limit) {
    //     this.set('limit', limit);
    // },
    
    
    /**
     * Set result offset for pagination
     *
     * @param integer offset Offset for pagination
     *
     * @return void
     */
    // setOffset: function (offset) {
    //     this.set('offset', offset);
    // },
    
    
    /**
     * Convert query into SQL
     *
     * @return string SQL
     */
    // toSQL: function() {
    //     var sql = this.get('query');
    //     sql += _.str.sprintf(
    //         " LIMIT %d, %d",
    //         this.get('offset'),
    //         this.get('limit')
    //     );
    //     return sql;
    // },
    
    
    // nextPage: function() {
    //     this.set('offset', this.get('offset') + this.get('limit'));
    //     console.log(this.get('offset'));
    // },
    // prevPage: function() {
    //     this.set('offset', this.get('offset') - this.get('limit'));
    //     console.log(this.get('offset'));
    // }
});
