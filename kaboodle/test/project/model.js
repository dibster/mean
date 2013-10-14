/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Field = mongoose.model('Field'),
    Project = mongoose.model('Project');

//Globals
var user;
var project;

user = new User({
    name: 'Full name',
    email: 'test@test.com',
    username: 'user',
    password: 'password'
});

user.save();

project = new Project({
    title: 'Unit Testing Project Title 2',
    description : 'Unit Testing Project Description',
    user: user
});

project.save();



//The tests
describe('<Unit Test>', function() {
    describe('Model Project:', function() {
        beforeEach(function(done) {

            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            firstField = new Field({
                title : 'first field'
            });

            firstField.save();

            secondField = new Field({
                title : 'second field'
            });

            secondField.save();


            user.save(function(err) {
                project = new Project({
                    title: 'Unit Testing Project Title',
                    description : 'Unit Testing Project Description',
                    user: user,
                    fields : [firstField._id, secondField._id]
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                    return project.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without title', function(done) {
                project.title = '';


                return project.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            done();
        });
    });
});