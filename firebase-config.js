import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAi_DSoDcjk-x_XmyRu23RtIbpNwSxXyvE",
  authDomain: "habitflow-bc268.firebaseapp.com",
  projectId: "habitflow-bc268",
  storageBucket: "habitflow-bc268.firebasestorage.app",
  messagingSenderId: "301021461571",
  appId: "1:301021461571:web:555a07ae95952a25c3a8f6",
  measurementId: "G-43JD2QDBRN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let unsubscribeAuthListener = null;

function initFirebaseAuth(onChange) {
  if (unsubscribeAuthListener) unsubscribeAuthListener();
  unsubscribeAuthListener = onAuthStateChanged(auth, user => {
    if (typeof onChange === 'function') onChange(user);
  });
  return auth;
}

async function signInWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

async function signOutFirebaseUser() {
  await signOut(auth);
}

function getFirebaseCurrentUser() {
  return auth.currentUser || null;
}

window.HabitFlowFirebase = {
  initFirebaseAuth,
  signInWithGoogle,
  signOutFirebaseUser,
  getFirebaseCurrentUser,
};

window.dispatchEvent(new CustomEvent('habitflow:firebase-ready'));
