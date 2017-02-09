(function () {
    'use strict';

    angular
        .module('captor')
        .controller('ovaSerach', controller);

    controller.$inject = ['$location'];

    function controller($location) {

        var vm = this;
        //    vm.tabcontent = "Person";
        //    vm.showfilterbtn = false;
        //    vm.filterCount = 0;
        //    // vm.search_type = true;

        //    vm.individualSearch_tabs = [
        //         {
        //             title: "Person",
        //             enable: true

        //         },
        //           {
        //               title: "Demographics",
        //               enable: false
        //           },

        //             {
        //                 title: "Offender Identifier",
        //                 enable: false
        //             }
        //    ]
        //    vm.individualperson_fileds = [
        //            {
        //                title: "Client Registration#",
        //                hideVar: false
        //            },
        //            {
        //                title: "ACP#",
        //                hideVar: false
        //            }

        //    ];
        //    vm.individualdemographics_fileds = [
        //            {
        //                title: "Last Name",
        //                hideVar: false
        //            },
        //            {
        //                title: "First Name",
        //                hideVar: false
        //            },
        //            {
        //                title: "Middle Name",
        //                hideVar: false
        //            },
        //            {
        //                title: "Suffix",
        //                hideVar: false
        //            }, {
        //                title: "Date of Birth",
        //                hideVar: false
        //            },
        //            {
        //                title: "Driver's License State",
        //                hideVar: false
        //            },
        //            {
        //                title: "Driver's License#",
        //                hideVar: false
        //            },
        //            {
        //                title: "Email Address#",
        //                hideVar: false
        //            },
        //            {
        //                title: "Phone#",
        //                hideVar: false
        //            }

        //    ];

        //    vm.individualoffender_fileds = [
        //           {
        //               title: "SID#",
        //               hideVar: false
        //           },
        //           {
        //               title: "DOC#",
        //               hideVar: false
        //           },
        //           {
        //               title: "Parole Board",
        //               hideVar: false
        //           },


        //    ];
        //    vm.orgnizationSearch_fileds = [
        //    {
        //        title: "Client Registration#",
        //        hideVar: false
        //    },
        //    {
        //        title: "Demographics",
        //        hideVar: false
        //    }
        //    ];

        //    vm.search_type = [
        //    {
        //        show: true
        //    }
        //    ];
        //    vm.searchType = function (data) {
        //        vm.tabcontent = data.title;
        //      //  vm.search_type.show = !vm.search_type.show;

        //    }
        //    vm.hideFields = function (data) {
        //        data.hideVar = false;
        //        vm.filterCount--;
        //        if (vm.filterCount <= 0) {
        //            vm.showfilterbtn = false;
        //        }
        //    }
        //    vm.showFilterGroup = function (data) {
        //        if (data) {
        //            vm.filterCount++;
        //        }
        //        else {
        //            vm.filterCount--;
        //        }
        //        if (vm.filterCount > 0) {
        //            vm.showfilterbtn = true;
        //        }
        //        else {
        //            vm.showfilterbtn = false;
        //        }
        //        //data.hideVar = false;
        //    }
        //    vm.clearFields = function () {
        //        for (var i = 0; i < vm.individualdemographics_fileds.length; i++) {
        //            vm.individualdemographics_fileds[i].hideVar = false;
        //        }
        //        for (var j = 0; j < vm.individualperson_fileds.length; j++) {
        //            vm.individualperson_fileds[j].hideVar = false;
        //        }
        //        for (var k = 0; k < vm.individualoffender_fileds.length; k++) {
        //            vm.individualoffender_fileds[k].hideVar = false;
        //        }
        //        vm.showfilterbtn = false;
        //        vm.filterCount = 0;
        //    }

        //}


        //FROM HERE NEW TAB IMPLEMENTATION STARTS//



        vm.showSearchResults = false;
        
        vm.individualSearch_tabs = [
             {
                 title: "Individual",
                 enable: true
             },
               {
                   title: "Organization",
                   enable: false
               }
        ]
        vm.tabcontent = vm.individualSearch_tabs[0].title;
        vm.tabcontent_previous = '';
        vm.tilesArray=[1, 2, 3, 4, 5, 6, 7, 8]
        vm.searchType = function (data) {
            vm.tabcontent = data.title;
        }
        vm.searchResults = function () {
            vm.showSearchResults = true;
            vm.tabcontent_previous = vm.tabcontent;
            vm.tabcontent = '';
        }
        vm.toggleSearch = function () {
            vm.tabcontent = vm.tabcontent_previous;
            vm.showSearchResults = false;
        }
        vm.loadmore = function () {
            console.log("scroll called");
        }
        vm.myFunc = function () {
            if (vm.myValue > 0) {
                vm.disableFields = true;
            }
            else {
                vm.disableFields = false;
            }
           
        }

    }//end of controller function
})();