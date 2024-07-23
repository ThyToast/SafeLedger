
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

# Demo
Android:
(if user has no device authentication set up)

https://github.com/user-attachments/assets/4b49af8a-592a-4507-9f3a-731997ced77c

(if user has device authentication)

https://github.com/user-attachments/assets/5aca920c-4a13-498c-868a-26eccc5717d6

iOS:

https://github.com/user-attachments/assets/734afa85-4613-46ad-b9c9-c5971516063a

(FaceId does not work on Expo Go)




