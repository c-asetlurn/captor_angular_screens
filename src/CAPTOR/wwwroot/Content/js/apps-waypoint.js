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