var CellSheet_Text = Backbone.View.extend({
    initialize: function(cell) {
        this.cell = cell;
    },
    
    onComplete: function(callback) {
        this.onCompleteCallback = callback;
    },
    
    display: function() {
        var _this = this;
        
        sheet.setTemplate('#template-cell-editable-text', {
            value: this.cell.getValue()
        }).show();
        
        $('button.complete').click(function() {
            if (_this.onCompleteCallback) {
                sheet.hide();
                _this.onCompleteCallback($('#sheet textarea').val());
            }
        })
    }
});
