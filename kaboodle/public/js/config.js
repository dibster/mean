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
            when('/projects', {
                templateUrl: 'views/projects/list.html'
            }).
            when('/projects/create', {
                templateUrl: 'views/projects/create.html'
            }).
            when('/projects/:projectId/edit', {
                templateUrl: 'views/projects/edit.html'
            }).
            when('/projects/:projectId', {
                templateUrl: 'views/projects/view.html'
            }).
            when('/views', {
                templateUrl: 'views/listviews/list.html'
            }).
            when('/fields', {
                templateUrl: 'views/fields/list.html'
            }).
            when('/fields/create', {
                templateUrl: 'views/fields/create.html'
            }).
            when('/fields/:fieldId/edit', {
                templateUrl: 'views/fields/edit.html'
            }).
            when('/fields/:fieldId', {
                templateUrl: 'views/fields/view.html'
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