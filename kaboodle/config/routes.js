var async = require('async');

module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);

    //Setting up the users api
    app.post('/users', users.create);

    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid email or password.'
    }), users.session);

    app.get('/users/me', users.me);
    app.get('/users/:userId', users.show);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //Article Routes
    var articles = require('../app/controllers/articles');
    app.get('/articles', articles.all);
    app.post('/articles', auth.requiresLogin, articles.create);
    app.get('/articles/:articleId', articles.show);
    app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
    app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);

    //Finish with setting up the articleId param
    app.param('articleId', articles.article);

    //Comment Routes
    var comments = require('../app/controllers/comments');
    app.get('/comments', comments.all);
    app.post('/comments', auth.requiresLogin, comments.create);
    app.get('/comments/:commentId', comments.show);
    app.put('/comments/:commentId', auth.requiresLogin, auth.comment.hasAuthorization, comments.update);
    app.del('/comments/:commentId', auth.requiresLogin, auth.comment.hasAuthorization, comments.destroy);

    //Finish with setting up the commentId param
    app.param('commentId', comments.comment);

    //Projects
    var projects = require('../app/controllers/projects');
    app.get('/projects', projects.all);
    app.post('/projects', auth.requiresLogin,  projects.create);
    app.get('/projects/:projectId', projects.show);
    //
    // do the update with a parameter string ?copy='title'
    //

    app.put('/projects/:projectId', projects.update);
    app.del('/projects/:projectId', projects.destroy);

    app.param('projectId', projects.project);
  
    //Fields
    var fields = require('../app/controllers/fields');
    app.get('/fields', fields.all);
    app.post('/fields', auth.requiresLogin,  fields.create);
    app.get('/fields/:fieldId', fields.show);
    app.put('/fields/:fieldId', fields.update);
    app.del('/fields/:fieldId', fields.destroy);
//
    //Finish with setting up the fieldId param
    app.param('fieldId', fields.field);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};