// ===== FCM DEBUG: raw push arrival test =====
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(clients.claim()));

self.addEventListener("push", (event) => {
  let raw = "(no data)";
  try {
    raw = event.data ? event.data.text() : "(no data)";
  } catch (e) {}

  event.waitUntil(
    self.registration.showNotification("DEBUG: push受信", {
      body: raw.slice(0, 200),
      tag: "debug-push-" + Date.now()
    })
  );
});
// ===== END FCM DEBUG =====

self.addEventListener("notificationclick",(event)=>{event.notification.close();const u=new URL("./responses.html",self.location).href;event.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(list=>{for(const c of list){if("focus" in c&&c.url.startsWith(self.location.origin)){if("navigate" in c)c.navigate(u);return c.focus();}}return clients.openWindow?clients.openWindow(u):undefined;}));});
importScripts("https://www.gstatic.com/firebasejs/12.3.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.3.0/firebase-messaging-compat.js");
firebase.initializeApp({apiKey:"AIzaSyDUccPZVteo8ikjRXgZYBuy2vcG9Chpqr8",authDomain:"my-mother-care.firebaseapp.com",projectId:"my-mother-care",storageBucket:"my-mother-care.firebasestorage.app",messagingSenderId:"772945697337",appId:"1:772945697337:web:03b249c3767237ea210be8"});
const messaging=firebase.messaging();
messaging.onBackgroundMessage((payload)=>{console.log("[MY MOTHER CARE] background FCM:",payload);if(payload&&payload.notification)return;const d=(payload&&payload.data)||{};return self.registration.showNotification(d.title||"💌 母ちゃんから返事が届きました",{body:d.body||"新しい返事が届いたので確認してください。",icon:"./my-mother-care-nanohana-header-v17.webp",tag:"my-mother-care-response",renotify:true,data:{url:"./responses.html"}});});
