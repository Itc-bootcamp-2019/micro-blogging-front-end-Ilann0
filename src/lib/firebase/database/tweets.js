import { tweetsRef } from "./refs";

export function subscribeTweets(callback) {
    const query = tweetsRef
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

export async function getNextTweets(parentCallback) {
    const snapshot = await tweetsRef.orderBy('date', 'desc').limit(10).get();
    try {
        parentCallback(handleSnapshot(snapshot));
        return tweetsRef.orderBy('date', 'desc').limit(10).startAfter(snapshot.docs[snapshot.docs.length - 1]).get
    } catch (error) {
        return false;
    }
}

export function postTweet(tweetObj) {
    return tweetsRef.add({
            ...tweetObj,
            date: new Date().toISOString(),
        });
}