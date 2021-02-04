import db from "../services/db";
import Comment from "./Comment";

/**
 * @author Collins C. Chinedu
 */
class Feed {
    private static collection = db.collection("feeds")

    public id : String = "";
    public userHandle : String = "";
    public text : String = "";
    public timestamp : Number = 0;
    public likes : Array<String> = new Array();
    public comments : Array<Comment> = new Array();

    constructor(userHandle : String, text : String){
        this.userHandle = userHandle;
        this.text = text;
    }

    public save() : Promise<String> {
        if(this.timestamp === 0){
            this.timestamp = new Date().getTime()
        }
        return Feed.collection.add({
            userHandle: this.userHandle,
            text: this.text,
            timestamp: this.timestamp,
            likes: this.likes,
            comments: this.comments
        }).then((ref : any) => {
            this.id = ref.id
        }).catch((reason : any) => console.log(reason))
    }

    public static async getInstance(id: String) : Promise<Feed> {
        const data = (await Feed.collection.doc(id).get()).data();
        const feed : Feed = new Feed(data.userHandle, data.text);
        feed.id = id;
        feed.timestamp = data.timestamp;
        feed.likes = data.likes;
        feed.comments = data.comments;
        return feed;
    }

    public static async getAllInstances(): Promise<Array<any>> {
        const snapshot = (await Feed.collection.get())
        const feeds : Array<any> = new Array();
        snapshot.forEach((doc: any) => {
            const data = doc.data();
            const feed : Feed = new Feed(data.userHandle, data.text);
            feed.id = doc.id;
            feed.timestamp = data.timestamp;
            feed.likes = data.likes;
            feed.comments = data.comments;
            feeds.push({
                id: doc.id,
                userHandle: data.userHandle,
                text: data.text,
                likes: data.likes,
                comments: data.comments
            })
        })
        return feeds;
    }
}
export default Feed;