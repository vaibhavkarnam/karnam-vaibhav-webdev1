/**
* Created by vaibhav on 13-08-2017.
*/
var mongoose = require("mongoose");
var movieProjectSchema = require("./movie.schema.server");
var movieProjectModel = mongoose.model("movieProjectModel", movieProjectSchema);
var userModelNew = require("../user/user.model.server");


movieProjectModel.createReview = createReview;
movieProjectModel.updateReview = updateReview;
movieProjectModel.findReview = findReview;
movieProjectModel.findReviewByReviewId=findReviewByReviewId;
movieProjectModel.deleteReviews = deleteReviews;
movieProjectModel.thumbsUp = thumbsUp;
movieProjectModel.getReviewforUserId=getReviewforUserId;
movieProjectModel.getReviewforMovieId = getReviewforMovieId;
movieProjectModel.deleteReview = deleteReview;
movieProjectModel.dislike = dislike;

module.exports = movieProjectModel;

function thumbsUp(reviewId,userId)
{
return movieProjectModel
.findOne({_id:reviewId})
.then(function (response)
{
    var NewPos=response.dislike
        .indexOf(userId);
    var OldPos=response.thumbsUp
        .indexOf(userId);
    if(NewPos!==-1)
    {
        response.dislike
            .splice(NewPos,1);
    }
    if(OldPos===-1)
    {

        response.thumbsUp.push(userId);
        response
            .sort= response.thumbsUp.length
            - response.dislike.length;
        return response.save();

    }
    else
        {
        return response.save();
    }
});
}

function findReviewByReviewId(reviewId)
{
return movieProjectModel
.findById(reviewId)
}

function findReview()
{
return movieProjectModel
.find()
.populate();
}


function dislike(reviewId,userId)
{
return movieProjectModel
.findOne({_id:reviewId})
.then(function (response)
{

    var NewIndex=response.dislike
        .indexOf(userId);
    var OldIndex=response.thumbsUp
        .indexOf(userId);
    if(OldIndex!==-1)
    {
        response.thumbsUp.splice(OldIndex,1);
    }
    if(NewIndex===-1)
    {
        response.dislike
            .push(userId);
        response
            .sort=response.thumbsUp.length
            -response.dislike.length;

        return response.save();
    }
    else
        {
        return response.save();
    }
});
}

function createReview(newReview, userId)
{
return movieProjectModel
.create(newReview)
.then(function (review)
{
    userModelNew
        .addReview(review._id, userId );
    return review;
})
}

function updateReview(reviewId, review) {
return movieProjectModel.update(
{ _id : reviewId },
{
    description: review.description
});
}



function getReviewforUserId(userId)
{
return movieProjectModel
.find({ userID:userId});
}

function deleteReviews(userId)
{
return movieProjectModel
.deleteMany({ _user : userId })
}

function getReviewforMovieId(movieReviewId)
{
return movieProjectModel
.find({movieID:movieReviewId})
.sort({sort:-1});
}


function deleteReview(reviewId)
{
return movieProjectModel
.findByIdAndRemove({_id: reviewId})
}
