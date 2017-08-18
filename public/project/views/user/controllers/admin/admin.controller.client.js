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
model.userId =currentUser._id;
model.reviewUpdate = reviewUpdate;
model.updateUser = updateUser;
model.unregister = unregister;
model.register = register;
model.logout = logout;
model.reviewDelete = reviewDelete;
function init()
{
findUsers();
findReviews();
}
init();


function findReviews() {
adminService
    .findReviews()
    .then(function (reviews)
    {
        model.foundReviews  =  angular.copy(reviews);
        // console.log( model.foundReviews);
    });
}

function findUsers(){
adminService.
findUsers()
    .then(function (users)
    {
        model.foundUsers  =  angular.copy(users);
        // console.log(model.foundUsers);
    });
}



function updateUser(user) {
userService
    .updateUser(user._id, user)
    .then(
        function (response)
        {
            $route.reload();
        },
        function (error)
        {
            model.error = "Unable to update user"
        }
    );
}

function register(user) {
// console.log(user);
userService
    .createUser(user)
    .then(
        function (response)
        {
            var user = response;
            if (user)
            {
                $route.reload();
            }
        },
        function (err)
        {
            model.error = err.data;
        }
    );

}
function logout() {
userService
    .logout()
    .then(function ()
    {
        $location.url('/login');
    });
}


function reviewDelete(reviewId)
{
// console.log(reviewId);
movieService
    .deleteReview(reviewId)
    .then(function (response)
    {
        $route.reload();
    });
}

function reviewUpdate(reviewId,review)
{
// console.log("updating review");
// console.log(review);
movieService
    .updateUserReview(reviewId,review)
    .then(function (response)
    {
        $route.reload();
    });
}



function unregister(userId) {
userService.deleteUser(userId)
    .then(function (status)
    {
        $route.reload();
    });
}
}
})();