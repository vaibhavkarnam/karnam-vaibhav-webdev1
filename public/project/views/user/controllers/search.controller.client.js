/**
 * Created by vaibhav on 02-08-2017.
 */

(function () {

    angular
        .module('cineReview')
        .controller('searchController', searchController);

    function searchController($routeParams, movieService, userService){
        var model = this;

        var imdbID = $routeParams.id;
        model.submit = submit;
        model.updateReview = updateReview;
        model.deleteReview = deleteReview;
        var userId = $routeParams.userId;

        function init() {
            movieService
                .searchMovieById(imdbID)
                .then(renderMovie);
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
                    console.log(model.rev);
                    movieService
                        .createReview(model.rev, model.rev.userID)
                        .then(function (newReview) {
                            model.rev.description = ""
                        });
                })

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

