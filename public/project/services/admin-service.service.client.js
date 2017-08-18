/**
 * Created by vaibhav on 15-08-2017.
 */

(function () {
    angular
        .module('cineReview')
        .service('adminService', adminService);


function adminService($http) {


    this.findUsers=findUsers;
    this.getUserByid=getUserByid;
    this.deleteProfile=deleteProfile;
    this.updateProfile=updateProfile;
    this.deleteUserReview=deleteUserReview;
    this.deleteFollow=deleteFollow;
    this.findReviews=findReviews;

    function findUsers()
    {
        var url="/api/getallusers";
        return $http.get(url)
            .then(function (response) {
                return response.data;
            });
    }


    function deleteUserReview(reviewId) {
        var url ="/api/review/"+reviewId;
        return $http.delete(url)
            .then(function (response) {
                return response;
            });
    }


    function deleteProfile(userId) {
        var url = '/api/user/' + userId;
        return $http.delete(url)
            .then(function (response) {
                    return response.data;
                }
            );
    }

    function findReviews() {
        var url="/api/reviews";
        return $http.get(url)
            .then(function (response) {
                return response.data;
            });

    }


    function deleteFollow(followId) {
        var url="/api/deletefollow/"+followId;
        return $http.delete(url)
            .then(function (response) {
                    return response.data;
                }
            );
    }

    function updateProfile(userId, user) {
        var url = '/api/user/' + userId;
        return $http.put(url, user)
            .then(renderUser);
        function renderUser(response) {
            return response.data;
        }
    }


    function getUserByid(userId) {
        var url="/api/user/"+userId;
        return $http.get(url)
            .then(function (response) {
                return response.data;
            });
    }
}

})();