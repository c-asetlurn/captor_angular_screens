(function () {
    'use strict';

    angular
        .module('app')
        .controller('client', client);

    client.$inject = ['$location']; 

    function client($location) {
      
        var vm = this;
        vm.title = 'client';

        activate();

        function activate() { }
    }
})();
