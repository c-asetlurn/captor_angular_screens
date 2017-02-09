/// <reference path="assigngts/assignmentdetails.html" />
/// <reference path="assigngts/assignmentdetails.html" />
(function () {
    'use strict';

    angular
        .module('GTS')
        .controller('gtsGlobal', controller);

    controller.$inject = ['$location'];

    function controller($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'anjali';
        vm.tabs = [
        {
            "heading": "Tab 1",
            "active": true,
            "template": "../AssignGTS/InitialReview.html'"
        },
        {
            "heading": "Tab 2",
            "active": false,
            "template": "tab2.html"
        },
        {
            "heading": "Tab 3",
            "active": false,
            "template": "tab3.html"
        },
        {
            "heading": "Tab 4",
            "active": false,
            "template": "tab4.html"
        },
        {
            "heading": "Tab 5",
            "active": false,
            "template": "tab5.html"
        },
        ];
        activate();

        function activate() { }
    }
})();
