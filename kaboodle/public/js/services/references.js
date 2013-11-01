//References service used for references REST endpoint
angular.module('mean.references').factory("References", ['$resource', function($resource) {
    return $resource('references/:referenceId', {
        referenceId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);