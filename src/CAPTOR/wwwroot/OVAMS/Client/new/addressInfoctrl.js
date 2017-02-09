(function () {
    'use strict';

    angular
        .module('captor')
        .controller('addressInfoctrl', addressInfoctrl);

    addressInfoctrl.$inject = ['$location']; 

    function addressInfoctrl($location) {
     
        var vm = this;
        vm.title = 'addressInfoctrl';

        activate();

        function activate() { }
    }
})();
