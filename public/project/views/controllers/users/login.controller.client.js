(function () {
angular
.module("cineReview")
.controller("loginController", loginController);

function loginController($location, userService) {
var model = this;

model.login = login;

function login(username, password)
{
if (username === null ||

    typeof username === 'undefined')
{
    model.error = "Username is required.";
    return;
}
if (password === null ||
    typeof password === 'undefined')
{

    model.error = "Password is required.";
    return;
}
userService
    .login(username, password)
    .then(
        function (found)
        {
            if (found != null) {
                $location.url('/profile');}
        }
        ,
        function (error) {
            model.message = "Sorry " + username + " not found. Please enter again";
        });

}
}
})();