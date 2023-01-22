import { nanoid } from 'nanoid';
/* import firebase from 'firebase';
import firebaseui from 'firebaseui'; */
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyB1EGilUU6bDwumGUhmYjBDkLtPpJeH7kg",
    authDomain: "warm-lamp-chat.firebaseapp.com",
    projectId: "warm-lamp-chat",
    storageBucket: "warm-lamp-chat.appspot.com",
    messagingSenderId: "143893608835",
    appId: "1:143893608835:web:aaff65d4f7b8a9e55fdeb6",
    measurementId: "G-THYWZF3H05"
  };
  
  const app = initializeApp(firebaseConfig);

  import { GoogleAuthProvider } from "firebase/auth";
  const provider = new GoogleAuthProvider();
  import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  const auth = getAuth();
const BASE_URL = document.URL;
const WS_URL = 'ws://tranquil-reaches-58824.herokuapp.com/';
const modules = {
    getID: document.querySelector('.login'),
    getNane: document.querySelector('.getname'),
    chat: document.querySelector('.mainframe'),
    output: document.querySelector('.historyframe'),
    typearea: document.querySelector('.typearea')
}
let chatID = null;
let userName = null;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if( urlParams.has('slotID') ) {
    chatID = urlParams.get('slotID');
/*     userName = sessionStorage.getItem('userName');
    if(userName === null) {
        askName();
    } else {
        showChat();
    } */
    showChat();
} else {
    chatID = nanoid();
    showID();  
}
/* const chatID = urlParams.has('chatid') ? urlParams.get('chatid') : nanoid(); */


function showChat() {
    modules.getID.classList.add('hidden');
    modules.getNane.classList.add('hidden');
    modules.chat.classList.remove('hidden');

    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    makeSocket(chatID, user.displayName);
    console.log(user.displayName);
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

/*    const socket = new WebSocket(`wss://tranquil-reaches-58824.herokuapp.com/?id=${chatID}&name=${userName}`);
  socket.onopen = () => {
      console.log('opened');
  }
  socket.onclose = () => {
      console.log('closed');
  }
  socket.onmessage = response => {
      const info = JSON.parse(response.data);
      console.log(info);
      postMessage(info.sender, info.data);
  }
  modules.typearea.addEventListener('keydown', evt => {
      if(evt.key === 'Enter') {
          evt.preventDefault();
          const message = modules.typearea.textContent;
          if( message !== "") {
              modules.typearea.textContent = '';
              socket.send(message);}
          }
  })  */
}
function showID() {
    modules.getID.classList.remove('hidden');
    modules.getNane.classList.add('hidden');
    modules.chat.classList.add('hidden'); 
    const add = document.querySelector('.js-link');
    const slotAddr = document.createElement('a');
    slotAddr.href = `${BASE_URL}?slotID=${chatID}`;
    slotAddr.textContent = `${BASE_URL}?slotID=${chatID}`;
    add.append(slotAddr);
}
function askName() {
    modules.getID.classList.add('hidden');
    modules.getNane.classList.remove('hidden');
    modules.chat.classList.add('hidden');
    const nameForm = document.querySelector('.nameForm');
    nameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = e.target.elements.myName.value.trim();
        if(name !== '') {
            sessionStorage.setItem('userName', name);
            window.location.reload();
        };
    })
}

function postMessage(name, data) {
    const newline = `<p><span class='chatname'>${name}:</span> ${data}</p>`;
    modules.output.insertAdjacentHTML('beforeend', newline);
    scrollBottom();
}

window.addEventListener('resize', scrollBottom);

function scrollBottom() {
    window.scrollTo({
        top: modules.output.scrollHeight - window.innerHeight + 120,
        behavior: 'smooth'
    });
}

function makeSocket(chatID, userName) {
    const socket = new WebSocket(`wss://tranquil-reaches-58824.herokuapp.com/?id=${chatID}&name=${userName}`);
    socket.onopen = () => {
        console.log('opened');
    }
    socket.onclose = () => {
        console.log('closed');
    }
    socket.onmessage = response => {
        const info = JSON.parse(response.data);
        console.log(info);
        postMessage(info.sender, info.data);
    }
    modules.typearea.addEventListener('keydown', evt => {
        if(evt.key === 'Enter') {
            evt.preventDefault();
            const message = modules.typearea.textContent;
            if( message !== "") {
                /* console.log(message); */
                modules.typearea.textContent = '';
                socket.send(message);}
            }
    })
}