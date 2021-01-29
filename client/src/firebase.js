import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'; 
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDrBzZTUs1oOwYYIAtCj_7l5RUgbrF8BLM",
    authDomain: "bobo-41cdb.firebaseapp.com",
    projectId: "bobo-41cdb",
    storageBucket: "bobo-41cdb.appspot.com",
    messagingSenderId: "756398889591",
    appId: "1:756398889591:web:0c3522e54de1e8a31ec472",
    measurementId: "G-ZF2QD02XDK"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const db = firebase.firestore()
// export var storage = firebase.storage()


export default firebase;
