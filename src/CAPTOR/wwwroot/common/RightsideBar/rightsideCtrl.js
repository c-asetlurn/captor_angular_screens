(function () {
    'use strict';

    angular
        .module('captor')
        .controller('rightsideCtrl', controller);

    controller.$inject = ['$location'];

    function controller($location) {
        var vm = this;
        vm.slide_client = false;
        vm.slide_offender = false;
        vm.openNav_client = function () {
            vm.slide_client = !vm.slide_client;
        }
        vm.openNav_offender = function () {
            vm.slide_offender = !vm.slide_offender;
        }

        vm.type = {
            organization:false
        }
       }
})();
