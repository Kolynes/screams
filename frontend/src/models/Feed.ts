import http from "../services/http"
import User from "./User"

/**
 * @author Collins C. Chinedu
 */
class Feed {

    public id : String = "";
    public userHandle : String = "";
    public text : String = "";
    public timestamp : Number = 0;
    public likes : Array<String> = new Array();
    public comments : Array<Comment> = new Array();

    constructor(userHandle : String, text : String) {
        this.userHandle = userHandle;
        this.text = text;
    }

    public async publish() : Promise<Object>{
        return await http.getJSON("/publishFeed", {
            userHandle: this.userHandle,
            text: this.text
        }, "POST")
    }

    public async getUser() : Promise<User> {
        const data = (await http.getJSON("/getUser", {
            userHandle: this.userHandle
        }, "POST"))["data"]
        var user : User = new User(data.name, data.handle);
        user.profilePicture = data.profilePicture
        return user
    }

    public async like(userHandle : String) : Promise<Object> {
        return await http.getJSON("/like", {
            id: this.id,
            userHandle
        }, "POST")
    }

    public async comment(userHandle : String, text : String) : Promise<Object> {
        return await http.getJSON("/comment", {
            id: this.id,
            userHandle,
            text
        }, "POST") 
    }
    
    public async deleteComment(commentId : Number) : Promise<Object> {
        return await http.getJSON("/deleteComment", {
            id: this.id,
            commentId,
        }, "POST")
    }

    public async unlike(userHandle : String) : Promise<Object> {
        return await http.getJSON("/unlike", {
            id: this.id,
            userHandle,
        }, "POST")
    }

    public static async getFeeds() : Promise<Array<Feed>> {
        return await http.getJSON("/getFeeds", {}, "POST").then(response => response["data"])
    }
}
export default Feed;