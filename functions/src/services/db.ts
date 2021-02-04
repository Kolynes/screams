const admin = require('firebase-admin');

import * as serviceAccount from "./key.json";


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://screams-4f8e6.firebaseio.com'
});

export default admin.firestore();