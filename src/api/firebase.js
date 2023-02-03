import firebase from 'firebase/app';
import "firebase/firestore";

// firebase config 구성 개체
var config = {
    apiKey: "AIzaSyAWKT4EkqviiVKNe_ZxMdLQy8dQKY5i4Wg",
    authDomain: "preview-a5654.firebaseapp.com",
    databaseURL: "https://preview-a5654.firebaseio.com",
    projectId: "preview-a5654",
    storageBucket: "preview-a5654.appspot.com",
    messagingSenderId: "951562414595",
    appId: "1:951562414595:web:d51bfbbab8e351d131bc36",
    measurementId: "G-P3JK0FFHXK"
}

// firebase 초기화
var firebaseApp = firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebaseApp.firestore();

export default firebase;
