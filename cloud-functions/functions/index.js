const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
//auth trigger (new User SignUp)
exports.newUserSignup = functions.auth.user().onCreate(user => {
    return admin.firestore().collection('users').doc(user.uid).set({
        email: user.email,
        upvotedOn: []
    });
    //for background Triggers (Return a Value/Promise)
});
//Auth Trigger (User Deleted)
exports.userDeleted = functions.auth.user().onDelete(user => {
    return admin.firestore().collection('users').doc(user.uid).delete();
    //for background Triggers (Return a Value/Promise)
});

//http callable functions -- adding a request
exports.addRequest = functions.https.onCall((data, content) => {

    if (!content.auth) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'Only authenticated users can add requests'
        );
    }
    if (data.text.length > 30) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            'Request must be no more than 30 characters long'
        );
    }
    return new Promise((resolve, reject) => {
        admin.firestore().collection('requests').add({
            text: data.text,
            upvotes: 0,
        }).then(() => {
            return resolve();
        }).catch((e) => {
            return reject(e);
        });
    });
});








// http request1

// exports.randomNumber = functions.https.onRequest((request, response) => {
//     const number = Math.round(Math.random() * 100);
//     response.send(number.toString());
// });

//http callable function

// exports.sayHello = functions.https.onCall((data, context) => {
//     return `hello, ${data.name}`;
// })