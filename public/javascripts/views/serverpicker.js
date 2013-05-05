var ServerPickerView = Backbone.View.extend({
    id: 'serverView',
    
    initialize: function() {
        this.collection.on('reset', this.addAll, this);
    },
    
    render: function() {
        this.collection.forEach(this.addOne, this);
    },
    
    addAll: function() {
        this.$el.empty();
        this.render();
    },
    
    addOne: function (item) {
        var serverItemView = new ServerItemView({
            model: item
        });
        this.$el.append(serverItemView.render().el);
    }
});