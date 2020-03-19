/**
 *
 * The Firebase access class.
 * This class is a Singleton class that is instantiated once and provides access
 * to firebase service (in my instance just db) throughout the application.
 *
 */

import firebase from "firebase";
require("firebase/database");

//The Firebase configuration parameters
const firebaseConfig = {
	apiKey: "AIzaSyAPT0c3ZBrlfYA8Hm79P0ep5uFj_pTodhQ",
	authDomain: "eheatlh.firebaseapp.com",
	databaseURL: "https://eheatlh.firebaseio.com",
	projectId: "eheatlh",
	storageBucket: "eheatlh.appspot.com",
	messagingSenderId: "1051145670811",
	appId: "1:1051145670811:web:03073e3936408afd9c363e"
};

//The app is initialized once.
firebase.initializeApp(firebaseConfig);

//The database instance
let db = null;

class Firebase {
	constructor() {
		this.db = firebase.database();
		console.log("Instance created");
	}
}

//Export a new instance of the class which will only ever happen once.
export let firebaseInstance = new Firebase();
