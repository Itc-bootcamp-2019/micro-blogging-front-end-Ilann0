import { firebaseApp } from '../firebaseConfig';
import firebase from "firebase/app";

export const tweetsRef = firebaseApp.firestore().collection('tweets')

export const usersRef = firebaseApp.firestore().collection('users');