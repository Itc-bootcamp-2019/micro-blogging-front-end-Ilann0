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

export async function getNextTweets(limit, parentCallback, startingDoc) {
    const ref = tweetsRef.orderBy('date', 'desc').limit(limit);
    const snapshot = startingDoc ? await ref.startAfter(startingDoc).get() : await ref.get();
    try {
        parentCallback(cleanUpSnapshot(snapshot));
        if (snapshot.docs.length !== 0)
            return () => getNextTweets(limit, parentCallback, snapshot.docs[snapshot.docs.length - 1]);
        return false;

    } catch (error) {
        console.error(error);
        return false;
    }
}

export function postTweet(tweetObj) {
    return tweetsRef.add({
            ...tweetObj,
            date: new Date().toISOString(),
        });
}