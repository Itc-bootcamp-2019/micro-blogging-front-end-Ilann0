import firebase from "firebase/app";
import 'firebase/auth';

import { firebaseApp } from "../firebaseConfig";

export const authRef = firebaseApp.auth();


export const googleProvider = new firebase.auth.GoogleAuthProvider();