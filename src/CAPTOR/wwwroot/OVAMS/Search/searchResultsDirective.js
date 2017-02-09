(function() {
    'use strict';

    angular
        .module('captor')
        .directive('searchResults', searchResultsDirective);

    searchResultsDirective.$inject = ['$window'];
    
    function searchResultsDirective ($window) {
        var directive = {
            link: link,
            restrict: 'EA',
            templateUrl: "../OVAMS/Search/ovamsSearchResults.html",
            scope: {
                tilesArray: "=",
                typeofSearch:"="
               
            },
            controller:controller
        };
        return directive;

        function link(scope, element, attrs) {
           
        }
        function controller($scope,$rootScope) {
            $scope.typeofSearch == 'Individual' ? $scope.result = true : $scope.result = false;
            $scope.loadmoretiles = function () {
                var last = $scope.tilesArray[$scope.tilesArray.length - 1];
                for (var i = 1; i <= 8; i++) {
                    $scope.tilesArray.push(last + i);
                }
            }
            $scope.flip = function () {
                
                $rootScope.$broadcast('FLIP_EVENT_IN');
            }
        }

       
    }

})();