angular.module('mean.projects').controller('ProjectsController', ['$scope', '$routeParams', '$location', 'Global', 'Projects','Fields', function ($scope, $routeParams, $location, Global, Projects, Fields) {
    $scope.global = Global;

    $scope.create = function() {
        var project = new Projects({
            title: this.title
        });

        project.$save(function(response) {
            $location.path("projects");
        });

        $scope.projects.push({
            title: this.title });

        this.title = "";

        };

    $scope.remove = function(project) {
        project.$remove();

        for (var i in $scope.projects) {
            if ($scope.projects[i] == project) {
                $scope.projects.splice(i, 1);
            }
        }
    };

    $scope.addField = function() {
        var project = $scope.project;
        if (!project.updated) {
            project.updated = [];
        }

        console.log($scope.project.newField);

        // Does the field Exist ?
        
        var fields = $scope.fields;
        console.log(fields);

        var result = fields.filter(function (row) {
            if(row.title === 'Description') {
                return true
            } else {
                return false;
            }
        });

        console.log(result);

//        if (fields.filter('title' : 'Title'))
//        {
//            console.log('found Field');
//        }

        field.$save(function(response) {
            $location.path('projects/' + project._id);
        });

        console.log(project);
        project.fields.push(field);

        console.log('Field Added');

    };

    $scope.update = function() {
        console.log('In Update');
        var project = $scope.project;
        if (!project.updated) {
            project.updated = [];
        }
        project.updated.push(new Date().getTime());
        console.log("Field is ");
        console.log(project.title);


        project.$update(function() {
            $location.path('projects/' + project._id);
        });
    };

    $scope.find = function(query) {
        Projects.query(query, function(projects) {
            $scope.projects = projects;
        });
    };

    $scope.findOne = function() {
        console.log('In Projects find one');
        $scope.findFields();
        Projects.get({
            projectId: $routeParams.projectId
        }, function(project) {
            $scope.project = project;
            console.log(project);
        });
    };

    $scope.findFields = function(query) {
        Fields.query(query, function(fields) {
            $scope.fields = fields;
        });
    };
}]);