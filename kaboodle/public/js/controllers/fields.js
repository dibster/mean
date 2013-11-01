angular.module('mean.fields').controller('FieldsController', ['$scope', '$routeParams', '$location', 'Global', 'Fields', function ($scope, $routeParams, $location, Global, Fields) {
    $scope.global = Global;
    $scope.allowFieldEdit = false;

    $scope.allowEdit = function() {
        $scope.allowFieldEdit = !$scope.allowFieldEdit;
    };


    $scope.create = function() {
        var field = new Fields({
            title: this.title,
            type: this.type,
            length : this.length
        });

        field.$save(function(response) {
            $location.path("fields");
        });

        $scope.fields.push({
            title: this.title,
            type: this.type,
            length: this.length
        });

        this.title = "";
        this.type = "";

        };

    $scope.remove = function(field) {
        field.$remove();  

        for (var i in $scope.fields) {
            if ($scope.fields[i] == field) {
                $scope.fields.splice(i, 1);
            }
        }
    };

    $scope.update = function() {
        var field = $scope.field;
        if (!field.updated) {
            field.updated = [];
        }
        field.updated.push(new Date().getTime());

        field.$update(function() {
            $location.path('fields/' + field._id);
        });
    };

    $scope.find = function(query) {
            Fields.query(query, function(fields) {
            $scope.fields = fields;
        });
    };

    $scope.findOne = function() {
        Fields.get({
            fieldId: $routeParams.fieldId
        }, function(field) {
            $scope.field = field;
        });
    };

    $scope.findByName = function(name) {
        console.log('find my name');
        console.log(title);
        Fields.get({
            title : name
        }, function(field) {
            $scope.field = field;
        });
    };
}]);