/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Field = mongoose.model('Field'),
    _ = require('underscore');


/**
 * Find field by id
 */
exports.field = function(req, res, next, id) {
    Field.load(id, function(err, field) {
        if (err) return next(err);
        if (!field) return next(new Error('Failed to load field ' + id));
        req.field = field;
        next();
    });
};

/**
 * Create a field
 */
exports.create = function(req, res) {
    var field = new Field(req.body);
    field.user = req.user;

    field.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                field: field
            });
        } else {
            res.jsonp(field);
        }
    });
};

/**
 * Update a field
 */
exports.update = function(req, res) {
    var field = req.field;

    field = _.extend(field, req.body);

    field.save(function(err) {
        res.jsonp(field);
    });
};

/**
 * Delete an field
 */
exports.destroy = function(req, res) {
    var field = req.field;

    field.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(field);
        }
    });
};

/**
 * Show an field
 */
exports.show = function(req, res) {
    res.jsonp(req.field);
};

/**
 * List of Fields
 */
exports.all = function(req, res) {

    Field.find().sort('-created').populate('user', 'name username').exec(function(err, fields) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(fields);
        }
    });
};