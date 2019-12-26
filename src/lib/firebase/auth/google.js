import { authRef, googleProvider } from "./refs";

export function signInWithGoogle() {
    return authRef.signInWithPopup(googleProvider)
        .catch(error => {
            console.log('error google => ', error);
        });
}