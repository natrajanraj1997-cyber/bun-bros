importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB6msjtyTgsH_8TWDdl5SwGYETa1AXGh7U",
  authDomain: "bun-bros.firebaseapp.com",
  projectId: "bun-bros",
  storageBucket: "bun-bros.firebasestorage.app",
  messagingSenderId: "1023100729099",
  appId: "1:1023100729099:web:144015e48721debdff540e"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title || "New Bun Bros Alert!";
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png', // Fallback to root icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
