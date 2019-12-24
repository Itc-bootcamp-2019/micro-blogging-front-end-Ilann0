import { usersRef } from "./refs";

export function postUser(userObj) {
    return usersRef.doc(userObj.uid).set({
        ...userObj,
        creation_date: new Date().toISOString(),
    });
}

export function getUser(userUid) {
    return usersRef.doc(userUid).get();
}