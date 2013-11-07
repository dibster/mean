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

    $scope.removeField = function(field) {

        console.log('Remove Field : ' + field.title);
        var project=$scope.project;

        project.fields.splice(project.fields.indexOf('field',1));

        $scope.updateRequired='true';



    };

    $scope.addField = function() {
        $scope.updateRequired='true';
        var project = $scope.project;
        if (!project.updated) {
            project.updated = [];
        }

        console.log($scope.project.newField);

        // Does the field Exist ?

        var fields = $scope.fields;

        var result = fields.filter(function (row) {
            if(row.title === $scope.project.newField) {
                return true;
            } else {
                return false;
            }
        });

        console.log(result[0]);

        // if field is new add it

        var field;

        if (result.length > 0) {
            field = result[0];
        } else {
            field = new Fields({
              title: $scope.project.newField,
              type : 'Undefined'
            });

            field.$save(function(response) {
                $location.path('projects/' + project._id);
            });
        }


        console.log(project);
        project.fields.push(field);

        console.log('Field Added');

    };

    $scope.update = function() {
        $scope.updateRequired='';
        console.log('In Update');
        var project = $scope.project;
        if (!project.updated) {
            project.updated = [];
        }
        project.updated.push(new Date().getTime());
        console.log("Project is ");
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