/*   
Documentation: http://www.seantheme.com/source-admin-v1.2/admin/
*/


var nice;




/* 12. Handle Page Load - Show Content
------------------------------------------------ */
var handlePageLoad = function () {
    "use strict";
    $('#page-loader').addClass('hide');
    $('#page-container').addClass('in');

    $("html").backstretch("../Content/img/main-banner.jpg");

    (function ($) {
        var $window = $(window),
            $container = $('#page-container');

        function resize() {
            if ($window.width() <= 1400) {
                return $container.removeClass('page-right-sidebar-toggled') && $container.addClass('page-sidebar-minified');

            }

        }

        $window
            .resize(resize)
            .trigger('resize');
    })(jQuery);



    (function ($) {
        function floatLabel(inputType) {
            $(inputType).each(function () {
                var $this = $(this);
                // on focus add cladd active to label
                $this.focus(function () {
                    $this.next().addClass("active");
                });
                //on blur check field and remove class if needed
                $this.blur(function () {
                    if ($this.val() === '' || $this.val() === 'blank') {
                        $this.next().removeClass();
                    }
                });
            });
        }
        // just add a class of "floatLabel to the input field!"
        floatLabel(".float-label");
    })(jQuery);

    /* Disables backspace key when outside of a form field
    ------------------------------------------------ */
    $(document).keydown(function (e) {
        var element = e.target.nodeName.toLowerCase();
        if ((element != 'input' && element != 'textarea') || $(e.target).attr("readonly") || (e.target.getAttribute("type") === "checkbox")) {
            if (e.keyCode === 8) {
                return false;
            }
        }
    });

};



/* 15. Handle Theme - Color Theme Changing
------------------------------------------------ */
var handleThemePanel = function () {
    "use strict";

    $('[data-click="page-theme-selector"]').click(function (e) {
        e.preventDefault();

        var targetClass = $(this).attr('data-value');
        var targetContainer = 'body';
        var targetRemoveClass = $(targetContainer).attr('data-current-theme');

        if (!targetRemoveClass) {
            targetRemoveClass = '';
        }
        $('[data-click="page-theme-selector"]').not(this).closest('li').removeClass('active');
        $(this).closest('li').addClass('active');
        $(targetContainer).removeClass(targetRemoveClass);
        $(targetContainer).addClass(targetClass);
        $(targetContainer).attr('data-current-theme', targetClass);

        $.cookie('page-theme', targetClass);
    });

};


/* 16. Handle Theme - Page Load Theme Select
------------------------------------------------ */

var handlePageLoadThemeSelect = function () {
    "use strict";

    if ($.cookie && $.cookie('page-theme')) {
        if ($('body').length !== 0) {
            var targetClass = $.cookie('page-theme');
            var targetContainer = 'body';
            var targetRemoveClass = $(targetContainer).attr('data-current-theme');
            var targetLi = '[data-click="page-theme-selector"][data-value="' + targetClass + '"]';

            if (!targetRemoveClass) {
                targetRemoveClass = 'navbar-default';
            }
            $('[data-click="page-theme-selector"]').not(targetLi).closest('li').removeClass('active');
            $(targetLi).closest('li').addClass('active');
            $(targetContainer).removeClass(targetRemoveClass);
            $(targetContainer).addClass(targetClass);
            $(targetContainer).attr('data-current-theme', targetClass);
        }
    }

};

/* Application Controller
------------------------------------------------ */

var Login = function () {
    "use strict";

    return {
        initPageLoad: function () {
            handlePageLoad();
        },
        init: function () {
            this.initPageLoad();
            handlePageLoadThemeSelect();
            handleThemePanel();
        },
        initThemePanel: function () {
            handleThemePanel();
            handlePageLoadThemeSelect();
        }
    };
}();
