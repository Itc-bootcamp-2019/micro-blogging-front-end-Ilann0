import { usersRef } from "./refs";

export function subscribeUser(userId, callback) {
    return usersRef.doc(userId).onSnapshot(snapshot => {
            callback(snapshot)
        }, error => {
            console.error(error)
        });
}

export function postUser(userObj) {
    return usersRef.doc(userObj.uid).set({
        ...userObj,
        creation_date: new Date().toISOString(),
    });
}

export function changeUsername(userName, userId) {
    return usersRef.doc(userId).update({
        username: userName,
    });
}

export function getUser(userUid) {
    return usersRef.doc(userUid).get();
}