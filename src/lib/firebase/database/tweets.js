import { tweetsRef } from "./refs";

export function subscribeTweets(callback) {
    return tweetsRef.onSnapshot(snapshot => {
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

// change to take tweet obj
export function postTweet(tweet) {
    return tweetsRef.add({
            content: tweet,
            username: localStorage.getItem('username') ? localStorage.getItem('username') : 'anonymous',
            date: new Date().toISOString(),
        });
}