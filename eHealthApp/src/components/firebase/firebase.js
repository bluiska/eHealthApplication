import firebase from "firebase";
require("firebase/database");

const firebaseConfig = {
	apiKey: "AIzaSyAPT0c3ZBrlfYA8Hm79P0ep5uFj_pTodhQ",
	authDomain: "eheatlh.firebaseapp.com",
	databaseURL: "https://eheatlh.firebaseio.com",
	projectId: "eheatlh",
	storageBucket: "eheatlh.appspot.com",
	messagingSenderId: "1051145670811",
	appId: "1:1051145670811:web:03073e3936408afd9c363e"
};

firebase.initializeApp(firebaseConfig);

let db = null;

class Firebase {
	constructor() {
		this.db = firebase.database();
		console.log("Instance created");
	}
}

export let firebaseInstance = new Firebase();
