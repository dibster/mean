//Projects service used for projects REST endpoint
angular.module('mean.projects').factory("Projects", ['$resource', function($resource) {
    console.log("in Projects factory");
    return $resource('projects/:projectId', {
        projectId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);