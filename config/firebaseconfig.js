// Import the functions you need from the SDKs you need
import firebase from "firebase";
require("firebase/auth");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWZ5mjAfBPqLst63HWjlTkFXhkIHKGYn4",
  authDomain: "book-8070e.firebaseapp.com",
  databaseURL:
    "https://book-8070e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "book-8070e",
  storageBucket: "book-8070e.appspot.com",
  messagingSenderId: "671204774308",
  appId: "1:671204774308:web:181ccf9b64a54c5b7b3131",
  measurementId: "G-CMTNTK0LZ1",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });
// export const db = getFirestore(app);
// export const dbFireStore = getFirestore(app)
