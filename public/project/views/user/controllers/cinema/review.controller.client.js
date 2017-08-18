/**
* Created by vaibhav on 14-08-2017.
*/
(function () {
angular
.module("cineReview")
.controller("reviewController", reviewController);

function reviewController($location, $routeParams,currentUser, movieService) {
var model = this;
model.reviewId = $routeParams.reviewId;
model.getReviewById = getReviewById;
model.reviewUpdate =reviewUpdate;
model.user = currentUser;
model.logout = logout;

function init()
{

getReviewById(model.reviewId);

}
init();

function getReviewById(reviewId)
{
// console.log(reviewId);
movieService
.getReviewById(reviewId)
.then(function(response)
{
    model.reviewForUpdate = angular.copy(response);
    // console.log(model.reviewForUpdate);
    // console.log(model.reviewForUpdate.description);
});
}

function reviewUpdate(reviewId,review)
{
// console.log("updating");
movieService
.updateUserReview(reviewId,review)
.then(function (status)
{
    $location.url('/profile')
});
}

function logout()
{
userService
.logout()
.then(function () {
    $location.url('/login');
});
}

}
})();