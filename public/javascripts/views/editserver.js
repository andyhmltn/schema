var EditServerView = Backbone.View.extend({
    template: _.template($('#template-editserver').html()),
    
    events: {
        "click #submit": "saveForm"
    },
    
    saveForm: function() {
        // Set all details except for the password:
        this.model.set({
            'name'      :  this.$el.find('#name').val(),
            'hostname'  :  this.$el.find('#hostname').val(),
            'username'  :  this.$el.find('#username').val(),
            'port'      :  this.$el.find('#port').val(),
            'db_type'   :  this.$el.find('#db_type').val()
            
        });
        
        // Set the password:
        if (this.$el.find('#password').val().length > 0) {
            this.model.set('password', this.$el.find('#password').val());
        }
        
        // Sync the model:
        this.model.save();
    },
    
    initialize: function() {
        this.model.on('change', this.render, this);
    },
    
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});