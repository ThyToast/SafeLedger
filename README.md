
# SafeLedger App

A simple application built on React Native and Expo where users are allowed to view transactions only after authenticated using device biometrics (Fingerprint, Iris and PIN on Android, FaceID and PIN on iOS)

Uses the following libraries
- React Native & Expo - Base
- Expo Local Authentication - Authentication
- Moment - Date formatting
- React Navigation - Navigation
- React Redux & Redux Toolkit - State management
- Redux Persist - App persistence
- AsyncStorage - App storage


# Installation

Simply clone this repository and run `npm install` or `yarn` to download all the essential libraries. Ensure that your device has the expo go app.

Run `npx expo start` or `yarn expo start` to begin 

For iOS: scan the generated QR with your phone camera
For Android: scan the generated QR with the inbuilt expo go app camera

For Android Studio users: open `android` folder using Android Studio and hit run
