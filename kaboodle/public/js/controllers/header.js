angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Hierarchy",
        "link": "connections"
    }, {
        "title": "Projects",
        "link": "articles"
    }];
}]);