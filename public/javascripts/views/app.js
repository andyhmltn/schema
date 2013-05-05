var AppView = Backbone.View.extend({
    id: 'app',
    template: _.template($('#template-app').html()),
    
    initialize: function() {
    },
    
    setViewport: function (view) {
        this.$el.find('div.main').html(view.render().el);
    },
    
    setNavTitle: function (html) {
        this.$el.find('.sidebar .toolbar .title').html(html);
    },
    
    render: function() {
        this.$el.html(this.template());
        return this;
    }
});