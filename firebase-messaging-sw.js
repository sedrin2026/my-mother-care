importScripts("https://www.gstatic.com/firebasejs/12.3.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.3.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDUccPZVteo8ikjRXgZYBuy2vcG9Chpqr8",
  authDomain: "my-mother-care.firebaseapp.com",
  projectId: "my-mother-care",
  storageBucket: "my-mother-care.firebasestorage.app",
  messagingSenderId: "772945697337",
  appId: "1:772945697337:web:03b249c3767237ea210be8"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const n = payload.notification || {};
  self.registration.showNotification(
    n.title || "💌 母ちゃんから返事が届きました",
    {
      body: n.body || "新しい回答があります。タップして確認してください。",
      icon: "./my-mother-care-nanohana-header-v17.webp",
      data: { url: "./responses.html" }
    }
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(new URL("./responses.html", self.location).href)
  );
});
