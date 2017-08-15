/**
* Created by vaibhav on 27-07-2017.
*/
var app1 = require('../../express');
var userModelNew = require('../models/user/user.model.server');
app1.get('/api/project/user/:userId', findUserById);
app1.get('/api/project/user', findAllUsers);
app1.post('/api/project/user', createUser);
app1.put('/api/project/user/:userId', updateUser);
app1.delete('/api/project/user/:userId', deleteUser);
app1.post("/api/project/followUser", FollowUser);
app1.get("/api/project/followingUser/:userId", findfollowingforUser);
app1.get("/api/project/followersUser/:userId", findfollowersforUser);
app1.post("/api/project/FollowingRemove", removeFromFollowing);
app1.post("/api/followers", addFollowers);

function findAllUsers(req, res) {
var username = req.query['username'];
var password = req.query.password;
console.log(username);
console.log(password);
if(username && password)
{
    userModelNew
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
    userModelNew
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
    userModelNew
        .findAllUsers()
        .then(function (users) {
            res.json(users);
        });
}
}


function findUserById(req, res) {
var userId = req.params['userId'];
userModelNew
    .findUserById(userId)
    .then(function (user) {
        res.json(user);
    });
}


function createUser(req, res) {
var user = req.body;
console.log("inside server");
userModelNew
    .createUser(user)
    .then(function (user) {
        res.json(user);
    }, function (err) {
        res.send(err);
    });
}

function updateUser(req, res) {
var user = req.body;
userModelNew
    .updateUser(req.params.userId, user)
    .then(function (status) {
        res.send(status);
    });
}

function FollowUser(req, res) {
    var follow = req.body;
    console.log(follow);
    userModelNew.FollowUser(follow)
        .then(function (response) {
            res.json(response);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function addFollowers(req, res){

    var following = req.body;
    userModelNew
        .addFollowers(following._follower, following._following)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function removeFollowers(req, res) {
    var follow = req.body;
    userModelNew
        .removeFollowers(follow._follower, follow._following)
        .then(function (response) {
            res.json(response);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function removeFromFollowing(req, res) {
    var followingUser = req.body;
    userModelNew
        .remFollowing(followingUser._following, followingUser._follower)
        .then(function (response) {
            res.json(response);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}


function findfollowingforUser(req, res) {
    var userId = req.params.userId;
    userModelNew
        .findfollowingforUser(userId)
        .then(function (response) {
            console.log("FOllowing:" +response);
            res.json(response);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function findfollowersforUser(req, res) {
    var userId = req.params.userId;
    userModelNew
        .findfollowersforUser(userId)
        .then(function (followers) {
            console.log("FOllowers:" +followers);
            res.json(followers);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function deleteUser(req, res) {
var user = req.body;
userModelNew
    .deleteUser(req.params.userId)
    .then(function (status) {
        res.send(status);
    });
}

