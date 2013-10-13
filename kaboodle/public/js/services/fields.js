//Fields service used for fields REST endpoint
angular.module('mean.fields').factory("Fields", ['$resource', function($resource) {
    return $resource('fields/:fieldId', {
        fieldId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);