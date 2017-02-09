(function() {
    'use strict';

    angular
        .module('captor')
        .directive('fullProfileView', directive);

    directive.$inject = ['$window'];
    
    function directive ($window) {
        // Usage:
        //     <directive></directive>
        // Creates:
        // 
        var directive = {
            link: link,
            templateUrl: "../common/RightsideBar/clientProfileview.html",
            transclude: true,
            scope:{
            type:"="
            }
           };
        return directive;

        function link(scope, element, attrs) {
            console.log(scope.type);
        }
    }

})();