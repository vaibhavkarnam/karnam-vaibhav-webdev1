/**
* Created by vaibhav on 02-08-2017.
*/
var mongoose1 = require('mongoose');
var userSchemaNew = require('./user.schema.server');
var userModelNew = mongoose1.model('userModelNew', userSchemaNew);
userModelNew.createUser = createUser;
userModelNew.findUserById = findUserById;
userModelNew.findAllUsers = findAllUsers;
userModelNew.findUserByUsername = findUserByUsername;
userModelNew.findUserByCredentials = findUserByCredentials;
userModelNew.updateUser = updateUser;
userModelNew.deleteUser = deleteUser;
userModelNew.addWebsite = addWebsite;
userModelNew.FollowUser = FollowUser;
userModelNew.findfollowingforUser = findfollowingforUser;
userModelNew.findfollowersforUser = findfollowersforUser;
userModelNew.remFollowing = remFollowing;
userModelNew.deleteWebsite = deleteWebsite;
userModelNew.addFollowers = addFollowers;

module.exports = userModelNew;

function deleteWebsite(userId, websiteId) {
return userModelNew
.findById(userId)
.then(function (user) {
var index = user.websites.indexOf(websiteId);
user.websites.splice(index, 1);
return user.save();
});
}

function addWebsite(userId, websiteId) {
return userModelNew
.findById(userId)
.then(function (user) {
user.websites.push(websiteId);
return user.save();
});
}

function createUser(user) {
return userModelNew.create(user);
}

function findUserById(userId) {
return userModelNew.findById(userId);
}

function findAllUsers() {
return userModelNew.find();
}

function findUserByUsername(username) {
return userModelNew.findOne({username: username});
}

function findUserByCredentials(username, password) {
return userModelNew.findOne({username: username, password: password});
}

function updateUser(userId, newUser) {
delete newUser.username;
delete newUser.password;
return userModelNew.update({_id: userId}, {$set: newUser});
}


function FollowUser(follow) {
var userId = follow._follower;
var followId = follow._following;
return userModelNew
.findUserById(userId)
.then(
    function (user) {
        user.following.push(followId);
        return user.save();
    },
    function (error) {
        return error;
    }
);

}




function remFollowing(followId,userId) {
return userModelNew
.findUserById(userId)
.then(
    function (user) {
        var index = user.following.indexOf(followId);
        user.following.splice(index,1);
        return user.save();
    },
    function (error) {
        return error;
    }
);

}

function addFollowers(followId,userId) {
return userModelNew
.findUserById(userId)
.then(
    function (user) {
        user.followers.push(followId);
        return user.save();
    },
    function (error) {
        return error;
    }
);

}

function remFollower(followId,userId) {
return userModelNew
.findUserById(userId)
.then(
    function (user) {
        var index = user.followers.indexOf(followId);
        user.followers.splice(index,1);
        return user.save();
    },
    function (error) {
        return error;
    }
);

}

function findfollowingforUser(userID) {
return userModelNew.find({_id: userID})
}

function findfollowersforUser(userID) {
return userModelNew.find({_id: userID})
}

function remFollowing(id) {
return userModelNew.findByIdAndRemove({following: id})
}



function deleteUser(userId) {
return userModelNew.remove({_id: userId});
}