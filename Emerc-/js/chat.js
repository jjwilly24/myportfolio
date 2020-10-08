/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// Signs-in Friendly Chat.
//function signIn() {
  // Sign into Firebase using popup auth & Google as the identity provider.
  //var provider = new firebase.auth.GoogleAuthProvider();
  //firebase.auth().signInWithPopup(provider);
//}

// Signs-out of Friendly Chat.
//function signOut() {
  // Sign out of Firebase.
  //firebase.auth().signOut();
//}

// Initiate Firebase Auth.
function initFirebaseAuth() {
  // Listen to auth state changes.
  firebase.auth().onAuthStateChanged(authStateObserver);
}

    //create path for individual messages
  //get both users ID and combine them
  function combine(){
    var user2=sessionStorage.getItem("reciever");
    var docId="";
    var read="read"
    var user1=sessionStorage.getItem("sender");
       //Check if user1’s id is less than user2's
        //change message state
        db.collectionGroup('messages').where('recieverId','==',user1).where('senderId', "==", user2).where('status', "==", null).get()
        .then(querySnapshot => {
          for (var i = 0; i < querySnapshot.docs.length; i++) {
            const snapshot = querySnapshot.docs[i]  // loop through documents if there more than one
            const documentRef = snapshot.ref  // now you have a DocumentReference
              //  ... use your DocumentReference ...
              documentRef.update({
                status: read
              })
            }
        })
    //firebase.auth().currentUser.uid;
    if(user1 < user2){
    return docId = user1+user2;
    }else
    {return docId = user2+user1}
    }
 

// Returns the signed-in user's profile pic URL.
function getProfilePicUrl() {
  return firebase.auth().currentUser.photoURL || 'https://firebasestorage.googleapis.com/v0/b/emerc-5eb90.appspot.com/o/default%2Flogo%2Fdefaultpic?alt=media&token=7145e5aa-269b-40a8-9b6b-277156671d7e';
}

// Returns the signed-in user's display name.
 function getUserName() {
    var currentuser="";
    var docref="";
    currentuser =sessionStorage.getItem("sender");
    //chooses buyer or sellername
    docref =  firebase.firestore().collection('sellerStore').doc(currentuser).get().then(doc =>{
      if(doc.exists){
        let name=  getSellerName();
        return name;
      }
      else{
        let name= getBuyerName();
        return name;
      }
      
    })
    getRecName();
    return docref;
}
async function getSellerName(){
  var name="";
  var user="";
  try {
    user = sessionStorage.getItem("sender");
  
    let docref = await firebase.firestore().collection('sellerStore').doc(user).get().then(doc =>{
    name = doc.data();
    return name.storeName
  });
  return docref;
  } catch (error) {
    console.log(error)
  }
}

async function getBuyerName(){
  var name="";
  var user="";
  try {
    user = sessionStorage.getItem("sender");
  
    let docref = await firebase.firestore().collection('users').doc(user).get().then(doc =>{
    name = doc.data();
    return name.Firstname
  });
  return docref;
  } catch (error) {
    console.log(error)
  }
}

// Returns the signed-in user's display name.
function getRecName() {
  var currentuser="";
  var docref="";
  currentuser =sessionStorage.getItem("sender");
  //chooses buyer or sellername
  docref =  firebase.firestore().collection('sellerStore').doc(currentuser).get().then(doc =>{
    if(doc.exists){
      let name=  getRecSellerName();
      return name;
    }
    else{
      let name= getRecBuyerName();
      return name;
    }
    
  })
  return docref;
}
async function getRecSellerName(){
var name="";
var user="";
try {
  user=sessionStorage.getItem("reciever");

  let docref = await firebase.firestore().collection('sellerStore').doc(user).get().then(doc =>{
  name = doc.data();
  return name.storeName
});
return docref;
} catch (error) {
  console.log(error)
}
}

async function getRecBuyerName(){
var name="";
var user="";
try {
  user=sessionStorage.getItem("reciever");

  let docref = await firebase.firestore().collection('users').doc(user).get().then(doc =>{
  name = doc.data();
  return name.Firstname
});
return docref;
} catch (error) {
  console.log(error)
}
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!firebase.auth().currentUser;
}

// Saves a new message to your Cloud Firestore database.
async function saveMessage(messageText,docId) {
  let rname= await getRecName();
  let sname = await getUserName();
  // Add a new message entry to the database.
  return firebase.firestore().collection('chat').doc(docId).collection('messages').add({
    recievername:rname,
    sendername:  sname,
    deleted:null,
    status:null,
    text: messageText,
    profilePicUrl: getProfilePicUrl(),
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    recieverId: sessionStorage.getItem("reciever"),
    senderId: sessionStorage.getItem("sender") 
  }).catch(function(error) {
    console.error('Error writing new message to database', error);
  });
}

// Loads chat messages history and listens for upcoming ones.
function loadMessages(docId) {
  // Create the query to load the messages and listen for new ones.
  var query = firebase.firestore()
                  .collection('chat').doc(docId).collection('messages')
                  .orderBy('timestamp', 'desc')
                 // .limit(12);
  
  // Start listening to the query.
  query.onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
      var message = change.doc.data();
      if (change.type === 'removed') {
        deleteMessage(change.doc.id);
      } else {
        var Id=sessionStorage.getItem("sender");
        if(message.deleted !==Id){
        displayMessage(change.doc.id, message.timestamp, message.sendername,
                       message.text, message.profilePicUrl, message.imageUrl);
        }
      }
    });
  });
}

// Saves a new message containing an image in Firebase.
// This first saves the image in Firebase storage.
async function saveImageMessage(file, docId) {
  let rname= await getRecName();
  let sname = await getUserName();
  // 1 - We add a message with a loading icon that will get updated with the shared image.
  firebase.firestore().collection('chat').doc(docId).collection('messages').add({
    recievername:rname,
    sendername:  sname,
    deleted:null,
    status:null,
    imageUrl: LOADING_IMAGE_URL,
    profilePicUrl: getProfilePicUrl(),
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(function(messageRef) {
    // 2 - Upload the image to Cloud Storage.
    var filePath = firebase.auth().currentUser.uid + '/' + messageRef.id + '/' + file.name;
    return firebase.storage().ref(filePath).put(file).then(function(fileSnapshot) {
      // 3 - Generate a public URL for the file.
      return fileSnapshot.ref.getDownloadURL().then((url) => {
        // 4 - Update the chat message placeholder with the image's URL.
        return messageRef.update({
          imageUrl: url,
          storageUri: fileSnapshot.metadata.fullPath
        });
      });
    });
  }).catch(function(error) {
    console.error('There was an error uploading a file to Cloud Storage:', error);
  });
}

// Saves the messaging device token to the datastore.
/*function saveMessagingDeviceToken() {
  firebase.messaging().getToken().then(function(currentToken) {
    if (currentToken) {
      console.log('Got FCM device token:', currentToken);
      // Saving the Device Token to the datastore.
      firebase.firestore().collection('fcmTokens').doc(currentToken)
          .set({uid: firebase.auth().currentUser.uid});
    } else {
      // Need to request permissions to show notifications.
      requestNotificationsPermissions();
    }
  }).catch(function(error){
    console.error('Unable to get messaging token.', error);
  });
}
*/

// Requests permission to show notifications.
function requestNotificationsPermissions() {
  console.log('Requesting notifications permission...');
  firebase.messaging().requestPermission().then(function() {
    // Notification permission granted.
    saveMessagingDeviceToken();
  }).catch(function(error) {
    console.error('Unable to get permission to notify.', error);
  });
}

// TODO: Initialize Firebase Performance Monitoring.
firebase.performance();

// Triggered when a file is selected via the media picker.
function onMediaFileSelected(event) {
  event.preventDefault();
  var file = event.target.files[0];

  // Clear the selection in the file picker input.
  imageFormElement.reset();

  // Check if the file is an image.
  if (!file.type.match('image.*')) {
    var data = {
      message: 'You can only share images',
      timeout: 2000
    };
    signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
    return;
  }
  // Check if the user is signed-in
  if (checkSignedInWithMessage()) {
    saveImageMessage(file, combine());
  }
}

// Triggered when the send new message form is submitted.
function onMessageFormSubmit(e) {
  e.preventDefault();
  // Check that the user entered a message and is signed in.
  if (messageInputElement.value && checkSignedInWithMessage()) {
    saveMessage(messageInputElement.value, combine()).then(function() {
      // Clear message text field and re-enable the SEND button.
      resetMaterialTextfield(messageInputElement);
      toggleButton();
    });
  }
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
async function authStateObserver(user) {
  let name = await getUserName();
  if (user) { // User is signed in!
    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicUrl();
    var userName = name;
  }else{
    alert("must log in to send a message")
  }
}

// Returns true if user is signed-in. Otherwise false and displays a message.
function checkSignedInWithMessage() {
  // Return true if the user is signed in Firebase
  if (isUserSignedIn()) {
    return true;
  }

  // Display a message to the user using a Toast.
  var data = {
    message: 'You must sign-in first',
    timeout: 2000
  };
  signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
  return false;
}

// Resets the given MaterialTextField.
function resetMaterialTextfield(element) {
  element.value = '';
  element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
}

// Template for messages.
var MESSAGE_TEMPLATE =
    '<div class="message-container">' +
      '<div class="spacing"><div class="pic"></div></div>' +
      '<div class="message"></div>' +
      '<div class="name"></div>' +
    '</div>';

// Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return url + '?sz=150';
  }
  return url;
}

// A loading image URL.
var LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

// Delete a Message from the UI.
function deleteMessage(id) {
  var div = document.getElementById(id);
  // If an element for that message exists we delete it.
  if (div) {
    div.parentNode.removeChild(div);
  }
}

function createAndInsertMessage(id, timestamp) {
  const container = document.createElement('div');
  container.innerHTML = MESSAGE_TEMPLATE;
  const div = container.firstChild;
  div.setAttribute('id', id);

  // If timestamp is null, assume we've gotten a brand new message.
  // https://stackoverflow.com/a/47781432/4816918
  timestamp = timestamp ? timestamp.toMillis() : Date.now();
  div.setAttribute('timestamp', timestamp);

  // figure out where to insert new message
  const existingMessages = messageListElement.children;
  if (existingMessages.length === 0) {
    messageListElement.appendChild(div);
  } else {
    let messageListNode = existingMessages[0];

    while (messageListNode) {
      const messageListNodeTime = messageListNode.getAttribute('timestamp');

      if (!messageListNodeTime) {
        throw new Error(
          `Child ${messageListNode.id} has no 'timestamp' attribute`
        );
      }

      if (messageListNodeTime > timestamp) {
        break;
      }

      messageListNode = messageListNode.nextSibling;
    }

    messageListElement.insertBefore(div, messageListNode);
  }

  return div;
}

// Displays a Message in the UI.
function displayMessage(id, timestamp, name, text, picUrl, imageUrl) {
  var div = document.getElementById(id) || createAndInsertMessage(id, timestamp);

  // profile picture
  if (picUrl) {
    div.querySelector('.pic').style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(picUrl) + ')';
  }

  div.querySelector('.name').textContent = name;
  var messageElement = div.querySelector('.message');

  if (text) { // If the message is text.
    messageElement.textContent = text;
    // Replace all line breaks by <br>.
    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
  } else if (imageUrl) { // If the message is an image.
    var image = document.createElement('img');
    image.addEventListener('load', function() {
      messageListElement.scrollTop = messageListElement.scrollHeight;
    });
    image.src = imageUrl + '&' + new Date().getTime();
    messageElement.innerHTML = '';
    messageElement.appendChild(image);
  }
  // Show the card fading-in and scroll to view the new message.
  setTimeout(function() {div.classList.add('visible')}, 1);
  messageListElement.scrollTop = messageListElement.scrollHeight;
  messageInputElement.focus();
}

// Enables or disables the submit button depending on the values of the input
// fields.
function toggleButton() {
  if (messageInputElement.value) {
    submitButtonElement.removeAttribute('disabled');
  } else {
    submitButtonElement.setAttribute('disabled', 'true');
  }
}

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions and make ' +
        'sure you are running the codelab using `firebase serve`');
  }
}

// Checks that Firebase has been imported.
checkSetup();

// Shortcuts to DOM Elements.
var messageListElement = document.getElementById('messages');
var messageFormElement = document.getElementById('message-form');
var messageInputElement = document.getElementById('message');
var submitButtonElement = document.getElementById('submit');
var imageButtonElement = document.getElementById('submitImage');
var imageFormElement = document.getElementById('image-form');
var mediaCaptureElement = document.getElementById('mediaCapture');
var userPicElement = document.getElementById('user-pic');
var userNameElement = document.getElementById('user-name');
var signInButtonElement = document.getElementById('sign-in');
var signOutButtonElement = document.getElementById('sign-out');
var signInSnackbarElement = document.getElementById('must-signin-snackbar');

// Saves message on form submit.
messageFormElement.addEventListener('submit', onMessageFormSubmit);
//signOutButtonElement.addEventListener('click', signOut);
//signInButtonElement.addEventListener('click', signIn);

// Toggle for the button.
messageInputElement.addEventListener('keyup', toggleButton);
messageInputElement.addEventListener('change', toggleButton);

// Events for image upload.
imageButtonElement.addEventListener('click', function(e) {
  e.preventDefault();
  mediaCaptureElement.click();
});
mediaCaptureElement.addEventListener('change', onMediaFileSelected);

// initialize Firebase
initFirebaseAuth();

// TODO: Enable Firebase Performance Monitoring.

// We load currently existing chat messages and listen to new ones.
loadMessages(combine());

