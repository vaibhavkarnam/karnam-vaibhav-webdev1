/**
 * Created by vaibhav on 02-08-2017.
 */

(function () {

    angular
        .module('cineReview')
        .controller('searchController', searchController);

    function searchController($routeParams, movieService, userService, $location){
        var model = this;

        var imdbID = $routeParams.id;
        model.submit = submit;
        model.updateReview = updateReview;
        model.deleteReview = deleteReview;
        model.getUserReviews = getUserReviews;
        var userId = $routeParams.userId;

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

        function submit(review) {
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
                        .then(function (newReview) {
                            model.rev.description = "";
                            $location
                                .url('/profile/' + model.rev.userID)
                        });
                })

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

