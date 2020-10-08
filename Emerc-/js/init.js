if (typeof firebase === 'undefined') throw new Error('hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js');
var firebaseConfig = {
  "projectId": "emerc-5eb90",
  "appId": "1:773940018793:web:16be5a4d41b599b42c2cf8",
  "databaseURL": "https://emerc-5eb90.firebaseio.com",
  "storageBucket": "emerc-5eb90.appspot.com",
  "locationId": "us-central",
  "apiKey": "AIzaSyCCXKfDvSj_Nsz9SP075pCNeDuMbp4_AEY",
  "authDomain": "emerc-5eb90.firebaseapp.com",
  "messagingSenderId": "773940018793",
  "measurementId": "G-YHWB1746BN"
};
if (firebaseConfig) {
  firebase.initializeApp(firebaseConfig);
}

  //maake auth and firestore references
  const auth = firebase.auth();
  const db = firebase.firestore();