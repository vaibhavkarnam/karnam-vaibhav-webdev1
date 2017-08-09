(function () {
angular
.module('WamApp')
.factory('userService', userService);

function userService($http) {
var api ={
createUser: createUser,
findUserById: findUserById,
findUserbyUsername: findUserbyUsername,
findUserbyCredentials : findUserbyCredentials,
updateUser: updateUser,
deleteUser:deleteUser
};

return api;

function findUserbyUsername(username) {
var url = "/api/assignment/user?username="+username;
return $http.get(url)
    .then(function (response) {
        return response.data;
    })
}

function findUserById(userId) {
var url = "/api/assignment/user/"+userId;
return $http.get(url)
    .then(function (response) {
        return response.data;
    })
}

function findUserbyCredentials(username, password) {
var url = "/api/assignment/user?username="+username+"&password="+password;
return $http.get(url)
    .then(function (response) {
        console.log("found");
        return response.data;
    })
}


function createUser(user) {
var url = "/api/assignment/user/";
return $http.post(url, user)
    .then(function (response) {
        return response.data;
    })
}

function updateUser(userId, user) {
var url = "/api/assignment/user/"+userId;
return $http.put(url, user)
    .then(function (response) {
        return response.data;
    })

}

function deleteUser(userId) {
var url = "/api/assignment/user/"+userId;
return $http.delete(url)
    .then(function (status) {
        return status;
    })
}
}
})();
