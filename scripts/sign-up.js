import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js"; 

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";   


const db = getFirestore();
const auth = getAuth();

function isUsernameAvailbale(username){
  const usernameErrorMsg = document.querySelector('.js-username-msg');

  const usernameBorder = document.querySelector('.username-input');

  const q = query(collection(db, 'users'), where('username', '==', username));  


  // return db.collection('users').where('username', '==', username).get()

  return getDocs(q)  
  .then((querySnapshot) => {

    if (querySnapshot.empty) {

      return true;

    } else {

      usernameErrorMsg.innerHTML = 'Username is already taken';

      usernameBorder.style.border = '1px solid red';

    }

    return true;

  })
  .catch((error) =>{
    console.error('Error checking username availability:', error);
    return false;
  })
}

document.querySelector('.sign-up-btn').addEventListener('click', signUpUser)

function signUpUser() {
  // Variables 
  const confrim = document.querySelector('.re-enter-pwd');
  const usernameInput = document.querySelector('.username-input').value;
  const passwordInput = document.querySelector('.password-input').value;
  const confrimPwd = document.querySelector('.re-enter-pwd').value;
  const passwordErrorMsg = document.querySelector('.js-password-msg');
  const emailErrorMsg = document.querySelector('.js-email-msg');
  const emailInput = document.querySelector('.email-input').value;
  const email = document.querySelector('.email-input');


  if(!emailInput || !usernameInput || !confrimPwd){

    alert('Please fill in all fields')

  }else if(passwordInput !== confrimPwd){

    passwordErrorMsg.innerHTML = 'password does not match';

    confrim.style.border = '1px solid red';

    return;

  }else{

    passwordErrorMsg.innerHTML = '';

    confrim.style.border = 'none';

    isUsernameAvailbale(usernameInput).then((available) => {

      if(available){
        console.log('submitted');
        
        createUserWithEmailAndPassword(auth, emailInput, passwordInput).then(async (userCredantial) => {

          const user = userCredantial.user;

          await user.updateProfile({

            displayName: usernameInput

          });

          console.log(displayName);

          // Prepare user data to save in Firestore  
          const userDocRef = doc(collection(db, 'users'), user.uid);

          await setDoc(userDocRef, { 

            email: emailInput,

            username: usernameInput,

            confirmPassword: confrimPwd,


            score: 0,

            quizNumber: 0,

            quizProgress: {  
              quiz1: { number: 1, backgroundColor: 'rgba(23, 219, 78, 1)', background: 'rgba(255,255,255,1)' },  
              quiz2: { number: 2, backgroundColor: 'rgba(23, 219, 78, 1)', background: 'rgba(255,255,255,1)' },  
              quiz3: { number: 3, backgroundColor: 'rgba(23, 219, 78, 1)', background: 'rgba(255,255,255,1)' },  
              quiz4: { number: 4, backgroundColor: 'rgba(23, 219, 78, 1)', background: 'rgba(255,255,255,1)' },  
              quiz5: { number: 5, backgroundColor: 'rgba(23, 219, 78, 1)', background: 'rgba(255,255,255,1)' },  
            } 
            // quizProgress: userQuizProgress = {

            //   quiz1: {

            //     number: 1,

            //     backgroundColor: 'rgba(23, 219, 78, 1)',

            //     background: 'rgba(255,255,255,1)'

            //   },

            //   quiz2: {

            //     number: 2,

            //     backgroundColor: 'rgba(23, 219, 78, 1)',

            //     background: 'rgba(255,255,255,1)'

            //   },
            //   quiz3: {

            //     number: 3,

            //     backgroundColor: 'rgba(23, 219, 78, 1)',

            //     background: 'rgba(255,255,255,1)'

            //   },

            //   quiz4: {

            //     number: 4,

            //     backgroundColor: 'rgba(23, 219, 78, 1)',

            //     background: 'rgba(255,255,255,1)'

            //   },

            //   quiz5: {

            //     number: 5,

            //     backgroundColor: 'rgba(23, 219, 78, 1)',

            //     background: 'rgba(255,255,255,1)'

            //   },

            // }
          })
          window.location.href = '/login.html'

        }).catch((error) => {

          let errorCode = error.code;

          if (errorCode === 'auth/email-already-in-use') {

            emailErrorMsg.innerHTML = 'Email is already registered';

            email.style.border = '1px solid red';

          } else if (errorCode === 'auth/invalid-email') {

            emailErrorMsg.innerHTML = 'Invalid email address';

            email.style.border = '1px solid red';

          } else {

            email.style.border = 'none';

            // alert(errorMessage);

          }

        });

      }

    })

  }

}