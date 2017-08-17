/**
 * Created by vaibhav on 15-08-2017.
 */
(function () {

    angular
        .module("cineReview")
        .controller("adminController", adminController)

    function adminController($route, userService, movieService,adminService, currentUser, $location) {
        var model = this;
        model.user=currentUser;
        model.userId =currentUser._id
        model.updateUser = updateUser;
        model.unregister = unregister;
        model.reviewUpdate = reviewUpdate;
        model.reviewDelete = reviewDelete;
        model.register = register;
        model.logout = logout;

        function init() {
            getAllUsers();
            getAllReviews();
        }
        init();


        function getAllUsers(){
            adminService.getAllUsers()
                .then(function (users) {
                    model.allUsers=angular.copy(users);
                    console.log(model.allUsers);
                });
        }

        function getAllReviews() {
            adminService.getAllReviews()
                .then(function (reviews) {
                    model.allReviews=angular.copy(reviews);
                    console.log( model.allReviews);
                });
        }



        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(
                    function (response) {
                        model.success = "Updated successfully";
                        $route.reload();
                    },
                    function (error) {
                        model.error = "Unable to update user"
                    }
                );
        }

        function register(user) {
            console.log(user);
            userService
                .createUser(user)
                .then(
                    function (response) {
                        var user = response;
                        if (user) {
                            model.success = "Registered successfully";
                            $route.reload();
                        }
                    },
                    function (err) {
                        model.error = err.data;
                    }
                );

        }
        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }


        function reviewDelete(reviewId) {
            console.log(reviewId);
            movieService.deleteReview(reviewId)
                .then(function (response) {
                    $route.reload();
                });
        }

        function reviewUpdate(reviewId,review) {
            console.log("updating review");
            console.log(review);
            movieService.reviewUpdate(reviewId,review)
                .then(function (response) {
                    $route.reload();
                });
        }



        function unregister(userId) {
            userService.deleteUser(userId)
                .then(function (status) {
                        $route.reload();
                    },
                    function () {
                        model.error = "unable to unregister user";
                    })
        }
    }
})();