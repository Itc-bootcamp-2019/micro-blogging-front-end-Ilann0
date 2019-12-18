import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
	apiKey: 'AIzaSyDCKDGvwkiDqOenrHZsZLpLo4izLGwMX1E',
	authDomain: 'micr0blog.firebaseapp.com',
	databaseURL: 'https://micr0blog.firebaseio.com',
	projectId: 'micr0blog',
	storageBucket: 'micr0blog.appspot.com',
	messagingSenderId: '1015031581775',
	appId: '1:1015031581775:web:0d3a198330503dc4ec6e3a',
	measurementId: 'G-GFGG6KVMKQ',
});

export { firebaseConfig as firebase }