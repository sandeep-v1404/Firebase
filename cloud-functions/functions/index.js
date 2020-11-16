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

//upvote Callable Function


//Promises Function
exports.upvote = functions.https.onCall((data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'Only authenticated users can add requests'
        );
    }
    //Get Refs for user doc and request doc
    const user = admin.firestore().collection('users').doc(context.auth.uid);
    const request = admin.firestore().collection('requests').doc(data.id);
    return user.get().then(doc => {
        //Check user hasn't already upvoted the requests
        if (doc.data().upvotedOn.includes(data.id)) {
            throw new functions.https.HttpsError(
                'failed-precondition',
                'You can only upvote something once'
            );
        }
        //Update user array
        // eslint-disable-next-line promise/no-nesting
        return user.update({
            upvotedOn: [...doc.data().upvotedOn, data.id]
        }).then(() => {
            //Update votes on the requests
            return request.update({
                upvotes: admin.firestore.FieldValue.increment(1)
            });
        });
    });
});

//     return new Promise((resolve, reject) => {
//         user.get().then(doc => {
//             //Check user hasn't already upvoted the requests
//             if (doc.data().upvotedOn.includes(data.id)) {
//                 throw new functions.https.HttpsError(
//                     'failed-precondition',
//                     'You can only upvote something once'
//                 );
//             }
//             return new Promise((resolve, reject) => {
//                 user.update({
//                         upvotedOn: [...doc.data().upvotedOn, data.id]
//                     })
//                     .then(() => {
//                         return new Promise((resolve, reject) => {
//                             request.update({
//                                 upvotes: admin.firestore.FieldValue.increment(1)
//                             });
//                         })
//                     }).catch((e) => {
//                         return reject(e);
//                     });
//             });
//         }).catch((err) => {
//             return reject(err);
//         });
//     });
// });