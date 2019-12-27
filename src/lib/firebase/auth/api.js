import { authRef } from "./refs";

export function subscribeAuth(callback) {
    return authRef.onAuthStateChanged(user => {
        // console.log('user => ', user);
        if (user) {
            // console.log('user uid => ', user.uid);
            // console.log('user name => ', user.displayName)
        }
        callback(user);
    });
}

export function signOut() {
    return authRef.signOut();//.then(response => console.log('signout => ', response));
}

export function getCurrentUserId() {
    return authRef.currentUser
}