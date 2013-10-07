/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Connection = mongoose.model('Connection'),
    _ = require('underscore');


/**
 * Find connection by id
 */
exports.connection = function(req, res, next, id) {
    Connection.load(id, function(err, connection) {
        if (err) return next(err);
        if (!connection) return next(new Error('Failed to load connection ' + id));
        req.connection = connection;
        next();
    });
};

/**
 * Create a connection
 */
exports.create = function(req, res) {
    var connection = new Connection(req.body);
    connection.user = req.user;

    connection.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                connection: connection
            });
        } else {
            res.jsonp(connection);
        }
    });
};

/**
 * Update a connection
 */
exports.update = function(req, res) {
    var connection = req.connection;

    connection = _.extend(connection, req.body);

    connection.save(function(err) {
        res.jsonp(connection);
    });
};

/**
 * Delete an connection
 */
exports.destroy = function(req, res) {
    var connection = req.connection;

    connection.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(connection);
        }
    });
};

/**
 * Show an connection
 */
exports.show = function(req, res) {
    res.jsonp(req.connection);
};

/**
 * List of Connections
 */
exports.all = function(req, res) {
    Connection.find().sort('-created').populate('user', 'name username').exec(function(err, connections) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(connections);
        }
    });
};