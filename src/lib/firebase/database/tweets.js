import { tweetsRef } from "./refs";

export function subscribeTweets(callback) {
    return tweetsRef.orderBy('date', 'desc')
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

export function postTweet(tweetObj) {
    return tweetsRef.add({
            ...tweetObj,
            date: new Date().toISOString(),
        });
}