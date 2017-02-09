(function () {
    'use strict';

    angular
        .module('captor')
        .controller('demoGraphicctrl', demoGraphicctrl);

    demoGraphicctrl.$inject = ['$location']; 

    function demoGraphicctrl($location) {
        
        var vm = this;
        vm.title = 'demoGraphicctrl';

        activate();

        function activate() { }
        //vm.offenderId = offenderservice.id;
    }
})();
