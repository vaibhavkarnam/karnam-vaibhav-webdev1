/**
* Created by vaibhav on 27-07-2017.
*/
var app = require('../../express');
var userModel = require('../models/user/user.model.server');
app.get('/api/assignment/user/:userId', findUserById);
app.get('/api/assignment/user', findAllUsers);
app.post('/api/assignment/user', createUser);
app.put('/api/assignment/user/:userId', updateUser);
app.delete('/api/assignment/user/:userId', deleteUser);

function findAllUsers(req, res) {
var username = req.query['username'];
var password = req.query.password;
console.log(username);
console.log(password);
if(username && password)
{
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if(user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        });
}
else
    if(username)
    {
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if(user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        });
}
else
    {
    userModel
        .findAllUsers()
        .then(function (users) {
            res.json(users);
        });
}
}


function findUserById(req, res) {
var userId = req.params['userId'];
userModel
    .findUserById(userId)
    .then(function (user) {
        res.json(user);
    });
}


function createUser(req, res) {
var user = req.body;
userModel
    .createUser(user)
    .then(function (user) {
        res.json(user);
    }, function (err) {
        res.send(err);
    });
}

function updateUser(req, res) {
var user = req.body;
userModel
    .updateUser(req.params.userId, user)
    .then(function (status) {
        res.send(status);
    });
}

function deleteUser(req, res) {
var user = req.body;
userModel
    .deleteUser(req.params.userId)
    .then(function (status) {
        res.send(status);
    });
}

