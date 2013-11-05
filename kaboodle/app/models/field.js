/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Field Schema
 */
var FieldSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    type: {
        type: String,
        default: '',
        trim: true
    },
    length: {
        type: String
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
FieldSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
FieldSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user', 'name username').exec(cb);
    }
};

mongoose.model('Field', FieldSchema);