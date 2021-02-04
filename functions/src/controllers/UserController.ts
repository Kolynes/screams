import * as functions from 'firebase-functions';
import User from "../models/User"

/**
 * @author Collins C. Chinedu
 */
class UserController {
    static get create() : Function{
        return functions.https.onRequest((request, response) => {
            const data = request.body
            const newUser: User = new User(data.name, data.handle, data.profilePicture)
            newUser.password = data.password
            newUser.save().then(() => {
                response.send({status: true})
            }).catch(reason => console.log(reason))
        })
    }

    static get signIn() : Function{
        return functions.https.onRequest((request, response) => {
            const requestData = request.body;
            User.getInstance(requestData.handle).then((user : User) => {
                if(user.password === requestData.password){
                    response.send({
                        status: true,
                        data: {
                            name: user.name,
                            handle: user.handle,
                            profilePicture: user.profilePicture
                        }
                    })
                } else {
                    response.send({
                        status: false,
                        errorMessage: "Incorrect credentials"
                    })
                }
            }).catch(reason => console.log(reason))
        })
    }

    static get getUser() : Function{
        return functions.https.onRequest((request, response) => {
            const requestData = request.body;
            User.getInstance(requestData.handle).then((user : User) => {
                response.send({
                    status: true,
                    data: {
                        name: user.name,
                        handle: user.handle,
                        profilePicture: user.profilePicture
                    }
                })
            }).catch(reason => console.log(reason))
        })
    }

    static get changeProfilePicture() : Function{
        return functions.https.onRequest((request, response) => {
            const requestData = request.body;
            User.getInstance(requestData.handle).then((user : User) => {
                user.profilePicture = requestData.profilePicture
                user.save()
                response.send({status: true})
            }).catch(reason => console.log(reason))
        })
    }
}

export default UserController;