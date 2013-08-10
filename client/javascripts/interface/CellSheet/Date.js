var CellSheet_Date = Backbone.View.extend({
    monthNames: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ],
    
    selectedYear: new Date().getFullYear(),
    selectedMonth: new Date().getMonth(),
    
    showDatePicker: true,
    showTimePicker: true,
    showYearPicker: false,
    
    initialOffsetDays: [26,27,28,29,30,31],
    numberOfDays: 28,
    finalOffsetDays: [1,2,3,4,5,6,7,8],
    
    
    initialize: function(cell) {
        this.cell = cell;
        
        // Get value:
        this.value = cell.getValue();
        this.dateVal = new Date(this.value);
        this.selectedMonth = this.dateVal.getMonth();
        this.selectedYear = this.dateVal.getFullYear();
        
        // Check datatype and enable/disable datepicker features:
        var datatype = this.cell.column.getDatatype().toUpperCase();
        
        // If date, don't show the time picker:
        if (datatype == 'DATE') {
            this.showDatePicker = true;
            this.showTimePicker = false;
            this.showYearPicker = false;
        } else if (datatype == 'TIME') {
            this.showDatePicker = false;
            this.showTimePicker = true;
            this.showYearPicker = false;
        } else if (datatype == 'YEAR') {
            this.showDatePicker = false;
            this.showTimePicker = false;
            this.showYearPicker = true;
        } else {
            this.showDatePicker = true;
            this.showTimePicker = true;
            this.showYearPicker = false;
        }
    },
    
    onComplete: function(callback) {
        this.onCompleteCallback = callback;
    },
    
    display: function() {
        var _this = this;
        
        sheet.setTemplate('#template-cell-editable-date', {
            value: this.cell.getValue(),
            showDatePicker: this.showDatePicker,
            showTimePicker: this.showTimePicker,
            showYearPicker: this.showYearPicker
        });
        
        sheet.show();
        
        this.renderDatePicker();
        this.renderTimePicker();
        
        $('button.complete').click(function() {
            if (_this.onCompleteCallback) {
                sheet.hide();
                _this.onCompleteCallback($('#sheet input.value').val());
            }
        });
    },
    
    
    renderDatePicker: function() {
        var _this = this;
        
        // Get number of days in the selected month:
        this.numberOfDays = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
        
        // Get the last day of previous month (for initial offset):
        if (this.selectedMonth == 0) {
            var lastDayOflastMonth = new Date(this.selectedYear - 1, 11, 0).getDate();
        } else {
            var lastDayOflastMonth = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
        }
        
        // Get the initial offset:
        var dayOffset = new Date(this.selectedYear, this.selectedMonth, 1).getDay();
        this.initialOffsetDays = [];
        for (var i = lastDayOflastMonth - (dayOffset - 2); i <= lastDayOflastMonth; i++) {
            this.initialOffsetDays.push(i);
        }
        
        // Get final offset:
        var numberFilled = this.initialOffsetDays.length + this.numberOfDays;
        var finalOffsetMax = (6 * 7) - numberFilled;
        this.finalOffsetDays = [];
        for (var i = 0; i < finalOffsetMax; i++) {
            this.finalOffsetDays.push(i + 1);
        }
        
        var selectedMonthTitle = this.monthNames[this.selectedMonth];
        
        // Get active date information:
        var activeYear = this.dateVal.getFullYear();
        var activeMonth = this.dateVal.getMonth();
        var activeDay = this.dateVal.getDate();
        
        // Get selected year:
        var selectedYear = this.selectedYear;
        
        var template = $('#template-datepicker').html();
        var html = _.template(template, {
            selectedMonthTitle: selectedMonthTitle,
            selectedMonth: this.selectedMonth,
            selectedYear: this.selectedYear,
            
            activeYear: activeYear,
            activeMonth: activeMonth,
            activeDay: activeDay,
            
            numberOfDays: this.numberOfDays,
            initialOffsetDays: this.initialOffsetDays,
            finalOffsetDays: this.finalOffsetDays,
            
            showDatePicker: this.showDatePicker,
            showTimePicker: this.showTimePicker,
            showYearPicker: this.showYearPicker
        });
        $('#sheet .datepicker').html(html);
        
        
        $('#sheet .datepicker .bar').find('.next, .prev').click(function() {
            if ($(this).hasClass('next')) {
                _this.selectedMonth++;
                if (_this.selectedMonth >= 12) {
                    _this.selectedMonth = 0;
                    _this.selectedYear++;
                }
            } else {
                _this.selectedMonth--;
                if (_this.selectedMonth < 0) {
                    _this.selectedMonth = 11;
                    _this.selectedYear--;
                }
            }
            
            _this.renderDatePicker();
        });
        
        $('#sheet .datepicker .day.pickable').click(function() {
            $('#sheet .datepicker .day.active').removeClass('active');
            $(this).addClass('active');
            
            var newSelectedYear = _this.selectedYear;
            var newSelectedMonth = _this.selectedMonth;
            var newSelectedDay = parseInt($(this).text().trim());
            
            var newHour = 0;
            var newMinute = 0;
            var newSeconds = 0;
            
            var newDateVal = new Date(Date.UTC(newSelectedYear, newSelectedMonth, newSelectedDay, newHour, newMinute, newSeconds));
            
            _this.dateVal = newDateVal;
            
            console.log(newSelectedYear, newSelectedMonth, newSelectedDay);
            console.log(newDateVal);
        });
    },
    
    renderTimePicker: function() {
        var template = $('#template-timepicker').html();
        var html = _.template(template, {
        });
        $('#sheet .timepicker').html(html);
    }
});
