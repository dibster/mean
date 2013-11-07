angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Projects",
        "link": "projects"
    }, {
        "title": "Fields",
        "link": "fields"
    }, {
        "title": "Lists",
        "link": "lists"
    },
        {
        "title": "Hierarchy",
        "link": "hierarchy"
    },
        {
        "title": "Views",
        "link": "views"
    }];
}]);