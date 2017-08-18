(function () {

angular
.module("cineReview")
.controller("profileController", profileController)

function profileController($routeParams, $route, userService, movieService, currentUser, $location) {
var model = this;
model.user=currentUser;
model.userId =currentUser._id;
model.visitorId = $routeParams["visitorId"];
model.followers =[];
model.following =[];
model.UsersFollowing = [];
model.UsersFollowers = [];
model.updateUser = updateUser;
model.unregister = unregister;
model.thumbsUp = thumbsUp;
model.getAllUserReviews = getAllUserReviews;
model.updateUserReview = updateUserReview;
model.reviewDelete = reviewDelete;
model.getReviewById = getReviewById;
model.logout = logout;
model.FollowingUsers = FollowingUsers;
model.FollowerUsers = FollowerUsers;
model.findAllUsers = findAllUsers;
model.dislike = dislike;



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
getAllUserReviews(model.userId);
}
init();

function updateUser() {
userService
.updateUser(model.userId, model.user)
.then(function () {
model.message = "User was updated successfully";
});
}

function logout() {
userService
.logout()
.then(function () {
    $location.url('/login');
});
}

function getAllUserReviews(userId)
{
// console.log("getting reviews");
movieService
.getAllUserReviews(userId)
.then(function (response) {
    model.allUserReviews=angular.copy(response);
    console.log(model.allUserReviews);
});
}



function updateUserReview(reviewId,review) {
// console.log("updating");
movieService
.updateUserReview(reviewId,review)
.then(function (response) {
    getAllUserReviews(model.userId);
});
}

function FollowingUsers(userId) {
userService
.findfollowingUser(userId)
.then(function (following)
{
    model.following = following.data[0].following;
    // console.log(model.following);
    model.following
        .forEach(function (id)
        {
        userService
            .findUserById(id)
            .then(function (user)
            {
                model.UsersFollowing.push(user);
            });
    });
});
}

function getReviewById(reviewId) {
// console.log(reviewId);
movieService
    .getReviewById(reviewId)
    .then(function(response)
    {
        model.reviewForUpdate
            =
            angular.copy(response);
        // console.log(model.reviewForUpdate);
        // console.log(model.reviewForUpdate.description);
    });
}


function dislike(reviewId)
{
if(model.user.role[0] == 'CRITIC')
{
    movieService
        .dislike(reviewId, model.user._id)
        .then(function (status)
        {
            getAllUserReviews(model.movieId);
            $route.reload();

        });
}
}
function thumbsUp(reviewId)
{
if(model.user.role[0] == 'CRITIC')
{
    movieService.thumbsUp(reviewId, model.user._id)
        .then(function (status)
        {
            getAllUserReviews(model.movieId);
            $route.reload();
        });
}
}

function findAllUsers() {
userService
    .findAllUsers()
    .then(function (users)
    {
        // console.log(users);
        model.users = users;
    })
}

function FollowerUsers(userId) {
userService
.findfollowersforUser(userId)
.then(function (followers)
{
    // console.log("followerr");
    // console.log(followers);
    model.followers = followers.data[0].followers;
    // console.log(followers.data[0]);
    model.followers
        .forEach(function (id)
        {
        userService
            .findUserById(id)
            .then(function (user)
            {
                model.UsersFollowers.push(user);
            });
    });

});
}

function reviewDelete(reviewId) {
movieService
    .deleteReview(reviewId)
    .then(function (status)
    {
        getAllUserReviews(model.userId);
    });
}

function unregister() {
userService
.deleteUser(model.userId)
.then(function (status) {
$location.url('/')
},
function () {
model.error = "unable to unregister user";
})
}
}
})();