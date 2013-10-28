describe('Loading the module', function () {
    beforeEach(module('mean.projects'));


    describe('ProjectsController Tests', function(){

        var scope, controller;
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            controller = $controller;


        }));

        it('should fetch list of projects', function(){
                controller('ProjectsController', {$scope : scope});
                expect(scope.dave).toBe('ash');

        });

    });
});
