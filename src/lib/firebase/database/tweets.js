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

export async function getNextTweets(startingDoc, parentCallback) {
    const limit = 5;
    const ref = tweetsRef.orderBy('date', 'desc').limit(limit);
    let snapshot;
    if (startingDoc) {
        snapshot = await ref.startAfter(startingDoc).get();
    } else {
        snapshot = await ref.get();
    }
    try {
        parentCallback(handleSnapshot(snapshot));
        return snapshot.docs[snapshot.docs.length - 1];
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