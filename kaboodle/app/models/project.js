/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Project Schema
 */
var ProjectSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
ProjectSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
ProjectSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user', 'name username').exec(cb);
    }
};

mongoose.model('Project', ProjectSchema);