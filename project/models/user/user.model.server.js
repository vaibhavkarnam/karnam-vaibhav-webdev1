/**
* Created by vaibhav on 02-08-2017.
*/
var mongoose1 = require('mongoose');
var userSchemaNew = require('./user.schema.server');
var userModelNew = mongoose1.model('userModelNew', userSchemaNew);
userModelNew.createUser = createUser;
userModelNew.FollowUser = FollowUser;
userModelNew.findUserById = findUserById;
userModelNew.findUserByUsername = findUserByUsername;
userModelNew.findUserByCredentials = findUserByCredentials;
userModelNew.updateUser = updateUser;
userModelNew.deleteUser = deleteUser;
userModelNew.ImageUpload =ImageUpload;
userModelNew.findfollowersforUserById = findfollowersforUserById;
userModelNew.findUserByGoogleId =findUserByGoogleId;
userModelNew.removeFollowers = removeFollowers;
userModelNew.findfollowingforUserById = findfollowingforUserById;
userModelNew.removeFromFollowing = removeFromFollowing;
userModelNew.addFollowers = addFollowers;
userModelNew.addReview = addReview;
userModelNew.findAllUser = findAllUser;

module.exports = userModelNew;

function findUserByGoogleId(googleId)
{
return userModelNew
.findOne({'google.id' : googleId});
}


function ImageUpload (userId, img) {
return userModelNew
.update(
    {_id: userId},
    {
        $set: {
            ProfilePic: img
        }
    }
);
}

function addReview(reviewId,Id)
{
return userModelNew
.findUserById(Id)
.then(function (user)
{
user.UserReview.push(reviewId);
return user.save();
}, function (error)
{
return error;
});
}

function createUser(user)
{
return userModelNew
.create(user);
}

function findUserByUsername(username)
{
return userModelNew
.findOne({username: username});
}

function findUserByCredentials(username, password)
{
return userModelNew
.findOne({username: username,
    password: password});
}

function updateUser(userId, newUser)
{

delete newUser.username;
delete newUser.password;

return userModelNew
.update({ _id : userId},
    { $set : newUser});
}

function findfollowersforUserById(userId)
{
return userModelNew
.find({ _id : userId})
}


function findUserById(userId)
{
return userModelNew
.findById(userId);
}

function addFollowers(followerUserId,userId)
{
return userModelNew
.findUserById(userId)
.then(
    function (user)
    {
        user
            .followers.push(followerUserId);
        return user.save();
    },
    function (error)
    {
        return error;
    });

}

function findAllUser()
{
return userModelNew
.find();
}

function FollowUser(follow)
{
var followingUserId = follow._following;
var userId = follow._follower;

return userModelNew
.findUserById(userId)
.then(function (user)
{
user
    .following.push(followingUserId);
return user.save();
},
function (error) {
return error;
});
}

function removeFromFollowing(followingUserId,userId)
{
return userModelNew
.findUserById(userId)
.then(
    function (user)
    {
        var pos = user
            .following.indexOf(followingUserId);
        user
            .following.splice(pos,1);
        return user.save();
    },
    function (error)
    {
        return error;
    });

}



function findfollowingforUserById(userId)
{
return userModelNew
.find({_id: userId})
}

function removeFollowers(followerUserId,userId)
{
return userModelNew
.findUserById(userId)
.then(
    function (user)
    {
        var pos = user.followers.indexOf(followerUserId);
        user
            .followers.splice(pos,1);
        return user.save();
    },
    function (error)
    {
        return error;
    });

}


function deleteUser(userId)
{
return userModelNew
.remove({ _id : userId});
}