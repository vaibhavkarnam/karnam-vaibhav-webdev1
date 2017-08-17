/**
 * Created by vaibhav on 02-08-2017.
 */

(function () {

    angular
        .module('cineReview')
        .controller('searchController', searchController);

    function searchController($routeParams,$route, movieService, userService,currentUser, $location){
        var model = this;

        var imdbID = $routeParams.id;
        model.postReview = postReview;
        model.updateReview = updateReview;
        model.deleteReview = deleteReview;
        model.getUserReviews = getUserReviews;
        model.logout = logout;
        var userId = currentUser._id;
        model.user = currentUser;
        model.thumbsUp = thumbsUp;
        model.dislike = dislike;

        function init() {
            movieService
                .searchMovieById(imdbID)
                .then(renderMovie);
            getUserReviews(imdbID);
        }
        init();

        function renderMovie(movie) {
            model.movie = movie;
        }

        function postReview(review) {
            model.rev = review;
            userService
                .findUserById(userId)
                .then(function (user) {
                    model.user = user;
                    model.rev.movieID = imdbID;
                    model.rev.moviename = model.movie.Title;
                    model.rev.user_name = user.username;
                    model.rev.userID = userId;
                    model.rev.userRole = user.role;
                    console.log(model.rev.userRole);
                    movieService
                        .createReview(model.rev, model.rev.userID)
                        .then(function (status) {
                            console.log("jdfs");
                            model.rev.description = "";
                            $route.reload();
                        });
                })

        }


        function dislike(reviewId) {
            if(model.user.role[0] == 'CRITIC') {
                movieService.dislike(reviewId, model.user._id)
                    .then(function (response) {
                        getUserReviews(model.movieId);
                        $route.reload();

                    });
            }
        }
        function thumbsUp(reviewId) {
            if(model.user.role[0] == 'CRITIC') {
                movieService.thumbsUp(reviewId, model.user._id)
                    .then(function (response) {
                        getUserReviews(model.movieId);
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


        function getUserReviews(movieId) {
            model.criticReviews=[];
            model.userReviews =[];
            console.log("getting reviews");
            movieService.getUserReviews(movieId)
                .then(function (response) {
                    console.log("response in review");
                    console.log(response);
                    response.forEach(function (review) {
                        console.log(review.userRole);
                        if (review.userRole=="CRITIC"){
                            model.criticReviews.push(review);

                            console.log( model.criticReviews);
                        }
                       else if (review.userRole=="USER"){
                            model.userReviews.push(review);
                        }
                    });
                });
        }

        function deleteReview(review) {
            movieService
                .deleteReview(review)
                .then(function () {
                    init();
                })
        }

        function updateReview(review) {
            model.newRev = review;
            console.log(model.newRev);
            movieService
                .updateReview(model.newRev._id, model.newRev)
                .then(function () {
                    init();
                })
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url("/")
                })

        }

        function sendData(review) {
            model.rev = review;
        }



    }
})();

