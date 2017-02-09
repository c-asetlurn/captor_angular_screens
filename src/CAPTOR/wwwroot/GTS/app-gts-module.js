(function () {
    'use strict';
    var angApp = angular
        .module('GTS', ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])

        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('AssignmentDetails', {
                    url: '/AssignmentDetails#',
                    templateUrl: 'AssignmentDetails'
                })
                .state('InitialReview', {
                    url: '/InitialReview#',
                    templateUrl:'InitialReview'
                })

            .state('InitialResponse', {
                url: '/InitialResponse#',
                templateUrl: 'InitialResponse'
            })

            .state('InitialNotes', {
                url: '/InitialNotes#',
                templateUrl: 'InitialNotes'
            })
                       
        });


    angApp.run();

 

})();