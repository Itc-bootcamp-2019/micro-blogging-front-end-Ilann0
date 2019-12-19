import { firebase } from "./firebase";

const db = firebase.firestore();

// ----------------------------------------------
// Tweets

export function subscribeTweets(callback) {
    return db.collection('tweets')
             .orderBy('date', 'desc')
             .onSnapshot( snapshot => {
                 callback(handleSnapshot(snapshot))
             })
}

function handleSnapshot(snapshot) {
	return snapshot.docs.map(doc => {
		return { id: doc.id, ...doc.data() };
	});
}

export function postTweet(tweet) {
    return db.collection('tweets')
      .add({ 
          content: tweet,
          username: localStorage.getItem('username') ? localStorage.getItem('username') : 'anonymous',
          date: new Date().toISOString()
     })
}

// ----------------------------------------------
// Users