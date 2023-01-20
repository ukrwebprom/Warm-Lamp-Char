import { nanoid } from 'nanoid';
import { WS } from './websocket';
const NEW_CHAT = 'Создать новый чат';
const LOGIN_CHAT = 'Войти в чат';
const BASE_URL = 'ws://tranquil-reaches-58824.herokuapp.com/'
const chatFrame = document.querySelector('#historyframe');
const loginBtn = document.querySelector('.logform-btn');
const dialog = document.querySelector('.overlay');
const ws = new WS(messageHandler);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

loginBtn.textContent = urlParams.has('chatid') ? LOGIN_CHAT : NEW_CHAT;
const chatID = urlParams.has('chatid') ? urlParams.get('chatid') : nanoid();



const postMessage = (name, message) => {
        const newmessage = document.createElement("p");
        newmessage.textContent = `${name}: ${message}`;
        chatFrame.append(newmessage);
}
/* const makeSocket = (name, ID) => {
        ws.login(name, ID)
        ws = new WebSocket(`${BASE_URL}?id=${chatID}&name=${name}`);
        ws.onopen = () => {
                console.log('connected')
                isOnline = true;
            };
        ws.onclose = () => {
                console.log('dis-connected')
                isOnline = false;
            };
        ws.onmessage = response => {
                const info = JSON.parse(response.data);
                postMessage('Vasja', info);
        }
} */

const onLogin = e => {
        e.preventDefault();
        const name = e.target.elements.name.value.trim();
        if(name === '') {return;}
        
        dialog.classList.toggle('hidden');
        ws.login(name, chatID);
        
}

const loginForm = document.querySelector('.logform');
loginForm.addEventListener('submit', onLogin);

const typearea = document.querySelector('#typearea');
typearea.addEventListener('keydown', evt => {
    if(evt.key === 'Enter') {
        evt.preventDefault();
        const message = typearea.textContent.trim();
        if( message !== "") sendMessage(message);}
})


function sendMessage(m) {
        console.log(m);
        typearea.textContent = '';
        ws.send(m)
}

function messageHandler(m) {
        postMessage('Vasja', m);
}
