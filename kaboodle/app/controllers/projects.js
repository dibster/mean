/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Project = mongoose.model('Project'),
    _ = require('underscore');


/**
 * Find project by id
 */
exports.project = function(req, res, next, id) {
    Project.load(id, function(err, project) {
        if (err) return next(err);
        if (!project) return next(new Error('Failed to load project ' + id));
        req.project = project;
        next();
    });
};

/**
 * Create a project
 */
exports.create = function(req, res) {
    var project = new Project(req.body);
    project.user = req.user;

    project.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                project: project
            });
        } else {
            res.jsonp(project);
        }
    });
};

/**
 * Update a project
 */
exports.update = function(req, res) {

    console.log("In Backend Project Update");

    console.log('Query String, copy fields from : ' + req.param('copyFieldsFrom'));

    var project = req.project;

    project = _.extend(project, req.body);

    project.save(function(err) {
        res.jsonp(project);
    });
};

/**
 * Delete an project
 */
exports.destroy = function(req, res) {
    var project = req.project;

    project.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(project);
        }
    });
};

/**
 * Show a project
 */
exports.show = function(req, res) {
    console.log('in Show');
    res.jsonp(req.project);
};

/**
 *Copy a project
 */
exports.copyProject = function(req, res) {
    console.log('in Copy');
    res.jsonp(req.project);
};

/**
 * List of Projects
s */
exports.all = function(req, res) {
    console.log('in all');
    Project.find().sort('-created').populate('user', 'name username').populate('fields').exec(function(err, projects) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(projects);
        }
    });
};