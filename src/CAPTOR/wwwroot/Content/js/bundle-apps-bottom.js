/*   
Documentation: http://www.seantheme.com/source-admin-v1.2/admin/
*/


/* 01. Handle Sidebar - Opens Sub Menu Items
------------------------------------------------ */
var handleSidebarMenu = function () {
    "use strict";
    //left sidebar
    $('.sidebar .nav > .has-sub > a').click(function () {
        var target = $(this).next('.sub-menu');
        var otherMenu = '.sidebar .nav > li.has-sub > .sub-menu';

        if ($('.page-sidebar-minified').length === 0) {
            $(otherMenu).not(target).slideUp(250, function () {
                $(this).closest('li').removeClass('expand');
            });
            $(target).slideToggle(250, function () {
                var targetLi = $(this).closest('li');
                if ($(targetLi).hasClass('expand')) {
                    $(targetLi).removeClass('expand');
                } else {
                    $(targetLi).addClass('expand');
                }
            });
        }
    });
    $('.sidebar .nav > .has-sub .sub-menu li.has-sub > a').click(function () {
        if ($('.page-sidebar-minified').length === 0) {
            var target = $(this).next('.sub-menu');
            $(target).slideToggle(250);
        }
    });

    //right sidebar
    var target = '.sidebar-right .nav > li.has-sub > .sub-menu';
    $(target).addClass('hidden');

    $('.sidebar-right .nav > .has-sub > a').click(function () {
        var otherMenu = $(this).next('.sub-menu');

        if ($('.page-right-sidebar-toggled')) {
             $(otherMenu).slideUp(250, function () {
                $(this).toggleClass('block hidden');
            });
            
        }
    });
};


/* 02. Handle Right Sidebar - Mobile View Toggle
------------------------------------------------ */
var handleMobileSidebarToggle = function () {
    "use strict";
    var sidebarProgress = false;
    if ($(window).width() <= 1024) {
        $('.sidebar-minify-btn').css("display", "none");
    }
    $('.sidebar-right').bind('click touchstart', function (e) {
        if ($(e.target).closest('.sidebar-right').length !== 0) {
            sidebarProgress = true;
        } else {
            sidebarProgress = false;
            e.stopPropagation();
        }
    });

    $(document).bind('click touchstart', function (e) {
        if ($(e.target).closest('.sidebar-right').length === 0) {
            sidebarProgress = false;
        }
        if (!e.isPropagationStopped() && sidebarProgress !== true) {
            if ($('#page-container').hasClass('page-sidebar-toggled')) {
                sidebarProgress = true;
                $('#page-container').removeClass('page-sidebar-toggled');
            }
            if ($(window).width() <= 1024) { //767
                if ($('#page-container').hasClass('page-right-sidebar-toggled')) {
                    sidebarProgress = true;
                    $('#page-container').removeClass('page-right-sidebar-toggled');
                    

                }
            }
        }
    });

    $('[data-click=right-sidebar-toggled]').click(function (e) {
        e.stopPropagation();
        var targetContainer = '#page-container';
        var targetClass = 'page-right-sidebar-toggled';

        if ($(targetContainer).hasClass(targetClass)) {
            $(targetContainer).removeClass(targetClass);
        } else if (sidebarProgress !== true) {
            $(targetContainer).addClass(targetClass);
        } else {
            sidebarProgress = false;
        }
    });

    $('[data-click=sidebar-toggled]').click(function (e) {
        e.stopPropagation();
        var sidebarClass = 'page-sidebar-toggled';
        var targetContainer = '#page-container';

        if ($(targetContainer).hasClass(sidebarClass)) {
            $(targetContainer).removeClass(sidebarClass);
        } else if (sidebarProgress !== true) {
            $(targetContainer).addClass(sidebarClass);
        } else {
            sidebarProgress = false;
        }
        if ($(window).width() < 1024) { //1200
            $('#page-container').removeClass('page-right-sidebar-toggled');
        }
    });
};


/* 03. Handle Left Sidebar - Minify / Expand
//------------------------------------------------ */
var handleSidebarMinify = function () {
    "use strict";
    $('[data-click=sidebar-minify]').click(function (e) {
        e.preventDefault();
        var sidebarClass = 'page-sidebar-minified';
        var targetContainer = '#page-container';
        $('#sidebar [data-scrollbar="true"]').css('margin-top', '0');
        $('#sidebar [data-scrollbar="true"]').removeAttr('data-init');
        $('#sidebar [data-scrollbar=true]').stop();
        if ($(targetContainer).hasClass(sidebarClass)) {
            $(targetContainer).removeClass(sidebarClass);
            if ($(targetContainer).hasClass('page-sidebar-fixed')) {
               // if ($('#sidebar .slimScrollDiv').length !== 0) {
                 //   $('#sidebar [data-scrollbar="true"]').slimScroll({ destroy: true });
                   // $('#sidebar [data-scrollbar="true"]').removeAttr('style');
               // }
                //generateSlimScroll($('#sidebar [data-scrollbar="true"]'));
                $('#sidebar [data-scrollbar=true]').trigger('mouseover');
            } else if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                //if ($('#sidebar .slimScrollDiv').length !== 0) {
                  //  $('#sidebar [data-scrollbar="true"]').slimScroll({ destroy: true });
                    //$('#sidebar [data-scrollbar="true"]').removeAttr('style');
                //}
                //generateSlimScroll($('#sidebar [data-scrollbar="true"]'));
            }
        } else {
            $(targetContainer).addClass(sidebarClass);

            if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                if ($(targetContainer).hasClass('page-sidebar-fixed')) {
                    //$('#sidebar [data-scrollbar="true"]').slimScroll({ destroy: true });
                    $('#sidebar [data-scrollbar="true"]').removeAttr('style');
                }
                $('#sidebar [data-scrollbar=true]').trigger('mouseover');
            } else {
                $('#sidebar [data-scrollbar="true"]').css('overflow', 'visible');
            }
        }
        $(window).trigger('resize');
    });
};


/* 04. Handle Sidebar - Mobile Scrolling Feature
------------------------------------------------ */
var handleMobileSidebar = function () {
    "use strict";
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if ($('#page-container').hasClass('page-sidebar-minified')) {
            $('#sidebar [data-scrollbar="true"]').css('overflow', 'visible');
            //$('.page-sidebar-minified #sidebar [data-scrollbar="true"]').slimScroll({ destroy: true });
            $('.page-sidebar-minified #sidebar [data-scrollbar="true"]').removeAttr('style');
            $('.page-sidebar-minified #sidebar [data-scrollbar=true]').trigger('mouseover');
        }
    }

    var oriTouch = 0;
    $('.page-sidebar-minified .sidebar [data-scrollbar=true] a, .page-sidebar-minified .sidebar-right [data-scrollbar=true] a').bind('touchstart', function (e) {
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        var touchVertical = touch.pageY;
        oriTouch = touchVertical - parseInt($(this).closest('[data-scrollbar=true]').css('margin-top'));
    });

    $('.page-sidebar-minified .sidebar [data-scrollbar=true] a, .page-sidebar-minified .sidebar-right [data-scrollbar=true] a').bind('touchmove', function (e) {
        e.preventDefault();
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            var touchVertical = touch.pageY;
            var elementTop = touchVertical - oriTouch;

            $(this).closest('[data-scrollbar=true]').css('margin-top', elementTop + 'px');
        }
    });

    $('.page-sidebar-minified .sidebar [data-scrollbar=true] a, .page-sidebar-minified .sidebar-right [data-scrollbar=true] a').bind('touchend', function (e) {
        var targetScrollBar = $(this).closest('[data-scrollbar=true]');
        var windowHeight = $(window).height();
        var sidebarTopPosition = parseInt($('#sidebar').css('top'));
        var sidebarContainerHeight = $('#sidebar').height();
        oriTouch = $(targetScrollBar).css('margin-top');

        var sidebarHeight = sidebarTopPosition;
        $('.sidebar').not('.sidebar-right').find('.nav').each(function () {
            sidebarHeight += $(this).height();
        });
        var finalHeight = -parseInt(oriTouch) + $('.sidebar').height();
        if (finalHeight >= sidebarHeight && windowHeight <= sidebarHeight && sidebarContainerHeight <= sidebarHeight) {
            var finalMargin = windowHeight - sidebarHeight - 20;
            $(targetScrollBar).animate({ marginTop: finalMargin + 'px' });
        } else if (parseInt(oriTouch) >= 0 || sidebarContainerHeight >= sidebarHeight) {
            $(targetScrollBar).animate({ marginTop: '0px' });
        } else {
            finalMargin = oriTouch;
            $(targetScrollBar).animate({ marginTop: finalMargin + 'px' });
        }
        return true;
    });
};


/* 05. Handle Sidebar - Clear Sidebar Selection
------------------------------------------------ */
var handleClearSidebarSelection = function () {
    $('.sidebar .nav > li, .sidebar .nav .sub-menu').removeClass('expand').removeAttr('style');
    $('.sidebar .nav > li, .sidebar-right .nav .sub-menu').addClass('expand').removeAttr('style');
};

var handleClearSidebarMobileSelection = function () {
    $('#page-container').removeClass('page-sidebar-toggled');
};


/* 06. Handle Top Menu - Unlimited Top Menu Render
------------------------------------------------ */
var handleUnlimitedTopMenuRender = function () {
    "use strict";
    // function handle menu button action - next / prev
    function handleMenuButtonAction(element, direction) {
        var obj = $(element).closest('.nav');
        var marginLeft = parseInt($(obj).css('margin-left'));
        var containerWidth = $('.top-menu').width() - 88;
        var totalWidth = 0;
        var finalScrollWidth = 0;

        $(obj).find('li').each(function () {
            if (!$(this).hasClass('menu-control')) {
                totalWidth += $(this).width();
            }
        });

        switch (direction) {
            case 'next':
                var widthLeft = totalWidth + marginLeft - containerWidth;
                if (widthLeft <= containerWidth) {
                    finalScrollWidth = widthLeft - marginLeft + 128;
                    setTimeout(function () {
                        $(obj).find('.menu-control.menu-control-right').removeClass('show');
                    }, 150);
                } else {
                    finalScrollWidth = containerWidth - marginLeft - 128;
                }

                if (finalScrollWidth != 0) {
                    $(obj).animate({ marginLeft: '-' + finalScrollWidth + 'px' }, 150, function () {
                        $(obj).find('.menu-control.menu-control-left').addClass('show');
                    });
                }
                break;
            case 'prev':
                var widthLeft = -marginLeft;

                if (widthLeft <= containerWidth) {
                    $(obj).find('.menu-control.menu-control-left').removeClass('show');
                    finalScrollWidth = 0;
                } else {
                    finalScrollWidth = widthLeft - containerWidth + 88;
                }
                $(obj).animate({ marginLeft: '-' + finalScrollWidth + 'px' }, 150, function () {
                    $(obj).find('.menu-control.menu-control-right').addClass('show');
                });
                break;
        }
    }

    // handle page load active menu focus
    function handlePageLoadMenuFocus() {
        var targetMenu = $('.top-menu .nav');
        var targetList = $('.top-menu .nav > li');
        var targetActiveList = $('.top-menu .nav > li.active');
        var targetContainer = $('.top-menu');

        var marginLeft = parseInt($(targetMenu).css('margin-left'));
        var viewWidth = $(targetContainer).width() - 128;
        var prevWidth = $('.top-menu .nav > li.active').width();
        var speed = 0;
        var fullWidth = 0;

        $(targetActiveList).prevAll().each(function () {
            prevWidth += $(this).width();
        });

        $(targetList).each(function () {
            if (!$(this).hasClass('menu-control')) {
                fullWidth += $(this).width();
            }
        });

        if (prevWidth >= viewWidth) {
            var finalScrollWidth = prevWidth - viewWidth + 128;
            $(targetMenu).animate({ marginLeft: '-' + finalScrollWidth + 'px' }, speed);
        }

        if (prevWidth != fullWidth && fullWidth >= viewWidth) {
            $(targetMenu).find('.menu-control.menu-control-right').addClass('show');
        } else {
            $(targetMenu).find('.menu-control.menu-control-right').removeClass('show');
        }

        if (prevWidth >= viewWidth && fullWidth >= viewWidth) {
            $(targetMenu).find('.menu-control.menu-control-left').addClass('show');
        } else {
            $(targetMenu).find('.menu-control.menu-control-left').removeClass('show');
        }
    }

    // handle menu next button click action
    $('[data-click="next-menu"]').click(function (e) {
        e.preventDefault();
        handleMenuButtonAction(this, 'next');
    });

    // handle menu prev button click action
    $('[data-click="prev-menu"]').click(function (e) {
        e.preventDefault();
        handleMenuButtonAction(this, 'prev');

    });

    // handle unlimited menu responsive setting
    $(window).resize(function () {
        $('.top-menu .nav').removeAttr('style');
        handlePageLoadMenuFocus();
    });

    handlePageLoadMenuFocus();
};


/* 07. Handle Top Menu - Sub Menu Toggle
------------------------------------------------ */
var handleTopMenuSubMenu = function () {
    "use strict";
    $('.top-menu .sub-menu .has-sub > a').click(function () {
        var target = $(this).closest('li').find('.sub-menu').first();
        var otherMenu = $(this).closest('ul').find('.sub-menu').not(target);
        $(otherMenu).not(target).slideUp(250, function () {
            $(this).closest('li').removeClass('expand');
        });
        $(target).slideToggle(250, function () {
            var targetLi = $(this).closest('li');
            if ($(targetLi).hasClass('expand')) {
                $(targetLi).removeClass('expand');
            } else {
                $(targetLi).addClass('expand');
            }
        });
    });
};


/* 08. Handle Top Menu - Mobile Sub Menu Toggle
------------------------------------------------ */
var handleMobileTopMenuSubMenu = function () {
    "use strict";
    $('.top-menu .nav > li.has-sub > a').click(function () {
        if ($(window).width() <= 1000) {
            var target = $(this).closest('li').find('.sub-menu').first();
            var otherMenu = $(this).closest('ul').find('.sub-menu').not(target);
            $(otherMenu).not(target).slideUp(250, function () {
                $(this).closest('li').removeClass('expand');
            });
            $(target).slideToggle(250, function () {
                var targetLi = $(this).closest('li');
                if ($(targetLi).hasClass('expand')) {
                    $(targetLi).removeClass('expand');
                } else {
                    $(targetLi).addClass('expand');
                }
            });
        }
    });
};


/* 09. Handle Top Menu - Mobile Top Menu Toggle
------------------------------------------------ */
var handleTopMenuMobileToggle = function () {
    "use strict";
    $('[data-click="top-menu-toggled"]').click(function () {
        $('.top-menu').slideToggle(250);
    });
};


/* 11. Handle Plugins - Bootstrap Tooltip & Popover
------------------------------------------------ */
var handleTooltipInit = function () {
    "use strict";
    if ($('[data-toggle="tooltip"]').length !== 0) {
        $('[data-toggle="tooltip"]').tooltip();
    }
};

var handlePopoverInit = function () {
    if ($('[data-toggle="popover"]').length !== 0) {
        $('[data-toggle="popover"]').popover();
    }
};



/* 12. Handle Page Load - Show Content
------------------------------------------------ */
var handlePageLoad = function () {
    "use strict";

    $('#page-container').addClass('in');

    $("html").backstretch(RootURI + "/Content/img/main-banner.png");
    //$("html").backstretch("../../Content/img/main-banner.png");
    //$("html").backstretch("../../../Content/img/main-banner.png");

    (function ($) {
        var $window = $(window),
            $container = $('#page-container');

        function resize() {
            if ($window.width() <= 1024) {
                return $container.removeClass('page-right-sidebar-toggled') && $container.addClass('page-sidebar-minified');

            }

        }

        $window
            .resize(resize)
            .trigger('resize');
    })(jQuery);

    $('.modal').appendTo("body");

    var options = {
        "backdrop": "static",
        "show": false,
        "keyboard": false
    };

    $('.modal').modal(options);
    
    
    $(document).keydown(function (e) {
        var element = e.target.nodeName.toLowerCase();
        if ((element != 'input' && element != 'textarea') || $(e.target).attr("readonly") || (e.target.getAttribute("type") === "checkbox")) {
            if (e.keyCode === 8) {
                return false;
            }
        }
    });

    $('.spinner').hide();

    //for testing purposes only
    $('#activateLoading').click(function () {
        $('.spinner').show().delay(3000).fadeOut();
    });

};


/* 13. Handle Scroll To Top
------------------------------------------------ */
var handleScrollToTopButton = function () {
    "use strict";
    $('[data-click=scroll-top]').click(function (e) {
        $('#page-container .content').animate({ scrollTop: 0 }, 'slow');
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


/* 18. Handle Header - Dropdown Set Message Status
------------------------------------------------ */

$('[data-click="set-message-status"]').on('click', function (e) {
    e.stopPropagation();
    e.preventDefault();

    var status = $(this).attr('data-status');
    var tooltipText = status === 'read' ? 'Mark as Unread' : 'Mark as Read';
    var newStatus = status === 'read' ? 'unread' : 'read';
    $(this).toggleClass('read', status !== 'read').attr('data-status', newStatus);
    $(this).prevAll('.media').first().toggleClass('bg-success', status !== 'read').attr('data-status', newStatus);

    $(this).tooltip('hide').attr('data-original-title', tooltipText).tooltip('fixTitle');
});

$('[data-click="set-message-status"]').each(function () {
    $(this).tooltip();
});


/* 19. Handle Header - Notification Read Status
------------------------------------------------ */
var handleNotificationClicked = function () {
    "use strict";

    $('[data-click="toggle-notify"]').on('click', function () {
        $(this).addClass('read');
    });

};


/* 23. Handle Tile Flip
------------------------------------------------ */
var handleTileFlip = function () {
    "use strict";

    $(".card").flip({
        axis: 'y',
        trigger: 'auto'
    });

    $(".flip-link").click(function () {
        $(this).parents(".card").flip(true);
        $(".card-back").show();
    });

    $(".contentContainer").click(function () {
        $(".card").flip(false);
    });

};



/* 23. Handle Scrollbars
------------------------------------------------ */
var handleScrollbars = function () {
    "use strict";

    //$(function changeSize() {
    //    $('#page-container').slimscroll({
    //        color: '#eee',
    //        height: '100%',
    //        isOverPanel: true
    //    });

    //    $('.prettyscroll').slimscroll({
    //        color: '#eee',
    //        height: 'auto'
    //    });
    //});

    //$('.slimScrollDiv').load(function () {
    //    console.log("slimScrollDiv is loaded");
    //    $("#page-container").mouseover();
    //});


   

    window.onload = function () {
        //$('.slimScrollDiv').css({ "display": "inherit", "width": "100% !important" });

        //$('body').mouseenter(function (){
        //    console.log("Here I am");
        //});

        //$('body').mousemove(function () {
        //    $('#page-container').slimscroll({
        //        color: '#eee',
        //        height: '100%',
        //        isOverPanel: true
        //    });

        //    $('.prettyscroll').slimscroll({
        //        color: '#eee',
        //        height: 'auto'
        //    });

        //    $('.slimScrollDiv').css({ "display": "inherit", "width": "100% !important" });
        //})
    };
    
    

};

/**24. Dropdown Activation
 DROPDOWN CODE TO ACTIVATE ON DROPDOWN ICON*/

var dropdown_input_field_area = "";
$("body").on('click', '.dropdown-icon', function () {
    $(this).prev().trigger("focus");
    dropdown_input_field_area = $(this).prev();
}
);

$('body').on('mouseleave', '.ui-autocomplete', function () {
    $(dropdown_input_field_area).trigger("blur");
});

$('body').on('click', '.ui-autocomplete-input', function () {
    dropdown_input_field_area = $(this);
});
/**These are Version-1 Code**/

//var dropdown_data_id = "";
//$("body").on("click",".dropdown-icon",function () {
//        dropdown_input_field_area = $(this).prev();  
//        $(this).prev().trigger("focus");
//        $(this).prev().css("display", "block");
//        dropdown_data_id = $(this).prev().attr("data-id");
//        dropdown_data_id = "ui-id-" + dropdown_data_id;
//        document.getElementById(dropdown_data_id).style.display = 'block';
//});

//$('body').on('mouseleave', '.ui-autocomplete-input', function () {
//    dropdown_input_field_area = $(this);
//});

//$('body').on('mouseleave', '.ui-autocomplete-input', function () {
//    if (dropdown_input_field_area != "") {
//        $(dropdown_input_field_area).trigger("blur");
//     }
//});

//$('body').on('mouseenter', '.ui-autocomplete', function () {
//    if (dropdown_data_id != "") {
//        document.getElementById(dropdown_data_id).style.display = 'block';
//        dropdown_data_id = "";
//    }
//});


/**25 Taking Multiselect Dropdown Field Focus to the End Specially Made For IE**/
function multiselectenabledie() {
    
    var ie_cursor_front = $(".multiselect-form-control");
    ie_cursor_front[0].onfocus = ie_cursor_front[0].onblur = null;
    $(ie_cursor_front).on("focus blur", function (e) {
        this.value = $.trim(this.value);
        if ((e.type === "focus") && this.createTextRange) {
            var ie_cursor_movefirst = this.createTextRange();
            ie_cursor_movefirst.moveStart("character", this.value.length);
            ie_cursor_movefirst.select();
        }
    });
}

/**25 Trigger Calendar From Calendar Icon**/

$("body").on('click', '.calendar-datepicker-icon', function () {
    $(this).prev().trigger("focus");
    }
);

/**Waypoint Access**/


/* Application Controller
------------------------------------------------ */
var App = function () {
    "use strict";

    return {
        initSidebar: function () {
            handleSidebarMenu();
            handleMobileSidebarToggle();
            handleSidebarMinify();
            handleMobileSidebar();
        },
        initSidebarSelection: function () {
            handleClearSidebarSelection();
        },
        initSidebarMobileSelection: function () {
            handleClearSidebarMobileSelection();
        },
        initTopMenu: function () {
            handleUnlimitedTopMenuRender();
            handleTopMenuSubMenu();
            handleMobileTopMenuSubMenu();
            handleTopMenuMobileToggle();
        },
        initComponent: function () {
            handleTooltipInit();
            handlePopoverInit();
        },
        initPageLoad: function () {
            handlePageLoad();
        },
        init: function () {
            this.initTopMenu();
            this.initSidebar();
            this.initComponent();
            this.initPageLoad();
            handlePageLoadThemeSelect();
            handleThemePanel();
            handleTileFlip();
        },
        scrollTop: function () {
            $('html, body').animate({
                scrollTop: $('body').offset().top
            }, 0);
        },
        initThemePanel: function () {
            handleThemePanel();
            handlePageLoadThemeSelect();
        },
        initRightSidebar: function () {
            handleScheduleCalendar();
        }
    };
}();

/**Global Function For TinyMCE Character Count**/
function handleTinyMCE(tinymce_id, tinymce_selector, tinymce_character_count, maximum_limit) {
    var max_chars = maximum_limit; //max characters
    var max_for_html = 300; //max characters for html tags
    var allowed_keys = [16, 17, 18, 20, 33, 34, 35, 36, 37, 38, 39, 40, 46];
    var chars_without_html, chars_with_html = 0;
    var tinymce_variable = tinymce_id;
    var bypass_character_count = 0;

    $(function () {

        tinymce.init({
            selector: tinymce_selector,
            forced_root_block : "",
            theme: "modern",
            skin: 'captor',
            plugins: 'wordcount link powerpaste autoresize autolink',
            oninit: "setPlainText",
            paste_as_text: true,
            spellchecker_rpc_url: 'http://crtec0089169.cr.lcl:8080/ephox-spelling',
            spellchecker_language: 'en',
            autoresize_min_height: 150,
            autoresize_max_height: 150,
            powerpaste_word_import: 'clean',
            powerpaste_html_import: 'merge',
            wordcount_cleanregex: /[0-9.(),;:!?%#$?\x27\x22_+=\\/\-]*/g,
            browser_spellcheck: true,
            menubar: false,
            content_css: [
              'https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic',
              RootURI + '/Content/css/main.min.css'
            ],

            setup: function (ed) {
                ed.on('KeyUp KeyDown LoadContent KeyPress change NodeChange', function (ed, e) {
                    var count = CountCharacters(tinymce_variable);
                    var key = ed.keyCode;
                    if ((key == 8) || (key == 46)) {
                        bypass_character_count = 0;
                    } else if ((key != 8) && (key != 46) && ((count == max_chars))) {
                        ed.stopPropagation();
                        ed.preventDefault();
                        $(tinymce_character_count).html(0 + " of " + max_chars + " characters remaining");
                        bypass_character_count = 1;
                    } else if (count > max_chars) {
                        ed.stopPropagation();
                        ed.preventDefault();
                        var body = tinymce.get(tinymce_variable).getBody();
                        var content = tinymce.trim(body.innerText || body.textContent);
                        content = content.slice(0, max_chars);
                        var content_length = content.length;
                        tinyMCE.get(tinymce_variable).setContent(content);
                        $(tinymce_character_count).html(0 + " of " + max_chars + " characters remaining");
                        $(tinymce_character_count).css('color', '#AB2B3B'); //danger color
                    }
                    if ((max_chars - count) >= 0) {
                        $(tinymce_character_count).html(max_chars - count + " of " + max_chars + " characters remaining");
                    }
                        if ((count > (max_chars - 5))) {
                            $(tinymce_character_count).css('color', '#AB2B3B'); //danger color
                        }
                        else if ((count > (max_chars - 6))) {
                            $(tinymce_character_count).css('color', '#AB2B3B'); //danger color
                        }
                        else if ((count > (max_chars - 25))) {
                            $(tinymce_character_count).css('color', '#F8971D'); //warning color
                        }
                        else if ((count > (max_chars - 26))) {
                            $(tinymce_character_count).css('color', '#F8971D'); //warning color
                        } else {
                            $(tinymce_character_count).css('color', '#bbbbbb'); //normal color
                        }
                    if (bypass_character_count == 1) {
                        $(tinymce_character_count).html(0 + " of " + max_chars + " characters remaining");
                        ed.stopPropagation();
                        ed.preventDefault();
                    }

                });
            },
            toolbar: "bold italic underline link",
            default_link_target: "_blank",
            link_assume_external_targets: true,
            style_formats: [
                { title: 'Bold text', inline: 'b' },
                { title: 'Example 1', inline: 'span', classes: 'example1' },
                { title: 'Example 2', inline: 'span', classes: 'example2' },
                { title: 'Table styles' },
                { title: 'Table row 1', selector: 'tr', classes: 'tablerow1' }
            ],
            link_class_list: [{ title: 'Hyperlink', value: 'tinymce-hyperlink' }]
        });

    });
    function CountCharacters(tinymce_variable) {
        if (tinymce.get(tinymce_variable) != null) {
            var body = tinymce.get(tinymce_variable).getBody();
            var content = tinymce.trim(body.innerText || body.textContent);
            return content.length;
        }
        else {
            return 0;
        }
    };
}

function handleTinyMCEDisabled() {
    $(function () {
        tinymce.init({
            selector: ".tinymcedisabled",
            plugins: "autoresize",
            autoresize_min_height: 150,
            autoresize_max_height: 150,
            theme: "modern",
            skin: 'captor',
            menubar: false,
            readonly: true,
            toolbar: 'false',
            browser_spellcheck: true
        });
    });
}

//This Function Developed For Case Notes to Avoid On Load Issue. Don't Delete it Please
function countTinyMCEonLoad(tinymce_id, tinymce_character_count, maximum_limit) {
    var body = tinymce.get(tinymce_id).getBody();
    var content = tinymce.trim(body.innerText || body.textContent);
    var content_length = content.length;
    $(tinymce_character_count).html(maximum_limit - content_length + " of " + maximum_limit + " characters remaining");
    if ((content > (maximum_limit - 5))) {
        $(tinymce_character_count).css('color', '#AB2B3B'); //danger color
    }
    else if ((content > (maximum_limit - 6))) {
        $(tinymce_character_count).css('color', '#AB2B3B'); //danger color
    }
    else if ((content > (maximum_limit - 25))) {
        $(tinymce_character_count).css('color', '#F8971D'); //warning color
    }
    else if ((content > (maximum_limit - 26))) {
        $(tinymce_character_count).css('color', '#F8971D'); //warning color
    } else {
        $(tinymce_character_count).css('color', '#bbbbbb'); //normal color
    }
}


var handleWaypointsHistory = function () {
    "use strict";

    function checkhistory() {
        checkhistory.counter = checkhistory.counter + 1;
    }
    function historypush() {

        if (window.history && window.history.pushState) {
            var ourlocation = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
            window.history.pushState(null, null, './' + ourlocation);
        }
    }

    $(window).on('popstate', function () {
        if (checkhistory.counter > 0) {
            $(".btn-go-back").click();
            checkhistory.counter = 0;
        }
        else {
            window.history.back();
        }
    });

    $(".btn-backpage").click(function () {
        $(window).on('popstate');
    });

    checkhistory.counter = 0;
    
    $(".btn-go-forward").click(function () {
        historypush();
        var checkhistory_counter = new checkhistory();
    });

    $('html,body').scrollTop(top);

};


var handleWaypoints = function () {
    "use strict";
    //WAYPOINTS
    $(function () {
        var body = $('#content'),
            nav = $('.btn-waypoint'),
            panels = $('#content');
        var div1;
        var div2;
        div1 = $(".page");
        $('body').on('click', '.btn-waypoint', function (e, index, css) {
            e.preventDefault();
            var dest = $(this).data('panel-link');
                dest = "." + dest;
                div2 = $(dest);
                div2.animate({ opacity: '0.5' }, "slow");
                div1.animate({ opacity: '0.5' }, "slow");
                setTimeout(function () {
                    $(div2).show();
                }, 800);
                setTimeout(function () {
                    div2.animate({ opacity: '1.0' }, "slow");
                }, 800);
                setTimeout(function () {
                    $(div1).hide();
                }, 1100);
                setTimeout(function () {
                    div1 = div2;
                }, 1101);
                if (body.hasClass('show-' + dest) === true) {
                    $('html,body').scrollTop(top);
                }
        });
    }());
};




/* Application Controller
------------------------------------------------ */
var Waypoints = function () {
    "use strict";

    return {
        //main function
        init: function () {
            //handleWaypointsHistory();
            handleWaypoints();
        }
    };
}();
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
        parse:'strict',
        showButtonPanel: false,
        showTime: true,
        oneLine: true,
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
                    startDateWithNoTime.datepicker('setDate', testEndDateWithNoTimee);
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