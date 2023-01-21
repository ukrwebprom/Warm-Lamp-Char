import { nanoid } from 'nanoid';
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
    userName = sessionStorage.getItem('userName');
    if(userName === null) {
        askName();
    } else {
        showChat();
    }
    
} else {
    chatID = nanoid();
    showID();  
}
/* const chatID = urlParams.has('chatid') ? urlParams.get('chatid') : nanoid(); */


function showChat() {
    modules.getID.classList.add('hidden');
    modules.getNane.classList.add('hidden');
    modules.chat.classList.remove('hidden');

    const socket = new WebSocket(`wss://tranquil-reaches-58824.herokuapp.com/?id=${chatID}&name=${userName}`);
    socket.onopen = () => {
        console.log('opened');
    }
    socket.onclose = () => {
        console.log('closed');
    }
    socket.onmessage = response => {
        const info = JSON.parse(response.data);
        /* console.log(info); */
        postMessage(info.sender, info.data);
    }
    modules.typearea.addEventListener('keydown', evt => {
        if(evt.key === 'Enter') {
            evt.preventDefault();
            const message = modules.typearea.textContent;
            if( message !== "") {
                console.log(message);
                modules.typearea.textContent = '';
                socket.send(message);}
            }
    })
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
}