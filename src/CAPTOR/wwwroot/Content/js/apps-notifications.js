/*   
Documentation: http://www.seantheme.com/source-admin-v1.2/admin/
*/


var handleMobileEmailSidebarToggle = function() {
	"use strict";
	
	if ($('[data-toggle="email-sidebar"]').length !== 0) {
        $('[data-toggle="email-sidebar"]').live('touchend', function(e) {
            e.preventDefault();
            if ($(this).closest('.dropdown').hasClass('open')) {
                $(this).closest('.dropdown').removeClass('open');
            } else {
                $(this).closest('.dropdown').addClass('open');
            }
        });
    }
};

var handleCheckboxToggle = function() {
	"use strict";
	
	if ($('[data-toggle="email-checkbox"]').length !== 0) {
        $('[data-toggle="email-checkbox"]').live('click', function(e) {
            e.preventDefault();
        
            var targetCheckbox = $(this).closest('.email-checkbox').find('input[type="checkbox"]');
            var targetRow = $(this).closest('tr');
        
            if ($(targetCheckbox).is(':checked')) {
                $(targetCheckbox).prop('checked', false);
                $(targetRow).removeClass('checked');
            } else {
                $(targetCheckbox).prop('checked', true);
                $(targetRow).addClass('checked');
            }
        });
    }
};

var handleCheckboxCheckedAll = function() {
	"use strict";
	
	if ($('[data-click="check-all"]').length !== 0) {
        $('[data-click="check-all"]').live('click', function(e) {
            e.preventDefault();
        
            var targetCheckbox = $(this).find('.fa');
        
            if ($(targetCheckbox).hasClass('fa-square-o')) {
                $(targetCheckbox).removeClass('fa-square-o').addClass('fa-check-square-o text-inverse');
                $('.email-checkbox').find('input[type="checkbox"]').prop('checked', false);
                $('[data-toggle="email-checkbox"]').click();
            } else {
                $(targetCheckbox).removeClass('fa-check-square-o text-inverse').addClass('fa-square-o');
                $('.email-checkbox').find('input[type="checkbox"]').prop('checked', true);
                $('[data-toggle="email-checkbox"]').click();
            }
        });
	}
};


    
/* Application Controller
------------------------------------------------ */
var Notifications = function () {
	"use strict";
	
	return {
		//main function
		init: function () {
            handleMobileEmailSidebarToggle();
            handleCheckboxToggle();
            handleCheckboxCheckedAll();
		}
    };
}();