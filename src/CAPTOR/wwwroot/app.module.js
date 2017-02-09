(function () {
    'use strict';
    var angApp = angular
        .module('captor', ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])

        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('applicantDemographics', {
                    url: '/AddressInfo#',
                    template: '<h1 style="color:red">NICE text</h1>'
                })
                .state('applicantAddress', {
                    url: '/Demographics#',
                    templateUrl: 'Demographics'
                })

        });

    angApp.run();

})();
