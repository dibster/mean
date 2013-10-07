angular.module('mean.connections').controller('ConnectionsController', ['$scope', '$routeParams', '$location', 'Global', 'Connections', function ($scope, $routeParams, $location, Global, Connections) {
    $scope.global = Global;

    $scope.create = function() {
        var connection = new Connections({
            title: this.title,
            content: this.content
        });
        connection.$save(function(response) {
            $location.path("connections/" + response._id);
        });

        this.title = "";
        this.content = "";
    };

    $scope.remove = function(connection) {
        connection.$remove();  

        for (var i in $scope.connections) {
            if ($scope.connections[i] == connection) {
                $scope.connections.splice(i, 1);
            }
        }
    };

    $scope.update = function() {
        var connection = $scope.connection;
        if (!connection.updated) {
            connection.updated = [];
        }
        connection.updated.push(new Date().getTime());

        connection.$update(function() {
            $location.path('connections/' + connection._id);
        });
    };

    $scope.find = function(query) {
        Connections.query(query, function(connections) {
            $scope.connections = connections;
        });
    };

    $scope.findOne = function() {
        Connections.get({
            connectionId: $routeParams.connectionId
        }, function(connection) {
            $scope.connection = connection;
        });
    };
}]);