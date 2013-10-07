//Articles service used for articles REST endpoint
angular.module('mean.articles').factory("Articles", ['$resource', function($resource) {
    console.log("in Articles factory");
    return $resource('articles/:articleId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);