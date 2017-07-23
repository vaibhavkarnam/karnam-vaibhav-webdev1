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
        else {
            var User = {
                username: username,
                password: password
            };
            var user = userService.registerUser(User);
            $location.url("/profile/"+User._id);
            model.error = "User already exists";
        }
    }
}
})();