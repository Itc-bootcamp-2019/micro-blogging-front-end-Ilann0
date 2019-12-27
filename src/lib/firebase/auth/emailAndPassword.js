import { authRef } from "./refs";

export function signUp(emailStr, passwordStr) {
    return authRef.createUserWithEmailAndPassword(emailStr, passwordStr);
}

export function signIn(emailStr, passwordStr) {
    return authRef.signInWithEmailAndPassword(emailStr, passwordStr)
        .catch(error => {
            console.error('error Signin => ', error);
        //     console.error('errorCode Signin => ', error.code);
        });
}