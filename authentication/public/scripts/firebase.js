// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAI6XWKVfvqicyaq0EhMvB92lbDb-TlKm8",
    authDomain: "fire-base-auth-guide.firebaseapp.com",
    databaseURL: "https://fire-base-auth-guide.firebaseio.com",
    projectId: "fire-base-auth-guide",
    appId: "1:130686701570:web:7c271abbbcb7a393fa971b"
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