const firebaseConfig = {
  apiKey: "AIzaSyDPDf2-4_A-syDZu_OlDloxU9GXvkYQ3n0",
  authDomain: "quizzer-app-8d06c.firebaseapp.com",
  projectId: "quizzer-app-8d06c",
  storageBucket: "quizzer-app-8d06c.firebasestorage.app",
  messagingSenderId: "742984534198",
  appId: "1:742984534198:web:4931c65a3ae43d835dbe17"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.querySelector('.sign-in-btn').addEventListener('click', () => {
  document.querySelector('.sign-in-btn').innerHTML = 'Please wait...';
  signInUser();
})
function signInUser() {
  const email = document.querySelector('.sign-in-email-input').value;
  const password = document.querySelector('.sign-in-password').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    // database.ref('users/' + user.uid).once('value')
    // .then((snapshot) => {
    //   const userData = snapshot.val();
    // });
    window.location.href = '/quiz.html';
  }).catch((error) => {
    let errorCode = error.code;
    if (errorCode === 'auth/internal-error') {
      alert('invalid Credential');
    } else if (errorCode === 'auth/wrong-password') {
      alert('wrong password');
    }
  });
}