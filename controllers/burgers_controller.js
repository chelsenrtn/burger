var express = require('express');
var router = express.Router();

var models = require('../models');
var burger = models.Burger;

var sequelizeConnection = models.sequelize;

module.exports = function(app) {
        router.get('/', function(req, res) {
            burger.findAll().then(function(burgers) {
                res.render("index", {"burgers": burgers});
            });
        });
        router.post("/", function(req, res) {
            var r = req.body;
            burger.create({
                name: r.name,
                devoured: false
            }).then(function(burger){
                res.redirect('/');
            });
        });
        router.put('/devour', function(req, res) {
            var r = req.body;
            burger.findById(r.id).then(function(data){
                data.update({
                    devoured: true
                }).then(function(){
                    res.redirect('/');
                })
            })
           
        });
        router.get('/deleteall', function(req, res){
            burger.findAll().then(function(burgers){
                burger.destroy({
                    truncate: true
                }).then(function(){
                    res.redirect('/');
                });
            });
        })

        app.use('/', router);
    }