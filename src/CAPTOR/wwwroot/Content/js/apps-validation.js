/* Validate function to enable/ disable button */
var isallBlank = true;
function checkText() {
    checkText.counter = checkText.counter + 1;
}

var checkemail = 0;
var checkphone = 0;
checkText.counter = 100;
var checkdate = 0;


/* Verify Email Address */

function validateEmail() {
    $(".btn-after-validation").css("display", "none");
    $(".btn-before-validation").css("display", "block");
    var email_address = $("input[type='email']").val();
    if (email_address == "") {

        $("input[type='email']").css("border-color", "#8f8f8f");
        $("label[typeof='email']").css("color", "#8f8f8f");
        checkemail = 0;
        finalizevalidation();
    }
    else {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!filter.test(email_address)) {
            $("input[type='email']").css("border-color", "#c04b59");
            $("label[typeof='email']").css("color", "#c04b59");
            checkemail = 1;
        }
        else {
            $("input[type='email']").css("border-color", "#8f8f8f");
            $("label[typeof='email']").css("color", "#8f8f8f");
            checkemail = 0;
            finalizevalidation();
        }
    }
}


/* Verify Phone Number */

function validatePhone() {
    $(".btn-after-validation").css("display", "none");
    $(".btn-before-validation").css("display", "block");
    var phone = $("input.val-phone[type='tel']").val();
    if (phone == "") {
        $("input[type='tel']").css("border-color", "#8f8f8f");
        $("label[typeof='tel']").css("color", "#8f8f8f");
        checkphone = 0;
        finalizevalidation();
    }
    else {
        var filter = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/;

        if (!filter.test(phone)) {
            $("input[type='tel']").css("border-color", "#c04b59");
            $("label[typeof='tel']").css("color", "#c04b59");
            checkphone = 1;
        }
        else {
            $("input[type='tel']").css("border-color", "#8f8f8f");
            $("label[typeof='tel']").css("color", "#8f8f8f");
            checkphone = 0;
            finalizevalidation(4);
        }

    }

}

/* Verify Date*/

function validateDate() {
    var date = $("input.val-date[type='text']").val();
    if (date != null) {
        if (isDate(date)) {
            $("input.val-date[type='text']").css("border-color", "#8f8f8f");
            $("span[typeof='date']").css("border-color", "#8f8f8f");
            $("label[typeof='date']").css("color", "#8f8f8f");
            checkdate = 0;
            finalizevalidation(4);
        }
        else {

            $("input.val-date[type='text']").css("border-color", "#c04b59");
            $("span[typeof='date']").css("border-color", "#c04b59");
            $("label[typeof='date']").css("color", "#c04b59");
            checkdate = 1;
        }
    }

}

/**Verify Not Future Date**/

function nofutureDate(dtStr) {
    var receiveddate = Date.parse(dtStr);
    var today = new Date();
    if (receiveddate > today) {
        return false;
    }
    else {
        return true;
    }
}

/**Verify Not Future Date & Time**/

function nofutureDateTime(received_date) {
    
    var currentdate = new Date();
    var gethours = currentdate.getHours();
    gethours = parseInt(gethours);
    if (gethours < 10) {
        gethours = "0" + gethours;
    }
    var getminutes = currentdate.getMinutes();
    getminutes = parseInt(getminutes);
    if (getminutes < 10) {
        getminutes = "0" + getminutes;
    }
    var currentdatetime = (currentdate.getMonth() + 1) + "/" + currentdate.getDate() + "/" + currentdate.getFullYear() + " " + gethours + ":" + getminutes + ":" + currentdate.getSeconds();
    var checkcurrentdatetime = new Date(currentdatetime);
    var checkreceived_date = new Date(received_date);
    if (checkreceived_date < checkcurrentdatetime) {
        return true;
    }
    else {
        return false;
    }
}

/**Verify Not Less than One Of Received Date Time Range when Compared To Others**/

function noDateTimelessthanreceivedrange(received_datetimerange, catchoriginal_timedaterange) {
    received_datetimerange = new Date(received_datetimerange);
    catchoriginal_timedaterange = new Date(catchoriginal_timedaterange);
    if (received_datetimerange <= catchoriginal_timedaterange ) {
        return true;
    }
    else {
        return false;
    }
}

/**Verify Not Less than One Of Received Date Range when Compared To Others**/

function noDatelessthanreceivedrange(received_daterange, catchoriginal_daterange) {
    received_daterange = new Date(received_daterange);
    catchoriginal_daterange = new Date(catchoriginal_daterange);
    if (received_daterange <= catchoriginal_daterange) {
        return true;
        console.log("yes");
    }
    else {
        return false;
        console.log("no");
    }
}

/**Verify Not Past Date**/

function nopastDate(dtStr) {
    var receiveddate = Date.parse(dtStr);
    var today = new Date();
    today.setDate(today.getDate() - 1);
    if (receiveddate > today) {
        return true;
    }
    else {
        return false;
    }
}


/** Validating Date **/

function isInteger(s) {
    var i;
    for (i = 0; i < s.length; i++) {
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}

function stripCharsInBag(s, bag) {
    var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

function daysInFebruary(year) {
    // February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28);
}
function DaysArray(n) {
    for (var i = 1; i <= n; i++) {
        this[i] = 31
        if (i == 4 || i == 6 || i == 9 || i == 11) { this[i] = 30 }
        if (i == 2) { this[i] = 29 }
    }
    return this
}

function isDate(dtStr) {


    var dtCh = '/';
    var minYear = 1900;
    var maxYear = 2100;
    var daysInMonth = DaysArray(12)
    var pos1 = dtStr.indexOf(dtCh)
    var pos2 = dtStr.indexOf(dtCh, pos1 + 1)
    var strMonth = dtStr.substring(0, pos1)
    var strDay = dtStr.substring(pos1 + 1, pos2)
    var strYear = dtStr.substring(pos2 + 1)
    strYr = strYear
    if (strDay.charAt(0) == "0" && strDay.length > 1) strDay = strDay.substring(1)
    if (strMonth.charAt(0) == "0" && strMonth.length > 1) strMonth = strMonth.substring(1)
    for (var i = 1; i <= 3; i++) {
        if (strYr.charAt(0) == "0" && strYr.length > 1) strYr = strYr.substring(1)
    }
    month = parseInt(strMonth)
    day = parseInt(strDay)
    year = parseInt(strYr)
    if (pos1 == -1 || pos2 == -1) {

        return false
    }
    if (strMonth.length < 1 || month < 1 || month > 12) {

        return false
    }
    if (strDay.length < 1 || day < 1 || day > 31 || (month == 2 && day > daysInFebruary(year)) || day > daysInMonth[month]) {

        return false
    }
    if (strYear.length != 4 || year == 0 || year < minYear || year > maxYear) {

        return false
    }
    if (dtStr.indexOf(dtCh, pos2 + 1) != -1 || isInteger(stripCharsInBag(dtStr, dtCh)) == false) {

        return false
    }
    return true
}

function ValidateForm() {
    var dt = document.frmSample.txtDate
    if (isDate(dt.value) == false) {
        dt.focus()
        return false
    }
    return true
}




function validateText(getText, ctrl) {
    $(ctrl.closest(".validation-check")).bind('click mouseover mouseout blur', function () {
        var validationscope = ctrl.closest(".validation-check");
        $(validationscope).find('input.required[type="text"]').each(function () {

            if ($(this).val() == "") {
                $(this).css("border-color", "#c04b59");
                $(this).prev().css("color", "#c04b59");
            }
            else {
                $(this).css("border-color", "#8f8f8f");
                $(this).prev().css("color", "#8f8f8f");
                checkText.counter++;
            }
        });
        finalizevalidation(getText, validationscope);
    });
}

function validateCheckBox(getText, ctrl) {
    $(ctrl.closest(".validation-check")).bind('click mouseover mouseout blur', function () {
        var validationscope = ctrl.closest(".validation-check");
        var groups = [];
        var chkgroups = [];
        $(validationscope).find('input.required[type="radio"]').each(function () {
            if ($(this).is("[data-group]")) {
                if ($(this).data('group') != null && $(this).data('group').trim() != '' && typeof ($(this).data('group')) != undefined && jQuery.inArray($(this).data('group').trim(), groups) == -1)
                    groups.push($(this).data('group'));
            }
        });

        if (groups != null && groups.length > 0) {
            for (var grp = 0; grp < groups.length; grp++) {
                chkgroups.push($(validationscope).find("input.required[type='radio'][data-group='" + groups[grp] + "']:checked").length);
            }
        }

        for (var i = 0; i < chkgroups.length; i++) {
            var chkbxs = $(validationscope).find("input.required[type='radio'][data-group='" + groups[i] + "']");
            if (chkgroups[i] == 0) {
                //for (var j = 0; j < chkbxs.length; j++)
                //{
                //    chkbxs[j].css("border-color", "#c04b59");
                //    chkbxs[j].prev().css("color", "#c04b59");
                //}
                //$(validationscope).find("input.required[type='radio'][data-group='" + groups[i] + "']").each(element => function () {
                //    element.css("border-color", "#c04b59");
                //    element.prev().css("color", "#c04b59");
                //});
            }
            else {
                for (var j = 0; j < chkbxs.length; j++) {
                    //chkbxs[j].css("border-color", "#8f8f8f");
                    //chkbxs[j].prev().css("color", "#8f8f8f");
                }
                checkText.counter++;
                //$(validationscope).find("input.required[type='radio'][data-group='" + groups[i] + "']").each(element => function () {
                //    element.css("border-color", "#8f8f8f");
                //    element.prev().css("color", "#8f8f8f");
                //    checkText();
                //});
            }
        }
        finalizevalidation(getText, validationscope);
    });
}

function finalizevalidation(getText, scope) {


    if ((checkText.counter > (getText - 1)) && (checkdate == 0) && (checkphone == 0) && (checkemail == 0)) {
        // $("#btn-save").removeClass("disabled red-tooltip");
        //$("#btn-save").removeAttr("data-toggle");
        //$("#btn-save").removeAttr("data-original-title");
        //$("#btn-save").removeData("toggle");
        $(scope.find(".btn-after-validation")).css("display", "block");
        $(scope.find(".btn-before-validation")).css("display", "none");

    }
    else {
        //$("#btn-save").addClass("disabled red-tooltip");
        //$("#btn-save").attr("data-original-title", "Required Fields are Missing");
        //$("#btn-save").attr("data-toggle", "tooltip");
        $(scope.find(".btn-after-validation")).css("display", "none");
        $(scope.find(".btn-before-validation")).css("display", "block");

    }
    checkText.counter = 0;
}

$(document).ready(function () {

    $(".btn-after-validation").css("display", "none");


    $('input[type="tel"]').keydown(function (e) {
        var key = e.charCode || e.keyCode || 0;
        $phone = $(this);

        // Auto-format- do not expose the mask as the user begins to type
        if (key !== 8 && key !== 9) {
            if ($phone.val().length === 3) {
                $phone.val($phone.val() + '-');
            }
            if ($phone.val().length === 4) {
                $phone.val($phone.val() + '');
            }
            if ($phone.val().length === 7) {
                $phone.val($phone.val() + '-');
            }
        }

        // Allow numeric (and tab, backspace, delete) keys only
        return (key == 8 ||
                key == 9 ||
                key == 46 ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
    })

             .bind('focus click', function () {
                 $phone = $(this);

                 if ($phone.val().length === 0) {
                     $phone.val('');
                 }
                 else {
                     var val = $phone.val();
                     $phone.val('').val(val); // Ensure cursor remains at the end
                 }
             })

             .blur(function () {
                 $phone = $(this);

                 if ($phone.val() === '(') {
                     $phone.val('');
                 }
             });

});
