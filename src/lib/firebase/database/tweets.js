import { tweetsRef } from "./refs";

export function subscribeTweets(endingDoc, callback) {
    return tweetsRef
        .orderBy('date', 'desc')
        .endBefore(endingDoc)
        .onSnapshot(snapshot => {
                window.snap = snapshot
                callback(cleanUpSnapshot(snapshot));
            }, error => {
                console.error(error)
            });
}

function cleanUpSnapshot(snapshot) {
    return snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data(),
        };
    });
}

export async function getNextTweets(startingDoc, limit, parentCallback) {
    const ref = tweetsRef.orderBy('date', 'desc').limit(limit);

    let snapshot;
    if (startingDoc) {
        snapshot = await ref.startAfter(startingDoc).get();
    } else {
        snapshot = await ref.get();
    }

    try {
        parentCallback(cleanUpSnapshot(snapshot));
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