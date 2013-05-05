var ServerItemView = Backbone.View.extend({
    className: 'serverItemView',
    template: _.template($('#template-serveritem').html()),
    
    events: {
        "click a" : "editItem",
        "dblclick a" : "openItem"
    },
    
    editItem: function() {
        var editServer = new EditServerView({
            model: this.model
        });
        
        window.appView.setViewport(editServer);
        
        return false;
    },
    
    openItem: function() {
        window.location = "#/servers/" + this.model.get("id") + "/";
        return false;
    },
    
    initialize: function() {
    },
    
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});