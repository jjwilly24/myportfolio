importScripts('/__/firebase/7.8.0/firebase-app.js');
importScripts('/__/firebase/7.8.0/firebase-messaging.js');
importScripts('/__/firebase/init.js');

const messaging =firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload){
    const title='you got a message';
    const options ={
        body : payload.data.status
    };
    return self.registration.showNotification(title, options);
})