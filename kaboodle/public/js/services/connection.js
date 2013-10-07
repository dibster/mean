//Connections service used for connections REST endpoint
angular.module('mean.connections').factory("Connections", ['$resource', function($resource) {
    return $resource('connections/:connectionId', {
        connectionId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);