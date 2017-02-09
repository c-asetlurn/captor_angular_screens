/* DATE TIME PICKER VALIDATION PLUGIN
   AUTHOR: HARIKRISHNAN GOPAL JANAKIRAMAN, UI/UX DEVELOPER OF DEPARTMENT OF CORRECTIONS
*/

$.timepicker.log = function () {
    // Older IE (9, maybe 10) throw error on accessing `window.console.log.apply`, so check first.
    //if (window.console && window.console.log && window.console.log.apply) {
    //    window.console.log.apply(window.console, Array.prototype.slice.call(arguments));
    //}
    return;
};

//Function to Hide DateTimePicker / Date Picker while Entering TinyMCE

$(".tinymceWrapper").mouseenter(function () {
    $(':focus').blur();
    $("#ui-datepicker-div").css('display', 'none');
});

function datetimerangepicker(startdateelementid, enddateelementid) {

    //Initiating variables for datetimerangepickers
    var startDate = $(startdateelementid);
    var endDate = $(enddateelementid);
    var catchdate_start_date = 0;
    var catchnumber_start_date = 0;
    var catchcharacter_start_date = 0;
    var catchdate_end_date = 0;
    var catchnumber_end_date = 0;
    var catchcharacter_end_date = 0;
    //Start Date
    startDate.datetimepicker({
        timeFormat: "HHmm 'hrs'",
        parse: 'strict',
        showButtonPanel: false,
        showTime: true,
        oneLine: true,
        constrainInput: false,
        onClose: function (dateText, inst) {
            if (endDate.val() != '') {
                var testStartDate = startDate.datetimepicker('getDate');
                var testEndDate = endDate.datetimepicker('getDate');
                if (testStartDate > testEndDate)
                    endDate.datetimepicker('setDate', testStartDate);
            }
            else {
                endDate.val(dateText);
            }
        },
        onSelect: function (selectedDateTime) {
            endDate.datetimepicker('option', 'minDate', startDate.datetimepicker('getDate'));
        }
    });
    startDate.focusout(function () {
        if (((catchdate_start_date == 1) && (catchnumber_start_date == 1)) && (catchcharacter_start_date == 1)) {
            if (((catchdate_end_date != 1) || (catchnumber_end_date != 1)) || (catchcharacter_end_date != 1)) {
                endDate.val("");
            }
        }
        else {
            if (((catchdate_end_date == 1) && (catchnumber_end_date == 1)) && (catchcharacter_end_date == 1)) {
                startDate.val("");
            }
            else {
                startDate.val("");
                endDate.val("");

            }
        }
    });
    startDate.keyup(function () {
        triggerevent();
    });
    startDate.select(function () {
        triggerevent();
    });
    startDate.click(function () {
        $("#ui-datepicker-div").css('display', 'block');
        triggerevent();
    });
    startDate.keypress(function (e) {
        if ((e.keyCode == 104 || e.keyCode == 114 || e.keyCode == 115 || e.keyCode == 32) || ((e.keyCode >= 47) && (e.keyCode <= 57))) {
            return true;
        }
        else {
            return false;
        }
        if (e.which == 13) {
            datePicker.blur();
        }
    });
    $("#ui-datepicker-div").mouseleave(function () {
        triggerevent();
    });
    function triggerevent() {

        var date_input_tag = startDate.val();
        var checkdate = date_input_tag.substring(0, 10);
        var checknumber = date_input_tag.substring(11, 15);
        var checkcharacter = date_input_tag.substring(16, 19);
        if (checkcharacter == "hrs") {
            catchcharacter_start_date = 1;
        } else {
            catchcharacter_start_date = 0;
        }
        if ((checknumber.match(/^[0-9]+$/) != null) && (checknumber.length == 4)) {
            catchnumber_start_date = 1;
        } else {
            catchnumber_start_date = 0;
        }
        if (checkdate != null) {
            if (isDate(checkdate)) {
                catchdate_start_date = 1;
            }
            else {
                catchdate_start_date = 0;
            }
        } else {
            catchdate_start_date = 0;
        }
    }
    //End Date
    endDate.datetimepicker({
        timeFormat: "HHmm 'hrs'",
        parse: 'strict',
        showButtonPanel: false,
        showTime: true,
        oneLine: true,
        constrainInput: false,
        onClose: function (dateText, inst) {
            if (startDate.val() != '') {
                var testStartDate = startDate.datetimepicker('getDate');
                var testEndDate = endDate.datetimepicker('getDate');
                if (testStartDate > testEndDate)
                    startDate.datetimepicker('setDate', testEndDate);
            }
            else {
                startDate.val(dateText);
            }
        },
        onSelect: function (selectedDateTime) {
            startDate.datetimepicker('option', 'maxDate', endDate.datetimepicker('getDate'));
        }
    });
    endDate.focusout(function () {
        if (((catchdate_end_date == 1) && (catchnumber_end_date == 1)) && (catchcharacter_end_date == 1)) {
        }
        else {
            if (((catchdate_start_date == 1) && (catchnumber_start_date == 1)) && (catchcharacter_start_date == 1)) {
                endDate.val("");
            }
            else {
                startDate.val("");
                endDate.val("");
            }
        }
    });
    endDate.keyup(function () {
        triggeredendevent();
    });
    endDate.select(function () {
        triggeredendevent();
    });
    endDate.click(function () {
        $("#ui-datepicker-div").css('display', 'block');
        triggeredendevent();
    });
    endDate.keypress(function (e) {
        if ((e.keyCode == 104 || e.keyCode == 114 || e.keyCode == 115 || e.keyCode == 32) || ((e.keyCode >= 47) && (e.keyCode <= 57))) {
            return true;
        }
        else {
            return false;
        }
        if (e.which == 13) {
            datePicker.blur();
        }
    });
    $("#ui-datepicker-div").mouseleave(function () {
        triggeredendevent();
    });
    function triggeredendevent() {
        var date_input_tag = endDate.val();
        var checkenddate = date_input_tag.substring(0, 10);
        var checkendnumber = date_input_tag.substring(11, 15);
        var checkendcharacter = date_input_tag.substring(16, 19);
        if (checkendcharacter == "hrs") {
            catchcharacter_end_date = 1;
        } else {
            catchcharacter_end_date = 0;
        }
        if ((checkendnumber.match(/^[0-9]+$/) != null) && (checkendnumber.length == 4)) {
            catchnumber_end_date = 1;
        } else {
            catchnumber_end_date = 0;
        }
        if (checkenddate != null) {
            if (isDate(checkenddate)) {
                catchdate_end_date = 1;
            }
            else {
                catchdate_end_date = 0;
            }
        } else {
            catchdate_end_date = 0;
        }
    }

}

function daterangepicker(startdateelementid, enddateelementid) {
    //Initiating variables for daterangepickers
    var startDateWithNoTime = $(startdateelementid);
    var endDateWithNoTime = $(enddateelementid);
    var catchdate_start_date = 0;
    var catchdate_end_date = 0;

    //Start Date

    startDateWithNoTime.datepicker({
        showButtonPanel: false,
        onClose: function (dateText, inst) {
            if (endDateWithNoTime.val() != '') {
                var testStartDateWithNoTime = startDateWithNoTime.datetimepicker('getDate');
                var testEndDateWithNoTime = endDateWithNoTime.datetimepicker('getDate');
                if (testStartDateWithNoTime > testEndDateWithNoTime)
                    endDateWithNoTime.datepicker('setDate', testStartDateWithNoTime);
            }
            else {
                endDateWithNoTime.val(dateText);
            }
        },
        onSelect: function (selectedDateTime) {
            endDateWithNoTime.datepicker('option', 'minDate', startDateWithNoTime.datepicker('getDate'));
        }
    });
    startDateWithNoTime.focusout(function () {
        if (catchdate_start_date == 1) {
        }
        else {
            if (catchdate_end_date == 1) {
                startDateWithNoTime.val("");
            }
            else {
                startDateWithNoTime.val("");
                endDateWithNoTime.val("");

            }
        }
    });
    startDateWithNoTime.keyup(function () {
        triggerevent();
    });
    startDateWithNoTime.select(function () {
        triggerevent();
    });
    startDateWithNoTime.click(function () {
        $("#ui-datepicker-div").css('display', 'block');
        triggerevent();
    });
    startDateWithNoTime.keypress(function (e) {
        if (e.which == 13) {
            datePicker.blur();
        }
    });
    function triggerevent() {
        var date_input_tag = startDateWithNoTime.val();
        var checkdate = date_input_tag.substring(0, 10);
        if (checkdate != null) {
            if ((isDate(checkdate)) && (date_input_tag.length <= 10)) {
                catchdate_start_date = 1;
            }
            else {
                catchdate_start_date = 0;
            }
        } else {
            catchdate_start_date = 0;
        }
    }
    //End Date

    endDateWithNoTime.datepicker({
        showButtonPanel: false,
        onClose: function (dateText, inst) {
            if (startDateWithNoTime.val() != '') {
                var testStartDateWithNoTime = startDateWithNoTime.datetimepicker('getDate');
                var testEndDateWithNoTime = endDateWithNoTime.datetimepicker('getDate');
                if (testStartDateWithNoTime > testEndDateWithNoTime)
                    startDateWithNoTime.datepicker('setDate', testEndDateWithNoTime);
            }
            else {
                startDateWithNoTime.val(dateText);
            }
        },
        onSelect: function (selectedDateTime) {
            startDateWithNoTime.datepicker('option', 'maxDate', endDateWithNoTime.datepicker('getDate'));
        }
    });
    endDateWithNoTime.focusout(function () {
        if (catchdate_end_date == 1) {
        }
        else {
            if (catchdate_start_date == 1) {
                endDateWithNoTime.val("");
            }
            else {
                startDateWithNoTime.val("");
                endDateWithNoTime.val("");
            }
        }
    });
    endDateWithNoTime.keyup(function () {
        triggeredendevent();
    });
    endDateWithNoTime.select(function () {
        triggeredendevent();
    });
    endDateWithNoTime.click(function () {
        $("#ui-datepicker-div").css('display', 'block');
        triggeredendevent();
    });
    endDateWithNoTime.keypress(function (e) {
        if (e.which == 13) {
            datePicker.blur();
        }
    });
    function triggeredendevent() {
        var date_input_tag = endDateWithNoTime.val();
        var checkenddate = date_input_tag.substring(0, 10);
        if (checkenddate != null) {
            if ((isDate(checkenddate)) && (date_input_tag.length <= 10)) {
                catchdate_end_date = 1;
            }
            else {
                catchdate_end_date = 0;
            }
        } else {
            catchdate_end_date = 0;
        }
    }
}

function datepicker(dateelementid) {
    var datePicker = $(dateelementid);
    var catchdate_standard_date = 0;
    datePicker.datepicker({
        showButtonPanel: false
    });
    datePicker.focusout(function () {
        if (catchdate_standard_date == 1) {
        }
        else {
            datePicker.val("");
        }
    });
    datePicker.keyup(function () {
        triggerevent();
    });
    datePicker.select(function () {
        triggerevent();
    });
    datePicker.click(function () {
        $("#ui-datepicker-div").css('display', 'block');
        triggerevent();
    });
    datePicker.keypress(function (e) {
        if (e.which == 13) {
            datePicker.blur();
        }
    });
    function triggerevent() {
        var date_input_tag = datePicker.val();
        var checkdate = date_input_tag.substring(0, 10);
        if (checkdate != null) {
            if ((isDate(checkdate)) && (date_input_tag.length <= 10)) {
                catchdate_standard_date = 1;
            }
            else {
                catchdate_standard_date = 0;
            }
        } else {
            catchdate_standard_date = 0;
        }
    }
}

function datepickerfuturenone(dateelementid) {
    var noFutureDate = $(dateelementid);
    var catchdate_nofuture_date = 0;
    noFutureDate.datepicker({
        showButtonPanel: false,
        maxDate: '0'
    });
    noFutureDate.focusout(function () {
        if (catchdate_nofuture_date == 1) {
        }
        else {
            noFutureDate.val("");
        }
    });
    noFutureDate.keyup(function () {
        triggerevent();
    });
    noFutureDate.select(function () {
        triggerevent();
    });
    noFutureDate.click(function () {
        $("#ui-datepicker-div").css('display', 'block');
        triggerevent();
    });
    noFutureDate.keypress(function (e) {
        if (e.which == 13) {
            datePicker.blur();
        }
    });
    function triggerevent() {
        var date_input_tag = noFutureDate.val();
        var checkdate = date_input_tag.substring(0, 10);
        if (checkdate != null) {
            if ((isDate(checkdate)) && (nofutureDate(checkdate)) && (date_input_tag.length <= 10)) {
                catchdate_nofuture_date = 1;
            }
            else {
                catchdate_nofuture_date = 0;
            }
        } else {
            catchdate_nofuture_date = 0;
        }
    }
}

function datepickerpastnone(dateelementid) {
    var noPastDate = $(dateelementid);
    var catchdate_nopast_date = 0;
    noPastDate.datepicker({
        showButtonPanel: false,
        minDate: '0'
    });
    noPastDate.focusout(function () {
        if (catchdate_nopast_date == 1) {
        }
        else {
            noPastDate.val("");
        }
    });
    noPastDate.keyup(function () {
        triggerevent();
    });
    noPastDate.select(function () {
        triggerevent();
    });
    noPastDate.click(function () {
        $("#ui-datepicker-div").css('display', 'block');
        triggerevent();
    });
    noPastDate.keypress(function (e) {
        if (e.which == 13) {
            datePicker.blur();
        }
    });
    function triggerevent() {
        var date_input_tag = noPastDate.val();
        var checkdate = date_input_tag.substring(0, 10);
        if (checkdate != null) {
            if ((isDate(checkdate)) && (nopastDate(checkdate)) && (date_input_tag.length <= 10)) {
                catchdate_nopast_date = 1;
            }
            else {
                catchdate_nopast_date = 0;
            }
        } else {
            catchdate_nopast_date = 0;
        }
    }
}

function datetimepicker(dateelementid) {
    var dateTimePicker = $(dateelementid);
    var catchdate_timepicker = 0;
    var catchnumber_timepicker = 0;
    var catchcharacter_timepicker = 0;
    dateTimePicker.datetimepicker({
        timeFormat: "HHmm 'hrs'",
        showButtonPanel: false,
        showTime: true,
        oneLine: true,
    });
    dateTimePicker.focusout(function () {
        if (((catchdate_timepicker == 1) && (catchnumber_timepicker == 1)) && (catchcharacter_timepicker == 1)) {
        }
        else {
            dateTimePicker.val("");
        }
    });
    dateTimePicker.keyup(function () {
        triggerevent();
    });
    dateTimePicker.select(function () {
        triggerevent();
    });
    dateTimePicker.click(function () {
        $("#ui-datepicker-div").css('display', 'block');
        triggerevent();
    });
    dateTimePicker.keypress(function (e) {
        if (e.which == 13) {
            datePicker.blur();
        }
    });
    $("#ui-datepicker-div").mouseleave(function () {
        triggerevent();
    });
    function triggerevent() {
        var date_input_tag = dateTimePicker.val();
        var checkdate = date_input_tag.substring(0, 10);
        var checknumber = date_input_tag.substring(11, 15);
        var checkcharacter = date_input_tag.substring(16, 19);
        if (checkcharacter == "hrs") {
            catchcharacter_timepicker = 1;
        } else {
            catchcharacter_timepicker = 0;
        }
        if ((checknumber.match(/^[0-9]+$/) != null) && (checknumber.length == 4)) {
            catchnumber_timepicker = 1;
        } else {
            catchnumber_timepicker = 0;
        }
        if (checkdate != null) {
            if (isDate(checkdate)) {
                catchdate_timepicker = 1;
            }
            else {
                catchdate_timepicker = 0;
            }
        } else {
            catchdate_timepicker = 0;
        }
    }
}

function datetimepickerspecificrange(dateelementid, receiveddatetime) {
    var dateTimePickerSpecificRange = $(dateelementid);
    var catchdate_timepicker = 0;
    var catchnumber_timepicker = 0;
    var catchcharacter_timepicker = 0;
    var catchdate_specificrange = 0;
    var catchreceived_specificdaterange = 0;
    var catchoriginal_timedaterange;
    var received_date = receiveddatetime.substring(0, 10);
    received_date = parseInt(received_date);
    var received_time = receiveddatetime.substring(11, 15);
    var received_year = receiveddatetime.substring(6, 10);
    received_year = parseInt(received_year);
    var received_day = receiveddatetime.substring(3, 5);
    received_day = parseInt(received_day);
    var received_month = receiveddatetime.substring(0, 2);
    received_month = parseInt(received_month);
    received_month--;
    var received_hour = receiveddatetime.substring(11, 13);
    var received_minute = receiveddatetime.substring(13, 15);
    var received_datetimerange = (received_month + 1) + '/' + received_day + '/' + received_year + ' ' + received_hour + ':' + received_minute + ':00';
    var currentdate = new Date();
    dateTimePickerSpecificRange.datetimepicker({
        timeFormat: "HHmm 'hrs'",
        showButtonPanel: false,
        showTime: true,
        oneLine: true,
        minDate: new Date(received_year, received_month, received_day, received_hour, received_minute),
        maxDate: new Date(currentdate.getFullYear(), currentdate.getMonth(), currentdate.getDate(), currentdate.getHours(), currentdate.getMinutes())
    });

    dateTimePickerSpecificRange.focusout(function () {
        if (((catchdate_timepicker == 1) && (catchnumber_timepicker == 1)) && ((catchcharacter_timepicker == 1) && (catchdate_specificrange == 1)) && (catchreceived_specificdaterange == 1)) {

        }
        else {
            dateTimePickerSpecificRange.val("");
        }
    });
    dateTimePickerSpecificRange.keyup(function () {
        triggerevent();
    });
    dateTimePickerSpecificRange.select(function () {
        triggerevent();
    });
    dateTimePickerSpecificRange.click(function () {
        $("#ui-datepicker-div").css('display', 'block');
        triggerevent();
    });
    dateTimePickerSpecificRange.keypress(function (e) {
        if (e.which == 13) {
            datePicker.blur();
        }
    });
    $("#ui-datepicker-div").mouseleave(function () {
        triggerevent();

    });
    function triggerevent() {
        var date_input_tag = dateTimePickerSpecificRange.val();
        var checkdate = date_input_tag.substring(0, 10);
        var checknumber = date_input_tag.substring(11, 15);
        var checkcharacter = date_input_tag.substring(16, 19);
        var received_date = date_input_tag.substring(0, 10);
        received_date = parseInt(received_date);
        var received_time = date_input_tag.substring(11, 15);
        var received_year = date_input_tag.substring(6, 10);
        received_year = parseInt(received_year);
        var received_day = date_input_tag.substring(3, 5);
        received_day = parseInt(received_day);
        var received_month = date_input_tag.substring(0, 2);
        received_month = parseInt(received_month);
        received_month--;
        var received_hour = date_input_tag.substring(11, 13);
        var received_minute = date_input_tag.substring(13, 15);
        catchoriginal_timedaterange = (received_month + 1) + '/' + received_day + '/' + received_year + ' ' + received_hour + ':' + received_minute + ':00';
        if (nofutureDateTime(catchoriginal_timedaterange)) {
            catchdate_specificrange = 1;
        } else {
            catchdate_specificrange = 0;
        }

        if (noDateTimelessthanreceivedrange(received_datetimerange, catchoriginal_timedaterange)) {
            catchreceived_specificdaterange = 1;
        } else {
            catchreceived_specificdaterange = 0;
        }

        if (checkcharacter == "hrs") {
            catchcharacter_timepicker = 1;
        } else {
            catchcharacter_timepicker = 0;
        }
        if ((checknumber.match(/^[0-9]+$/) != null) && (checknumber.length == 4)) {
            catchnumber_timepicker = 1;
        } else {
            catchnumber_timepicker = 0;
        }
        if (checkdate != null) {
            if (isDate(checkdate)) {
                catchdate_timepicker = 1;
            }
            else {
                catchdate_timepicker = 0;
            }
        } else {
            catchdate_timepicker = 0;
        }
    }
}

function datepickerspecificrange(dateelementid, receiveddate) {
    var datePickerspecificrange = $(dateelementid);
    var catchdate_specificrange = 0;
    var catchreceived_specificdaterange = 0;
    var catchdate_standard_date = 0;
    var catchoriginal_daterange;
    var received_date = receiveddate.substring(0, 10);
    received_date = parseInt(received_date);
    var received_year = receiveddate.substring(6, 10);
    received_year = parseInt(received_year);
    var received_day = receiveddate.substring(3, 5);
    received_day = parseInt(received_day);
    var received_month = receiveddate.substring(0, 2);
    received_month = parseInt(received_month);
    received_month--;
    var received_daterange = (received_month + 1) + '/' + received_day + '/' + received_year;
    var currentdate = new Date();
    datePickerspecificrange.datepicker({
        showButtonPanel: false,
        minDate: new Date(received_year, received_month, received_day),
        maxDate: new Date(currentdate.getFullYear(), currentdate.getMonth(), currentdate.getDate())
    });
    datePickerspecificrange.focusout(function () {
        if (((catchdate_standard_date == 1) && ((catchdate_specificrange == 1) && (catchreceived_specificdaterange == 1)))) {

        }
        else {
            datePickerspecificrange.val("");
        }
    });
    datePickerspecificrange.keyup(function () {
        triggerevent();
    });
    datePickerspecificrange.select(function () {
        triggerevent();
    });
    datePickerspecificrange.click(function () {
        $("#ui-datepicker-div").css('display', 'block');
        triggerevent();
    });
    datePickerspecificrange.keypress(function (e) {
        if (e.which == 13) {
            datePickerspecificrange.blur();
        }
    });
    function triggerevent() {
        var date_input_tag = datePickerspecificrange.val();
        var checkdate = date_input_tag.substring(0, 10);
        var received_date = date_input_tag.substring(0, 10);
        received_date = parseInt(received_date);
        var received_year = date_input_tag.substring(6, 10);
        received_year = parseInt(received_year);
        var received_day = date_input_tag.substring(3, 5);
        received_day = parseInt(received_day);
        var received_month = date_input_tag.substring(0, 2);
        received_month = parseInt(received_month);
        received_month--;
        catchoriginal_daterange = (received_month + 1) + '/' + received_day + '/' + received_year;
        if (nofutureDate(catchoriginal_daterange)) {
            catchdate_specificrange = 1;
        } else {
            catchdate_specificrange = 0;
        }
        if (noDatelessthanreceivedrange(received_daterange, catchoriginal_daterange)) {
            catchreceived_specificdaterange = 1;
        } else {
            catchreceived_specificdaterange = 0;
        }
        if (checkdate != null) {
            if (isDate(checkdate)) {
                catchdate_standard_date = 1;
            }
            else {
                catchdate_standard_date = 0;
            }
        } else {
            catchdate_standard_date = 0;
        }
    }
}

function datetimerangepickerfuturenone(startdateelementid, enddateelementid) {

    //Initiating variables for datetimerangepickers
    var startDate = $(startdateelementid);
    var endDate = $(enddateelementid);
    var catchdate_start_date = 0;
    var catchnumber_start_date = 0;
    var catchcharacter_start_date = 0;
    var catchdate_end_date = 0;
    var catchnumber_end_date = 0;
    var catchcharacter_end_date = 0;
    //Start Date
    startDate.datetimepicker({
        timeFormat: "HHmm 'hrs'",
        parse: 'strict',
        showButtonPanel: false,
        showTime: true,
        oneLine: true,
        maxDate: '0',
        onClose: function (dateText, inst) {
            if (endDate.val() != '') {
                var testStartDate = startDate.datetimepicker('getDate');
                var testEndDate = endDate.datetimepicker('getDate');
                if (testStartDate > testEndDate)
                    endDate.datetimepicker('setDate', testStartDate);
            }
            else {
                endDate.val(dateText);
            }
        },
        onSelect: function (selectedDateTime) {
            endDate.datetimepicker('option', 'minDate', startDate.datetimepicker('getDate'));
        }
    });
    startDate.focusout(function () {
        if (((catchdate_start_date == 1) && (catchnumber_start_date == 1)) && (catchcharacter_start_date == 1)) {
            if (((catchdate_end_date != 1) || (catchnumber_end_date != 1)) || (catchcharacter_end_date != 1)) {
                endDate.val("");
            }
        }
        else {
            if (((catchdate_end_date == 1) && (catchnumber_end_date == 1)) && (catchcharacter_end_date == 1)) {
                startDate.val("");
            }
            else {
                startDate.val("");
                endDate.val("");

            }
        }
    });
    startDate.keyup(function () {
        triggerevent();
    });
    startDate.select(function () {
        triggerevent();
    });
    startDate.click(function () {
        $("#ui-datepicker-div").css('display', 'block');
        triggerevent();
    });
    startDate.keypress(function (e) {
        if (e.which == 13) {
            datePicker.blur();
        }
    });
    $("#ui-datepicker-div").mouseleave(function () {
        triggerevent();
    });
    function triggerevent() {
        var date_input_tag = startDate.val();
        var checkdate = date_input_tag.substring(0, 10);
        var checknumber = date_input_tag.substring(11, 15);
        var checkcharacter = date_input_tag.substring(16, 19);
        if (checkcharacter == "hrs") {
            catchcharacter_start_date = 1;
        } else {
            catchcharacter_start_date = 0;
        }
        if ((checknumber.match(/^[0-9]+$/) != null) && (checknumber.length == 4)) {
            catchnumber_start_date = 1;
        } else {
            catchnumber_start_date = 0;
        }
        if (checkdate != null) {
            if (isDate(checkdate) && (nofutureDate(checkdate))) {
                catchdate_start_date = 1;
            }
            else {
                catchdate_start_date = 0;
            }
        } else {
            catchdate_start_date = 0;
        }
        var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})(\s)(\d{4})(\s)([Hh]rs)$/;
        var dtArray = date_input_tag.trim().match(rxDatePattern);
        if (dtArray == null)
            catchdate_start_date = 0;
    }
    //End Date
    endDate.datetimepicker({
        timeFormat: "HHmm 'hrs'",
        parse: 'strict',
        showButtonPanel: false,
        showTime: true,
        oneLine: true,
        maxDate: '0',
        onClose: function (dateText, inst) {
            if (startDate.val() != '') {
                var testStartDate = startDate.datetimepicker('getDate');
                var testEndDate = endDate.datetimepicker('getDate');
                if (testStartDate > testEndDate)
                    startDate.datetimepicker('setDate', testEndDate);
            }
            else {
                startDate.val(dateText);
            }
        },
        onSelect: function (selectedDateTime) {
            startDate.datetimepicker('option', 'maxDate', endDate.datetimepicker('getDate'));
        }
    });
    endDate.focusout(function () {
        if (((catchdate_end_date == 1) && (catchnumber_end_date == 1)) && (catchcharacter_end_date == 1)) {
        }
        else {
            if (((catchdate_start_date == 1) && (catchnumber_start_date == 1)) && (catchcharacter_start_date == 1)) {
                endDate.val("");
            }
            else {
                startDate.val("");
                endDate.val("");
            }
        }
    });
    endDate.keyup(function () {
        triggeredendevent();
    });
    endDate.select(function () {
        triggeredendevent();
    });
    endDate.click(function () {
        $("#ui-datepicker-div").css('display', 'block');
        triggeredendevent();
    });
    $("#ui-datepicker-div").mouseleave(function () {
        triggeredendevent();
    });
    function triggeredendevent() {
        var date_input_tag = endDate.val();
        var checkenddate = date_input_tag.substring(0, 10);
        var checkendnumber = date_input_tag.substring(11, 15);
        var checkendcharacter = date_input_tag.substring(16, 19);
        if (checkendcharacter == "hrs") {
            catchcharacter_end_date = 1;
        } else {
            catchcharacter_end_date = 0;
        }
        if ((checkendnumber.match(/^[0-9]+$/) != null) && (checkendnumber.length == 4)) {
            catchnumber_end_date = 1;
        } else {
            catchnumber_end_date = 0;
        }
        if (checkenddate != null) {
            if (isDate(checkenddate) && (nofutureDate(checkenddate))) {
                catchdate_end_date = 1;
            }
            else {
                catchdate_end_date = 0;
            }
        } else {
            catchdate_end_date = 0;
        }
        var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})(\s)(\d{4})(\s)([Hh]rs)$/;
        var dtArray = date_input_tag.trim().match(rxDatePattern);
        if (dtArray == null)
            catchdate_end_date = 0;
    }

}
