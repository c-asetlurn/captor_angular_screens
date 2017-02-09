
/*   
Documentation: http://www.seantheme.com/source-admin-v1.2/admin/
*/


/* 17. Custom Dropdowns
------------------------------------------------ */
var globalListOfDropDowns = [];
function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.dropdown > li');
    this.val = '';
    this.index = -1;
    globalListOfDropDowns.push(this);
    this.initEvents();
}

DropDown.prototype = {
    initEvents: function (e) {
        var obj = this;
        obj.dd.on('click', function (event) {
            $(this).toggleClass('active');
            return false;
        });

        obj.opts.on('click', function () {
            var opt = $(this);
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);
        });
    },
    getValue: function () {
        return this.val;
    },
    getIndex: function () {
        return this.index;
    },
    setValue: function (value, desc) {
        for (var i = 0; i < this.opts.length; i++) {
            if (this.opts[i].outerHTML.indexOf(value) > 0) {
                this.val = value;
                this.index = i;
                this.placeholder.text(desc);
                break;
            }
        }
    }
}


$(function () {

    $('.custom-dropdown').each(function (index, value) {
        var dd = new DropDown($(value));
    });

    $(document).click(function () {
        // all dropdowns
        $('.wrapper-dropdown-3').removeClass('active');
        // dropdown closes by clicking outside
        $(".custom-dropdown ul").parent().removeClass('active');
    });

});

var handleToggles = function () {
    // only needed for bootstrap:
    $(function jq() {
        var $body = $("body");

        $body.on("change", "label.btn.toggle-radio input[type='radio']", function radioToggleChange() {
            var $radio = $(this);

            $body.find("input[type='radio'][name='" + $radio.attr("name") + "']").parent("label").removeClass("btn-primary").addClass("btn-default");
            $radio.parent("label").removeClass("btn-default").addClass("btn-primary");
        });

        // trigger once to initialize
        $body.find("label.btn.toggle-radio input[type='radio']:checked").trigger("change");
    });
};

var handleFormMaskedInput = function () {
    "use strict";

    $("#masked-input-date").mask("99/99/9999");
    $("#masked-input-phone").mask("(000) 000-0000");
    $("#masked-input-tid").mask("99-9999999");
    $("#masked-input-ssn").mask("999-99-9999");
    $("#masked-input-pno").mask("aaa-9999-a");
    $("#masked-input-pkey").mask("a*-999-a999");
};

var handleJqueryAutocomplete = function () {
    "use strict";
    
    var availableTags = [
        'THC-Marijuana',
        'COC-Cocaine',
        'MOR-Morphine',
        'AMP-Amphetamines',
        'PCP-PCP',
        'MAM- Monoacetylmorphine (Heroin)',
        'OXY-Oxycodone',
        'BZO-Benzoepenephrine',
        'BUP-Buprenorphine',
        'MTD-Methodone',
        'OPI-Opiates',
        'ALC-Alcohol',
        'BAR-Barbituates',
        'PPX-Propoxyphene (opioid)',
        'ETOH-Ethanol (Alcohol)'
    ];


    $("#jquery-autocomplete").tagit({
        availableTags: availableTags,
        autocomplete: { delay: 0, minLength: 1 },

        afterTagAdded: function () {
            validation()
        },
        afterTagRemoved: function () {
            validation()
        }
    });

    
}


var handleAppsAutocomplete = function () {
    "use strict";

    var OVAUSersList = [
        'John Doe',
        'Jane McEntire',
        'Lewis Clark',
        'Tony Romo',
        'Mark Anthony'
    ];
    $('#OVAUsersAutocomplete').tagit({
        autocomplete: {
            source: OVAUSersList
        },

        beforeTagAdded: function (event, ui) {
            if ($.inArray(ui.tagLabel, OVAUSersList) == -1) {
                return false;
            }
        }
    });


    var substances = [
        'John Doe',
        'Jane McEntire',
        'Lewis Clark',
        'Tony Romo',
        'Mark Anthony'
    ];
    $('#jquery-autocomplete').tagit({
        autocomplete: {
            source: substances
        },

        beforeTagAdded: function (event, ui) {
            if ($.inArray(ui.tagLabel, substances) == -1) {
                return false;
            }
        }
    });


    var appsavailableTags = [
        'Case Notes',
        'IMS',
        'OVAMS'
    ];
    $('#apps-autocomplete').tagit({
        autocomplete: {
            minLength: 0,
            source: function (request, response) {
                var data = $.grep(appsavailableTags, function (value) {
                    return value.substring(0, request.term.length).toLowerCase() == request.term.toLowerCase();
                });
                response(data);
            }
        },

        beforeTagAdded: function (event, ui) {
            if ($.inArray(ui.tagLabel, appsavailableTags) == -1) {
                return false;
            }
        }
    }).focus(function () {
        $(this).autocomplete("search", "");
    }).keyup(function () {
        var isValid = false;
        for (i in appsavailableTags) {
            if (appsavailableTags[i].toLowerCase().match(this.value.toLowerCase())) {
                isValid = true;
            }
        }
        if (!isValid) {
            this.value = previousValue
        } else {
            previousValue = this.value;
        }
    });
}

//IMS STG Affiliation Leader Fields

var handleLeaderAutocomplete = function () {
    "use strict";

    var leaderavailableTags = [
       'SCI',
       'State-wide'
    ];
    $('#leader-autocomplete').tagit({
        autocomplete: {
            source: leaderavailableTags
        },

        beforeTagAdded: function (event, ui) {
            if ($.inArray(ui.tagLabel, leaderavailableTags) == -1) {
                return false;
            }
        }
    });

}

var handleTagsInput = function () {
    "use strict";

    $('.bootstrap-tagsinput input').focus(function () {
        $(this).closest('.bootstrap-tagsinput').addClass('bootstrap-tagsinput-focus');
    });
    $('.bootstrap-tagsinput input').focusout(function () {
        $(this).closest('.bootstrap-tagsinput').removeClass('bootstrap-tagsinput-focus');
    });
};

var handleJqueryTagIt = function () {
    "use strict";

    $('#jquery-tagIt-default').tagit({
        availableTags: ["SCI", "CCC/CCF", "Federal", "County", "PBPP"]
    });
};

var handleSelect2 = function () {
    "use strict";

    $(".default-select2").select2();
    $(".multiple-select2").select2({ placeholder: "Select a state" });
};

var handleDatepicker = function () {
    "use strict";

    $('#datepicker-default').datepicker({
        todayHighlight: true
    });
    $('#datepicker-inline').datepicker({
        todayHighlight: true
    });
    $('.input-daterange').datepicker({
        todayHighlight: true
    });
    $('#datepicker-disabled-past').datepicker({
        todayHighlight: true
    });
    $('#datepicker-autoClose').datepicker({
        todayHighlight: true,
        autoclose: true
    });

    $('.date').datepicker({
        todayHighlight: true,
        autoclose: true
    });

    $('#createDissemination').datepicker({
        todayHighlight: true,
        endDate: moment(),
        maxDate: moment(),
        autoclose: true
    });
};

var handleIonRangeSlider = function () {
    "use strict";

    $('#default_rangeSlider').ionRangeSlider({
        min: 0,
        max: 5000,
        type: 'double',
        prefix: "$",
        maxPostfix: "+",
        prettify: false,
        hasGrid: true
    });
    $('#customRange_rangeSlider').ionRangeSlider({
        min: 1000,
        max: 100000,
        from: 30000,
        to: 90000,
        type: 'double',
        step: 500,
        postfix: " €",
        hasGrid: true
    });
    $('#customValue_rangeSlider').ionRangeSlider({
        values: [
            'January', 'February', 'March',
            'April', 'May', 'June',
            'July', 'August', 'September',
            'October', 'November', 'December'
        ],
        type: 'single',
        hasGrid: true
    });
};

var handleFormTimePicker = function () {
    "use strict";

    $('#timepicker').timepicker();
};

var handleDateRangePicker = function () {
    "use strict";

    $('#contactDR').daterangepicker({
        format: 'MM/DD/YYYY HH:mm',
        startDate: moment().subtract(0, 'days'),
        endDate: moment(),
        maxDate: moment(),
        dateLimit: { days: 60 },
        use24hours: true,
        showDropdowns: true,
        showWeekNumbers: false,
        timePicker: true,
        timePickerIncrement: 5,
        timePicker12Hour: true,
        defaultTime: false,
        opens: 'left',
        drops: 'down',
        autoApply: true,
        buttonClasses: ['btn', 'btn-sm', 'btn-default', 'case-list-range', 'no-icon', 'm-l-0', 'col-xs-12'],
        cancelClass: 'btn-secondary',
        separator: ' to ',
        locale: {
            applyLabel: 'Apply',
            cancelLabel: 'Cancel',
            fromLabel: 'From',
            toLabel: 'To',
            customRangeLabel: 'Custom',
            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            firstDay: 1
        }
    }, function (start, end, label) {
        $('#contactDR').html(start.format('MM/DD/YYYY hh:mm a') + ' - ' + end.format('MM/DD/YYYY hh:mm a'));
    });

    $('#summaryDateRange').daterangepicker({
        format: 'MM/DD/YYYY',
        startDate: moment().subtract(0, 'days'),
        endDate: moment(),
        maxDate: moment(),
        dateLimit: { days: 60 },
        showDropdowns: true,
        showWeekNumbers: false,
        timePicker: false,
        defaultTime: false,
        opens: 'right',
        drops: 'down',
        autoApply: true,
        buttonClasses: ['btn', 'btn-sm', 'btn-default', 'case-list-range', 'no-icon', 'm-l-0', 'col-xs-12'],
        cancelClass: 'btn-secondary',
        separator: ' to ',
        locale: {
            applyLabel: 'Apply',
            cancelLabel: 'Cancel',
            fromLabel: 'From',
            toLabel: 'To',
            customRangeLabel: 'Custom',
            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            firstDay: 1
        }
    }, function (start, end, label) {
        $('#summaryDateRange').html(start.format('MM/DD/YYYY') + ' To ' + end.format('MM/DD/YYYY'));
    });


    $('#default-daterange').daterangepicker({
        opens: 'left',
        format: 'MM/DD/YYYY',
        separator: ' to ',
        startDate: moment().subtract(29, 'days'),
        endDate: moment(),
        minDate: '01/01/2012',
        maxDate: moment(),
    },
    function (start, end) {
        $('#default-daterange input').val(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'));
    });


    $('#advance-daterange').html(moment().subtract(29, 'days').format('MM/DD/YYYY hh:mm a') + ' - ' + moment().format('MM/DD/YYYY  hh:mm a'));

    $('.opens-left').daterangepicker({
        format: 'MM/DD/YYYY HH:mm',
        startDate: moment().subtract(0, 'days'),
        endDate: moment(),
        maxDate: moment(),
        dateLimit: { days: 60 },
        showDropdowns: true,
        showWeekNumbers: false,
        timePicker: true,
        timePickerIncrement: 5,
        timePicker12Hour: true,
        defaultTime: false,
        opens: 'left',
        drops: 'down',
        autoApply: true,
        buttonClasses: ['btn', 'btn-sm', 'no-icon', 'm-l-0', 'col-xs-12'],
        applyClass: 'btn-default',
        cancelClass: 'btn-secondary',
        separator: ' to ',
        locale: {
            applyLabel: 'Apply',
            cancelLabel: 'Cancel',
            fromLabel: 'From',
            toLabel: 'To',
            customRangeLabel: 'Custom',
            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            firstDay: 1
        }
    }, function (start, end, label) {
        $('#advance-daterange').html(start.format('MM/DD/YYYY hh:mm a') + ' - ' + end.format('MM/DD/YYYY hh:mm a'));
    });


    $('.opens-right').daterangepicker({
        format: 'MM/DD/YYYY HH:mm',
        startDate: moment().subtract(0, 'days'),
        endDate: moment(),
        maxDate: moment(),
        dateLimit: { days: 60 },
        use24hours: true,
        showDropdowns: true,
        showWeekNumbers: false,
        timePicker: true,
        timePickerIncrement: 5,
        timePicker12Hour: true,
        defaultTime: false,
        opens: 'right',
        drops: 'down',
        autoApply: true,
        buttonClasses: ['btn', 'btn-sm', 'no-icon', 'm-l-0', 'col-xs-12'],
        applyClass: 'btn-default',
        cancelClass: 'btn-secondary',
        separator: ' to ',
        locale: {
            applyLabel: 'Apply',
            cancelLabel: 'Cancel',
            fromLabel: 'From',
            toLabel: 'To',
            customRangeLabel: 'Custom',
            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            firstDay: 1
        }
    }, function (start, end, label) {
        $('#advance-daterange').html(start.format('MM/DD/YYYY hh:mm a') + ' - ' + end.format('MM/DD/YYYY hh:mm a'));
    });
};


/* Handle Phone Number Validations
------------------------------------------------ */
var handlePhoneNumbersOnly = function () {
    "use strict";

    //$('input[type=tel]').keyup(function () {
    //    var numbers = $(this).val();
    //    $(this).val(numbers.replace(/\D/, ''));
    //});
};




/* Application Controller
------------------------------------------------ */

var FormPlugins = function () {
    "use strict";

    return {
        init: function () {
            handleToggles();
            handleAppsAutocomplete();
            handleJqueryAutocomplete();
            handleLeaderAutocomplete();
            handleTagsInput();
            handleJqueryTagIt();
            handlePhoneNumbersOnly();
        }
    };
}();




