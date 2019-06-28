import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDRKco6VEsav66jQJ2Ea7FfgjLwGlyuN4w",
    authDomain: "foodiesapp-23c32.firebaseapp.com",
    databaseURL: "https://foodiesapp-23c32.firebaseio.com",
    projectId: "foodiesapp-23c32",
    storageBucket: "foodiesapp-23c32.appspot.com",
    messagingSenderId: "278605152437",
    appId: "1:278605152437:web:272e9b138fa07ec6"
};
firebase.initializeApp(firebaseConfig);

export default firebase