(function () {

angular
.module("cineReview")
.controller("registerController", registerController);

function registerController(userService, $location) {
var model = this;
model.registerUser = registerUser;

function registerUser(username, password, password2, role) {
if(username === null || username === '' || typeof username === 'undefined'){
    model.error ='Enter Username';
    return;
}
if(password !== password2 || password === null || typeof password === 'undefined'){
    model.error = "passwords must match";
    return;
}
var found = userService.findUserbyUsername(username);
if(found != null ){
    model.error = "Sorry that username is taken, Please try again";
}
userService
    .findUserbyUsername(username)
    .then(function () {
        model.error = "Sorry, the username is already taken";
    },
        function () {
        var newUser = {
            username: username,
            password: password,
            role:role
        };
        return userService
            .createUser(newUser);
    })
    .then(function (user) {
        $location.url('/profile');
    });
}
}
})();