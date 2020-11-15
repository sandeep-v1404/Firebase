// Your web app's Firebase configuration

var firebaseConfig = {
    apiKey: "AIzaSyDvrRT6NVfpLn0FU_CjDr2WxOEqpx9WebI",
    authDomain: "whatsapp-clone-merns.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-merns.firebaseio.com",
    projectId: "whatsapp-clone-merns",
    storageBucket: "whatsapp-clone-merns.appspot.com",
    messagingSenderId: "539542557319",
    appId: "1:539542557319:web:59ffe236a3abc702c95e22"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// make auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions();
// Update firebase settings
db.settings({
    timestampsInSnapshots: true
});