import { firebaseApp } from '../firebaseConfig';

export const tweetsRef = firebaseApp.firestore().collection('tweets')

export const usersRef = firebaseApp.firestore().collection('users');