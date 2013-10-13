angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Projects",
        "link": "projects"
    }, {
        "title": "Fields",
        "link": "fields"
    }, {
        "title": "Lookup Lists",
        "link": "lists"
    }];
}]);