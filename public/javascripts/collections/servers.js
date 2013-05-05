var Servers = Backbone.Collection.extend({
    model: Server,
    url: '/api/servers'
});