(function () {
    'use strict';

    angular
        .module('GTS')
        .controller('gtsctrl', controller);

    controller.$inject = ['$location']; 

    function controller($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'anjali';

        activate();

        function activate() { }
    }
})();
