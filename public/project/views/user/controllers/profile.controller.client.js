(function () {

angular
.module("cineReview")
.controller("profileController", profileController)

function profileController($routeParams, userService, movieService, $location) {
var model = this;
model.userId = $routeParams["userId"];
model.visitorId = $routeParams["visitorId"];
model.updateUser = updateUser;
model.unregister = unregister;
model.FollowingUsers = FollowingUsers;
model.FollowerUsers = FollowerUsers;
model.followUser = followUser;
model.findAllUsers = findAllUsers;
model.followers =[];
model.following =[];
model.UsersFollowing = [];
model.UsersFollowers = [];
model.getReviewsForUser = getReviewsForUser;
model.reviewUpdate = reviewUpdate;
model.reviewDelete = reviewDelete;
model.getReviewById = getReviewById;
function init() {
model.user = userService
    .findUserById(model.userId)
    .then(showUser, errorUser);
function showUser(user) {
    model.user = user;
}
function errorUser() {
    model.error = "Sorry the User was not available";
}
    FollowingUsers(model.userId);
    FollowerUsers(model.userId);
    getReviewsForUser(model.userId);
}
init();
function updateUser() {
userService
    .updateUser(model.userId, model.user)
    .then(function () {
        model.message = "User was updated successfully";
    })
}

    function getReviewsForUser(userId) {
    console.log("getting reviews");
        movieService.getReviewsForUser(userId)
            .then(function (response) {
                model.userGivenReviews=angular.copy(response);
                console.log(model.userGivenReviews);
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

    function followUser() {
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


    function getUserReviews(movieId) {
        model.criticReviews=[];
        movieService.getUserReviews(movieId)
            .then(function (response) {
                //console.log(response);
                response.forEach(function (review) {
                    if (review.authorRole==="CRITIC"){
                        model.criticReviews.push(review);
                    }
                });
                //console.log(model.criticReviews);
                model.UserReviews=angular.copy(response);
            });
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