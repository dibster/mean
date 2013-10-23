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


//The tests
describe('<Unit Test>', function() {
    describe('Model Project:', function() {
        before(function(done) {

            // remove projects, fields and users

            Project.find({}).remove();
            Field.find({}).remove();
            User.find({username : 'user'}).remove();

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

            it('Should have saved a new project record with two fields attached', function(done) {

                var query = Project
                    .findOne({'title' : 'Unit Testing Project Title'})
                    .populate ('fields');

                return query.exec(function (err, project) {
                    if (err) throw err;
                    project.title.should.equal('Unit Testing Project Title');
                    //console.log(project.fields);
                    project.fields[0].title.should.equal('first field');
                    project.fields[1].title.should.equal('second field');
                    done();
                });
            });
        });

        afterEach(function(done) {
            done();
        });
    });
});


function removeData() {



}