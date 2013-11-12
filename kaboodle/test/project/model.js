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
                name: 'Kaboodle',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            firstField = new Field({
                title : 'Title',
                type : 'Line'
            });

            firstField.save();

            secondField = new Field({
                title : 'Description',
                type : 'Para'
            });

            secondField.save();

            user.save(function(err) {
                project = new Project({
                    title: 'Project',
                    description : 'Base Kaboodle Project',
                    user: user,
                    fields : [firstField._id, secondField._id],
                    fieldReferences: [{'field' : firstField, isFieldRequired: 'Yes'},{'field' : secondField, isFieldRequired: 'No'}]
                });

                done();
            });
        });


        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                    console.log(project);
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
                    .findOne({'title' : 'Project'})
                    .populate ('fields');

                return query.exec(function (err, project) {
                    if (err) throw err;
                    project.title.should.equal('Project');
                    //console.log(project.fields);
                    project.fields[0].title.should.equal('Title');
                    project.fields[1].title.should.equal('Description');
                    done();
                });
            });

            it('Should add a new Column to the Project Object', function(done) {

                thirdField = new Field({
                    title : 'Status'
                });

                thirdField.save();

                var query = Project
                    .findOne({'title' : 'Project'})
                    .populate ('fields');

                query.exec(function (err, currentProject) {
                    if (err) throw err;
                    currentProject.fields.push(thirdField);
                    console.log(currentProject);
                    currentProject.save(function(err) {
                        if(!err) {
                            console.log("updated ");
                        }
                        else {
                            console.log("Error: could not save contact " + err );
                        }
                    });
                    done();
                });
            });

            it('Should add a field and related CRUD data to a project', function(done) {

                var fourthField = new Field({
                    title : 'Start Date'
                });
                var validationData = 'Required';

                fourthField.save();


                var query = Project
                    .findOne({'title' : 'Project'})
                    .populate ('fieldReferences.field');


                query.exec(function (err, currentProject) {
                    if (err) throw err;
                    console.log(currentProject);
//                    currentProject.fieldReferences.push(fourthField,'Required');
//                    currentProject.save(function(err) {
//                        if(!err) {
//                            console.log("updated ");
//                        }
//                        else {
//                            console.log("Error: could not save project " + err );
//                        }
//                    });
                    done();
                });

            });


        });

        afterEach(function(done) {
            done();
        });
    });
});
