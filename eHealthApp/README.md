## Realtime database

The individual enhancement has been to implement a real-time live database solution to the application to allow live synchronization of the data. This has been achieved using **Firebase Realtime Database**.

For the Firebase Realtime Database API reference see [here.](https://firebase.google.com/docs/database)

Key capabilities of the Firebase Realtime Database include:

- Realtime
  - Instead of typical HTTP requests, the Firebase Realtime Database uses data synchronization—every time data changes, any connected device receives that update within milliseconds. Provide collaborative and immersive experiences without thinking about networking code.
- Offline
  - Firebase apps remain responsive even when offline because the Firebase Realtime Database SDK persists your data to disk. Once connectivity is reestablished, the client device receives any changes it missed, synchronizing it with the current server state.
- Accessible from Client Devices
  - The Firebase Realtime Database can be accessed directly from a mobile device or web browser; there’s no need for an application server. Security and data validation are available through the Firebase Realtime Database Security Rules, expression-based rules that are executed when data is read or written.

These features are well suited for the eHealth system to allow patients and doctors to get the latest information as quickly as possible.

## Schema

For the schema please see [Scheama README](./out/README.md)

A JSON initial state of the database can be found [here](./src/data/firebase_data_final.json)

## Config

Endpoint: **https://eheatlh.firebaseio.com/**

The config to access Firebase services:
(registered with my shu email)

```javascript
const firebaseConfig = {
	apiKey: "AIzaSyAPT0c3ZBrlfYA8Hm79P0ep5uFj_pTodhQ",
	authDomain: "eheatlh.firebaseapp.com",
	databaseURL: "https://eheatlh.firebaseio.com",
	projectId: "eheatlh",
	storageBucket: "eheatlh.appspot.com",
	messagingSenderId: "1051145670811",
	appId: "1:1051145670811:web:03073e3936408afd9c363e"
};
```

## Data Querying

The realtime database relies on events firing to update the data. Since our application was developed in React, this works really well. React only renders what's necessary and since not all data might change always, only the necessary components are updated.

An example query to retrieve all patients is the following:

```javascript
//First create a reference to the database object
const doctorsRef = firebaseInstance.db.ref("doctors");

//Then use the fiery plugins useFirebaseDatabase callback to hook into events
const doctors = fiery.useFirebaseDatabase(doctorsRef);
```

An example query to add a new activity for a user:

```javascript
//First create a reference to date key of a specific patient under activities
let activitiesRef = firebaseInstance.db.ref(`/activities/TestPatient-1/18-03-2020`);

//Then add a new child with a 0 indexed key, incrementing it as new ones are added.
activitiesRef.child("0").set({
	caloriesBurnt: 139.25,
	distance: 3.9,
	endTime: 1584439836571,
	startTime: 1584437409859,
	steps: 8750,
	timestamp: 1584439836571,
	type: "walk"
});
```

## Testing methodology

To test the enhancement I have opted to follow a method named as **Exploratory Testing**.

Exploratory testing is a type of software testing where test cases are not created in advance but testers check the system on the fly. They may note down ideas about what to test before test execution. The focus of exploratory testing is more on testing as a "thinking" activity.

This form of testing was suitable in my case as the group part of the application has already implemented unit testing. So instead, focusing on testing individual units, in my testing approach I focused on making sure the application still behaved the way it did before except with the added advantage of the real-time nature of the database. Where errors were found, I have made a note of them and fixed them _(though thankfully, due to the well developed nature of the group part, the integration was relatively smooth)_

Integration testing was also carried out to ensure that all components continued to work as before.

To test the integration with the application just run

```
npm test
```

The tests should all pass as all the correct data is still returned and all components still render as before the implementation the Firebase Realtime Database.
