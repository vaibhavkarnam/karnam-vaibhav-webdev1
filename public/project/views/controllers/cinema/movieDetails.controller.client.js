/**
* Created by vaibhav on 02-08-2017.
*/

(function () {


angular
.module('cineReview')
.controller('searchController', searchController);

function searchController($routeParams,$route, movieService, userService,currentUser, $location){
var model = this;

var userId = currentUser._id;
model.user = currentUser;

var imdbID = $routeParams.id;

model.postNewReview = postNewReview;
model.updateReview = updateReview;
model.deleteReview = deleteReview;
model.getAllUserReviews = getAllUserReviews;
model.logout = logout;

model.thumbsUp = thumbsUp;
model.dislike = dislike;

function init()
{

movieService
.searchMovieById(imdbID)
.then(renderMovie);
getAllUserReviews(imdbID);

}
init();

function renderMovie(movie)
{
model.movie = movie;
}

function postNewReview(review) {
model.userReview = review;
userService
.findUserById(userId)
.then(function (user)
{
    model.user = user;
    model.userReview.movieId = imdbID;
    model.userReview.userID = userId;
    model.userReview.userRole = user.role;
    model.userReview.imdbMovieName = model.movie.Title;
    model.userReview.userName = user.username;
    // console.log(model.userReview.userRole);
    movieService
        .createReview(model.userReview, model.userReview.userID)
        .then(function (status)
        {
            // console.log("jdfs");
            model.userReview.description = "";
            $route.reload();

        });
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
        // getAllUserReviews(model.movieId);
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
        // getAllUserReviews(model.movieId);
        $route.reload();
    });
}
}

function logout() {
userService
.logout()
.then(function () {
    $location.url('/login');
});
}


function getAllUserReviews(movieId) {

    // console.log(movieId);

model.userReviews =[];
model.criticReviews=[];

// console.log("getting reviews");
movieService
.getUserReviews(movieId)
.then(function (response)
{
      // console.log("response in review");
      // console.log(response);
    response
        .forEach(function (review) {
        // console.log(review.userRole);
        if (review.userRole=="CRITIC")
        {
            model.criticReviews.push(review);

             // console.log( model.criticReviews);
        }
       else if (review.userRole=="USER")
       {
            model.userReviews.push(review);
        }
    });
});
}

function deleteReview(review)
{
movieService
.deleteReview(review)
.then(function ()
{
    init();
})
}

function updateReview(review)
{
model.newRev = review;
// console.log(model.newRev);
movieService
.updateReview(model.newRev._id, model.newRev)
.then(function ()
{
    init();
})
}

function logout()
{
userService
.logout()
.then(function ()
{
    $location.url("/")
});

}

}
})();

