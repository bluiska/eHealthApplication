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

## Testing methodology

To test the enhancement I have opted to follow a method named as **Exploratory Testing**.

Exploratory testing is a type of software testing where test cases are not created in advance but testers check the system on the fly. They may note down ideas about what to test before test execution. The focus of exploratory testing is more on testing as a "thinking" activity.

This form of testing was suitable in my case as the group part of the application has already implemented unit and integration testing. So instead, focusing on
