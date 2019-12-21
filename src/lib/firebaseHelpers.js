import { firebase as firebaseApp } from "./firebase";
import firebase from 'firebase/app';
import 'firebase/auth';

const db = firebaseApp.firestore();

// ----------------------------------------------
// Tweets

export function subscribeTweets(callback) {
    return db.collection('tweets')
        .orderBy('date', 'desc')
        .onSnapshot(snapshot => {
            callback(handleSnapshot(snapshot));
        }, error => {
            console.error(error)
        });
}

function handleSnapshot(snapshot) {
    return snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data(),
        };
    });
}

export function postTweet(tweet) {
    return db.collection('tweets')
        .add({
            content: tweet,
            username: localStorage.getItem('username') ? localStorage.getItem('username') : 'anonymous',
            date: new Date().toISOString()
        });
}

// ----------------------------------------------
// Email Auth

const authRef = firebaseApp.auth();

export function subscribeAuth() { //callback) {
    return authRef.onAuthStateChanged(user => {
        console.log('user => ', user);
        console.log('user uid => ', user.uid);
        console.log('user name => ', user.displayName)
        // callback(user);
    });
}

export function signOut() {
    return authRef.signOut().then(response => console.log('signout => ', response));
}

export function signIn(emailStr, passwordStr) {
    return authRef.signInWithEmailAndPassword(emailStr, passwordStr)
        .then(response => {
            console.log('response Signin => ', response);
        })
        .catch(error => {
            console.error('error Signin => ', error);
            console.error('errorCode Signin => ', error.code);
        });
}

export function signUp(emailStr, passwordStr) {
    return authRef.createUserWithEmailAndPassword(emailStr, passwordStr)
        .then(response => {
            console.log('response Signup => ', response);
        })
        .catch(error => {
            console.error('error Signup => ', error);
            console.error('errorCode Signup => ', error.code);
        });
}

// ----------------------------------------------
// Google Auth

var googleAuth = new firebase.auth.GoogleAuthProvider();

export function signInWithGoogle() {
    return authRef.signInWithPopup(googleAuth)
        .then( result => {
            console.log('result google => ', result);
            console.log('token google => ', result.credential.accessToken);
            console.log('user google => ', result.user.displayName);
        })
        .catch( error => {
            console.log('error google => ', error);
        });
}