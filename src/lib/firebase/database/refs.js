import { firebaseApp } from '../firebaseConfig';

export const tweetsRef = firebaseApp.firestore().collection('tweets').orderBy('date', 'desc');

export const usersRef = firebaseApp.firestore().collection('users');