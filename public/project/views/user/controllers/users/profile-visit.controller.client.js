/**
* Created by vaibhav on 15-08-2017.
*/
(function () {

angular
.module("cineReview")
.controller("profileVisitController", profileVisitController)

function profileVisitController($routeParams, userService, currentUser, movieService, $location) {
var model = this;
model.user = currentUser
model.userId =currentUser._id
model.visitorId = $routeParams["visitorId"];
model.updateUser = updateUser;
model.unregister = unregister;
model.FollowingUsers = FollowingUsers;
model.FollowerUsers = FollowerUsers;
model.followVisitedUser = followVisitedUser;
model.findAllUsers = findAllUsers;
model.followers =[];
model.following =[];
model.UsersFollowing = [];
model.UsersFollowers = [];
model.getReviewsForUser = getReviewsForUser;
model.reviewUpdate = reviewUpdate;
model.reviewDelete = reviewDelete;
model.getReviewById = getReviewById;
model.logout = logout;
model.unFollowVisitedUser = unFollowVisitedUser;
function init() {
model.user = userService
.findUserById(model.visitorId)
.then(showUser, errorUser);
function showUser(user) {
model.user = user;
}
function errorUser() {
model.error = "Sorry the User was not available";
}
FollowingUsers(model.visitorId);
FollowerUsers(model.visitorId);
getReviewsForUser(model.visitorId);
}
init();
function updateUser() {
userService
.updateUser(model.userId, model.user)
.then(function () {
    model.message = "User was updated successfully";
})
}

function logout() {
userService
.logout()
.then(function () {
    $location.url('/login');
});
}

function getReviewsForUser(userId) {
console.log("getting reviews");
movieService.getReviewsForUser(userId)
.then(function (response) {
    model.userGivenReviews=angular.copy(response);
    console.log(model.userGivenReviews);
})
}

function unFollowVisitedUser(followingId) {
        model.following = {
            _following : model.user._id,
            _follower: currentUser._id
        };
        userService
            .removeFollowing(model.following)
            .then(function (status) {
                console.log("donnne");
                userService
                    .removeFollower(model.following)
                    .then(function (user) {
                        model.user = user.data;
                        init();
                        $location
                            .url('/profile');
                    });
            })
}

function reviewDelete(reviewId) {
movieService.deleteReview(reviewId)
.then(function (response) {
    getReviewsForUser(model.userId);
});
}

function reviewUpdate(reviewId,review) {
console.log("updating");
movieService.reviewUpdate(reviewId,review)
.then(function (response) {
    getReviewsForUser(model.userId);
});
}

function FollowingUsers(userId) {
userService
.findfollowingUser(userId)
.then(function (following) {
    model.following = following.data[0].following;
    console.log(model.following);
    model.following.forEach(function (id) {
        userService
            .findUserById(id)
            .then(function (user) {
                model.UsersFollowing.push(user);
            })
    });
});
}

function FollowerUsers(userId) {
userService
.findfollowersforUser(userId)
.then(function (followers) {
    console.log("followerr");
    console.log(followers);
    model.followers = followers.data[0].followers;
    console.log(followers.data[0]);
    model.followers.forEach(function (id) {
        userService
            .findUserById(id)
            .then(function (user) {
                model.UsersFollowers.push(user);
            })
    });

});
}
function getReviewById(reviewId) {
console.log(reviewId);
movieService.getReviewById(reviewId)
.then(function(response){
    model.reviewForUpdate=angular.copy(response);
    console.log(model.reviewForUpdate);
    console.log(model.reviewForUpdate.description);
});
}

function followVisitedUser() {
model.following = {
_following : model.visitorId,
_follower: model.userId
};
userService
.FollowUser(model.following)
.then(function (user) {
    userService
        .addFollowers(model.following)
        .then(function (user) {
            model.user = user.data;
            init();
            $location
                .url('/profile');
        })

})
}


function findAllUsers() {
userService.findAllUsers()
.then(function (users) {
    console.log(users);
    model.users = users;
})
}



function unregister() {
userService.deleteUser(model.userId)
.then(function (status) {
        $location.url('/')
    },
    function () {
        model.error = "unable to unregister user";
    })
}
}
})();