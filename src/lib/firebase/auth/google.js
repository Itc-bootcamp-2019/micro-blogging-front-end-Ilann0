import { authRef, googleProvider } from "./refs";

export function signInWithGoogle() {
    return authRef.signInWithPopup(googleProvider)
        .then(result => {
            console.log('result google => ', result);
            console.log('token google => ', result.credential.accessToken);
            console.log('user google => ', result.user.displayName);
        })
        .catch(error => {
            console.log('error google => ', error);
        });
}