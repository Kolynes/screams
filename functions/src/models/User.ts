import db from "../services/db";

/**
 * @author Collins C. Chinedu
 */
class User {
    private static collection = db.collection("users");

    public name : String = "";
    public handle: String = "";
    public password: String = "";
    public profilePicture : String = "";

    constructor(name: String, handle: String, profilePicture: String){
        this.name = name;
        this.handle = handle;
        this.profilePicture = profilePicture;
    }

    public save(): Promise<String>{
        return User.collection.doc(this.handle).set({
            name: this.name,
            handle: this.handle,
            password: this.password,
            profilePicture: this.profilePicture
        })
    }

    public static async getInstance(handle: String) : Promise<User>{
        const data = (await User.collection.doc(handle).get()).data()
        const user = new User(data.name, data.handle, data.profilePicture);
        user.password = data.password
        return user;
    }

}

export default User;