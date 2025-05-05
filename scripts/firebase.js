import { initializeApp} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";  

import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";   



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPDf2-4_A-syDZu_OlDloxU9GXvkYQ3n0",
  authDomain: "quizzer-app-8d06c.firebaseapp.com",
  projectId: "quizzer-app-8d06c",
  storageBucket: "quizzer-app-8d06c.firebasestorage.app",
  messagingSenderId: "742984534198",
  appId: "1:742984534198:web:4931c65a3ae43d835dbe17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth}
