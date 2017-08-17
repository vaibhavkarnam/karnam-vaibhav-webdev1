(function () {
angular
.module('cineReview')
.factory('userService', userService);

function userService($http) {
var api ={
createUser: createUser,
findUserById: findUserById,
findUserbyUsername: findUserbyUsername,
findUserbyCredentials : findUserbyCredentials,
updateUser: updateUser,
deleteUser:deleteUser,
FollowUser : FollowUser,
findfollowingUser : findfollowingUser,
findfollowersforUser : findfollowersforUser,
removeFollowing : removeFollowing,
findAllUsers : findAllUsers,
addFollowers : addFollowers,
login: login,
logout: logout,
loggedin:loggedin,
register:register,
checkAdmin: checkAdmin,
deleteImage: deleteImage,
removeFollower : removeFollower

};

return api;

function findUserbyUsername(username) {
var url = "/api/project/user?username="+username;
return $http.get(url)
.then(function (response) {
return response.data;
})
}

function findUserById(userId) {
var url = "/api/project/user/"+userId;
return $http.get(url)
.then(function (response) {
return response.data;
})
}

function findAllUsers() {
var url = "/api/project/user";
return $http.get(url)
.then(function (response) {
    return response.data;
})
}

function findUserbyCredentials(username, password) {
var url = "/api/project/user?username="+username+"&password="+password;
return $http.get(url)
.then(function (response) {
console.log("found");
return response.data;
})
}

function deleteImage(userId) {
return $http.put("/api/project/deleteImage/" + userId);
}


function createUser(user) {
var url = "/api/project/user";
console.log("creating userrrr");
console.log(user);
return $http.post(url, user)
.then(function (response) {
return response.data;
})
}

function register(userObj) {
var url = "/api/register";
return $http.post(url, userObj)
    .then(function (response) {
        return response.data;
    });
}


function logout() {
var url = "/api/logout";
return $http.post(url)
    .then(function (status) {
        return status;
    });
}


// console.log("client login");
function login(username,password) {
var url="/api/login";
credentials={
    username:username,
    password:password
};
return $http.post(url,credentials)
    .then(function (response) {
        return response.data;
    });
}



function loggedin() {
var url = "/api/loggedin";
return $http.get(url)
    .then(function (response) {
        return response.data;
    });
}

function checkAdmin() {
var url = "/api/admin";
return $http.get(url)
    .then(function (response) {
        return response.data;
    });
}


function updateUser(userId, user) {
var url = "/api/project/user/"+userId;
return $http.put(url, user)
.then(function (response) {
return response.data;
})

}

function addFollowers(following) {
return $http.post("/api/followers/" , following);
}

function FollowUser(following) {

return $http.post("/api/project/followUser/" , following);
}

function findfollowingUser(userID) {
return $http.get("/api/project/followingUser/" + userID);
}

function findfollowersforUser(userID) {
return $http.get("/api/project/followersUser/" + userID);
}

function removeFollowing(following) {
return $http.post("/api/project/followingRemove" , following);
}

function removeFollower(following) {
    return $http.post("/api/remove/user/followers" , following);
}

function deleteUser(userId) {
var url = "/api/project/user/"+userId;
return $http.delete(url)
.then(function (status) {
return status;
})
}
}
})();
