import * as functions from 'firebase-functions';
import Feed from "../models/Feed";
import Comment from "../models/Comment";

/**
 * @author Collins C. Chinedu
 */
class FeedController {

    static get publishFeed() : Function {
        return functions.https.onRequest((request, response) => {
            const data = request.body
            const newFeed: Feed = new Feed(data.userHandle, data.text)
            newFeed.save().then(() => {
                response.send({status: true})
            }).catch(reason => console.log(reason))
        })
    }

    static get getFeeds() : Function {
        return functions.https.onRequest((request, response) => {
            Feed.getAllInstances().then((feeds : Array<any>) => {
                response.send({
                    status: true,
                    data: feeds
                })
            }).catch(reason => console.log(reason))
        })
    }

    static get comment() : Function {
        return functions.https.onRequest((request, response) => {
            const requestData = request.body;
            Feed.getInstance(requestData.id).then((feed : Feed) => {
                feed.comments.push({
                    id: feed.comments.length,
                    userHandle: requestData.userHandle,
                    text: requestData.text
                })
                feed.save()
                response.send({status: true})
            }).catch(reason => console.log(reason))
        })
    }

    static get deleteComment() : Function {
        return functions.https.onRequest((request, response) => {
            const requestData = request.body;
            Feed.getInstance(requestData.id).then((feed : Feed) => {
                feed.comments = feed.comments.filter((comment : Comment) => comment.id !== requestData.commentId)
                feed.save()
                response.send({status: true})
            }).catch(reason => console.log(reason))
        })
    }

    static get like() : Function {
        return functions.https.onRequest((request, response) => {
            const requestData = request.body;
            Feed.getInstance(requestData.id).then((feed : Feed) => {
                feed.likes.push(requestData.userHandle)
                feed.save()
                response.send({status: true})
            }).catch(reason => console.log(reason))
        })
    }

    static get unlike() : Function {
        return functions.https.onRequest((request, response) => {
            const requestData = request.body;
            Feed.getInstance(requestData.id).then((feed : Feed) => {
                feed.likes = feed.likes.filter((like : String) => like !== requestData.userHandle)
                feed.save()
                response.send({status: true})
            }).catch(reason => console.log(reason))
        })
    }
}
export default FeedController;