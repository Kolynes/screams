import UserController from "./controllers/UserController";
import FeedController from "./controllers/FeedController";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript


export const create = UserController.create;
export const signIn = UserController.signIn;

export const getFeeds = FeedController.getFeeds;
export const comment = FeedController.comment;
export const deleteComment = FeedController.deleteComment;
export const like = FeedController.like;
export const unlike = FeedController.unlike;
export const publishFeed = FeedController.publishFeed;




