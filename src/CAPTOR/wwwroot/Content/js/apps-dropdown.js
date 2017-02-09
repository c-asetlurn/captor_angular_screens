/*
Plugin: Dropdown
Version 1.1
Author: Harikrishnan Gopal Janakiraman, UI/UX Developer of Department Of Corrections
*/

var animation_enabled_multiselect = $('.animation-enabled-for-multiselect').attr("data-id");

function dropdownsearch(jsondata, field_id, keyword_code, description_name) {
    var parsejson = $.parseJSON(jsondata);
    var description = [];
    var keyword = [];
    var loopcounter = 0;
    var flag_keyword = 0;
    var flag_description = 1;
    var found_keyword = 0;
    var previousValue = "";
    $(parsejson).each(function (arrayheading, arrayvalue) {
        $.each(arrayvalue, function (elementheading, elementvalue) {
            if (flag_keyword == 0) {
                keyword[loopcounter] = elementvalue;
                flag_keyword = 1;
                flag_description = 0;
            }
            else if (flag_description == 0) {
                description[loopcounter] = elementvalue;
                flag_description = 1;
                flag_keyword = 0;
            }

        });
        loopcounter++;
    });

    description_name.description = description;
    keyword_code.keyword = keyword;
    var dropdown_values = description; //This description data loaded on the dropdown
    $(field_id).autocomplete({
        minLength: 0,
        source: function (request, response) {
            var data = $.grep(dropdown_values, function (value) {
                return value.substring(0, request.term.length).toLowerCase() == request.term.toLowerCase();
            });
            response(data);
        }
    }).focus(function () {
        $(this).autocomplete("search", "");
    }).keyup(function () {
        var isValid = false;
        for (i in dropdown_values) {
            if (dropdown_values[i].toLowerCase().match(this.value.toLowerCase())) {
                //checkcase = 1;
                isValid = true;
            }
        }
        if (!isValid) {
            this.value = previousValue
        } else {
            previousValue = this.value;
        }
    }).blur(function () {
        //this event is needed when the user focusses out of the control with the value not same as the one in the auto select list
        //if entered value is in the list then the value remains
        //else entered value is cleared off of the dropdown
        //Also we will have to trigger the change event manually
        //var isValid = false;
        //for (i in dropdown_values) {
        //    if (dropdown_values[i].toLowerCase() == ($(this).val().toLowerCase())) {
        //        isValid = true;
        //        break;
        //    } else {
        //        isValid = false;
        //    }
        //}
        //if (!isValid) {
        //    $(this).val('').trigger('change');
        //}

    });

}


//method used to retrieve the code for the description selected on the dropdown
function getdropdownselectedcode(passdescription, keyword_code, description_name) {
    var found_keyword = '';
    for (counter_description = 0; counter_description < description_name.description.length; counter_description++) {
        if (description_name.description[counter_description] === passdescription) {
            found_keyword = keyword_code.keyword[counter_description];
            break;
        }
    }
    return found_keyword;
};

//Multiselect Dropdown Activation Function

function multiselectdropdownactivate(field_id, array_values) {
    $(field_id).SearchMultiSelect({
        "list": array_values,
        "multiple": true,
        "autoComplete": true,
        "field_id": field_id.slice(1)
    });
}

//Multiselect Dropdown Search

function multiselectdropdownsearch(jsondata, field_id, keyword_code, description_name) {
    var parsejson = $.parseJSON(jsondata);
    var description = [];
    var keyword = [];
    var loopcounter = 0;
    var flag_keyword = 0;
    var flag_description = 1;
    var found_keyword = 0;
    var previousValue = "";
    $(parsejson).each(function (arrayheading, arrayvalue) {
        $.each(arrayvalue, function (elementheading, elementvalue) {
            if (flag_keyword == 0) {
                keyword[loopcounter] = elementvalue;
                flag_keyword = 1;
                flag_description = 0;
            }
            else if (flag_description == 0) {
                description[loopcounter] = elementvalue;
                flag_description = 1;
                flag_keyword = 0;
            }

        });
        loopcounter++;
    });

    description_name.description = description;
    keyword_code.keyword = keyword;
    var dropdown_values = description; //This description data loaded on the dropdown
    multiselectdropdownactivate(field_id, dropdown_values);
}

//Find Multiselect Code

function findmultiselectcode(passdescription, keyword, description) {
    for (counter_description = 0; counter_description < description.length; counter_description++) {
        if (description[counter_description] === passdescription) {
            found_keyword = keyword[counter_description];
            return found_keyword;
        }
    }
}


