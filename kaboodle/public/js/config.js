//Setting up route
window.app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/articles', {
                templateUrl: 'views/articles/list.html'
            }).
            when('/articles/create', {
                templateUrl: 'views/articles/create.html'
            }).
            when('/articles/:articleId/edit', {
                templateUrl: 'views/articles/edit.html'
            }).
            when('/articles/:articleId', {
                templateUrl: 'views/articles/view.html'
            }).
            when('/connections', {
                templateUrl: 'views/connections/list.html'
            }).
            when('/connections/create', {
                templateUrl: 'views/connections/create.html'
            }).
            when('/connections/:connectionId/edit', {
                templateUrl: 'views/connections/edit.html'
            }).
            when('/connections/:connectionId', {
                templateUrl: 'views/connections/view.html'
            }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);