// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyAYIatzD4TpsgPCoyHBnkLQ3UpC-JqF7cE",
  authDomain: "reading-book-5743b.firebaseapp.com",
  projectId: "reading-book-5743b",
  storageBucket: "reading-book-5743b.appspot.com",
  messagingSenderId: "772066379527",
  appId: "1:772066379527:web:128b717c93e8e14747a7a2",
  measurementId: "G-W2D8EW19HN"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export {
  firebase,
  
  
};
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });
// export const db = getFirestore(app);
// export const dbFireStore = getFirestore(app)