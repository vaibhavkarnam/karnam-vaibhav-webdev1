/**
* Created by vaibhav on 02-08-2017.
*/
var mongoose1 = require('mongoose');
var userSchemaNew = require('./user.schema.server');
var userModelNew = mongoose1.model('userModelNew', userSchemaNew);
userModelNew.createUser = createUser;
userModelNew.findUserById = findUserById;
userModelNew.findAllUser = findAllUser;
userModelNew.findUserByUsername = findUserByUsername;
userModelNew.findUserByCredentials = findUserByCredentials;
userModelNew.updateUser = updateUser;
userModelNew.deleteUser = deleteUser;
userModelNew.FollowUser = FollowUser;
userModelNew.findfollowingforUser = findfollowingforUser;
userModelNew.findfollowersforUser = findfollowersforUser;
userModelNew.remFollowing = remFollowing;
userModelNew.deleteWebsite = deleteWebsite;
userModelNew.addFollowers = addFollowers;
userModelNew.addReview = addReview;
userModelNew.ImageUpload =ImageUpload;
userModelNew.findUserByGoogleId =findUserByGoogleId;
userModelNew.findUserByFacebookId =findUserByFacebookId;



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

function findUserByGoogleId(googleId) {
    return userModelNew
        .findOne({'google.id':googleId});
}

function findUserByFacebookId(facebookId) {
    return userModelNew
        .findOne({'facebook.id':facebookId});
}
// function findUserByGoogleId(googleId) {
//     return userModel.findOne({'google.id' : googleId});
// }

function ImageUpload (userId, url) {
    // console.log("userID" + userId);
    // console.log("url"+ url);
    return userModelNew
        .update(
            {_id: userId},
            {
                $set: {
                    ProfilePic: url
                }
            }
        );
}

function addReview(reviewId,userId) {
return userModelNew
.findUserById(userId)
.then(function (user) {

    user.UserReview.push(reviewId);

    return user.save();
}, function (error) {
    return error;
}
);

}

function createUser(user) {
return userModelNew.create(user);
}

function findUserById(userId) {
return userModelNew.findById(userId);
}

function findAllUser() {
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