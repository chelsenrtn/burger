var express = require('express');
var router = express.Router();

var models = require('../models');
var user = models.User;
var sequelizeConnection = models.sequelize;

module.exports = function(app) {
    router.get('/users', function(req, res) {
        user.findAll().then(function(data) {
            res.json(data);
        });
    });

    router.get('/users?id', function(req, res) {
        user.findById(req.params.id).then(function(data) {
            res.json(data);
        })
    });

    router.post('/users', function(req, res) {
        var r = req.body;
        user.create({
                firstName: r.firstName,
                lastName: r.lastName,
                email: r.email,
                password: r.password,
                description: r.description,
                linkGitHub: r.linkGitHub
            })
            .then(function(data) {
                res.json(data);
            })
    });

    router.post('/users/byusername', function(req, res) {
        user.findOne({
            where: {
                username: req.body.username
            }
        }).then(function(user) {
            res.json(user);
        });
    });


    router.put('/users/:id', function(req, res) {
        var r = req.body;
        user.update({
                firstName: r.firstName,
                lastName: r.lastName,
                email: r.email,
                password: r.password,
                description: r.description,
                linkGitHub: r.linkGitHub
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(function(data) {
                res.json(data);
            })
    });

    app.use('/api', router);
}