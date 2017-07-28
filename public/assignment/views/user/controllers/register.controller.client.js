(function () {

angular
.module("WamApp")
.controller("registerController", registerController);

function registerController(userService, $location) {
var model = this;
model.registerUser = registerUser;
function init() {

}
init();
function registerUser(username, password, password2) {
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
    model.error = "Sorry that username is taken, Please try another one";
}
userService
    .findUserbyUsername(username)
    .then(function () {
        model.error = "Sorry, the username is already taken";
    },
        function () {
        var newUser = {
            username: username,
            password: password
        };
        return userService
            .createUser(newUser);
    })
    .then(function (user) {
        $location.url('/profile/' + user._id);
    });
}
}
})();