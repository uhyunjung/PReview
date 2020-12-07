import firebase from 'firebase/app';
import "firebase/firestore";

// firebase config 구성 개체
var config = {
    apiKey: "AIzaSyDnXufY7R-xJviqupd8G3J3LFeTVdIIPbI",
    authDomain: "preview-4f952.firebaseapp.com",
    databaseURL: "https://preview-4f952.firebaseio.com",
    projectId: "preview-4f952",
    storageBucket: "preview-4f952.appspot.com",
    messagingSenderId: "519620230820",
    appId: "1:519620230820:web:9eeaa39a7f4a53fcbab031",
    measurementId: "G-6CD3D249C0"
}

// firebase 초기화
var firebaseApp = firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebaseApp.firestore();

export default firebase;
