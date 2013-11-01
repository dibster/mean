angular.module('mean.references').controller('ReferencesController', ['$scope', '$routeParams', '$location', 'Global', 'References', function ($scope, $routeParams, $location, Global, References) {
    $scope.global = Global;

    $scope.dataTypes =
    [
        'Line',
        'Para',
        'Date',
        'Date and Time',
        'Number',
        'Money',
        'Single Person',
        'Team'
    ];

}]);

