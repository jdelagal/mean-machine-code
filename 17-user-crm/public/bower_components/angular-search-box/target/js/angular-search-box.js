(function () {
    "use strict";

    var controller = ["$element", "$scope", "$timeout", function ($element, $scope, $timeout) {
        $scope.showSearchBox = function ($event) {
            if ($event) {
                $event.preventDefault();
            }

            $scope.searching = true;

            $timeout(function () {
                $element.find("input")[0].focus();
            });
        };

        $scope.hideSearchBox = function ($event) {
            if ($event) {
                $event.preventDefault();
            }

            $scope.searching = false;
        };

        $scope.handleBlur = function() {
            if (!$scope.model) {
                $scope.hideSearchBox();
            }
        };

        $scope.handleKeyDown = function ($event) {
            if ($event.keyCode === 27) {
                $scope.hideSearchBox();
            }
        };
    }];

    angular.module("angular-search-box", []).directive("searchBox", function () {
        return {
            controller: controller,
            scope: {
                label: "@",
                model: "=",
                searching: "="
            },
            template: ('../html/angular-search-box.html', '<div style="display: table-row">\n    <div style="display: table-cell; vertical-align: middle; width: 100%">\n        <span ng-hide="searching">{{label}}</span>\n        <input type="text" style="width: 100%" ng-show="searching" ng-model="model" ng-blur="handleBlur()" ng-keydown="handleKeyDown($event)"/>\n    </div>\n    <div style="display: table-cell; padding-left: 8px; vertical-align: middle">\n        <a href="#" class="glyphicon glyphicon-search" ng-hide="searching" ng-click="showSearchBox($event)"></a>\n        <a href="#" class="glyphicon glyphicon-remove" ng-show="searching" ng-click="hideSearchBox($event)"></a>\n    </div>\n</div>' + '')
        };
    });
})();