import http from "../services/http"

/**
 * @author Collins C. Chinedu
 */
class User {
    public name : String;
    public handle : String;
    public profilePicture : String;

    constructor(name : String, handle : String) {
        this.name = name;
        this.handle = handle;
    }

    public async signIn(password : String){

    }

    public async signUp(password: String){

    }

    public static async getInstance(handle : String) : Promise<User>{

    }

    public signOut(){

    }

    public async changeProfilePicture(newProfilePicture : String) : Promise<Object> {

    }
}

export default User;