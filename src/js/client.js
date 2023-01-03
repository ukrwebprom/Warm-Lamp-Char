import { nanoid } from 'nanoid';
const output = document.querySelector("#output");
const input = document.querySelector("#input");
const mainframe = document.querySelector(".mainframe");
/* const mainform = document.querySelector("#maininput");
const prefix = mainform.querySelector("label");
const input = mainform.querySelector("input"); */
let isOnline = false;
let userID = sessionStorage.getItem('userID');
console.log(userID);
/* if(!userID) {
    userID = nanoid();
    localStorage.setItem('userID', userID);
} */

//const ws = new WebSocket(`ws://localhost:3000`);
const ws = new WebSocket(`ws://salty-bayou-10932.herokuapp.com?id=${userID}`);
ws.onopen = () => {
    //writeMessage("Произошло подключение к сереверу");
    isOnline = true;
    //if(userID) ws.send(userID);
};
ws.onclose = () => {
    //writeMessage("Произошло отключение от серевера")
    isOnline = false;
};
ws.onmessage = response => {
    const info = JSON.parse(response.data);
    switch (info.command) {
        case 'setID':
            sessionStorage.setItem('userID', info.data);
            //ws.send('ready');
            break;

        case 'msg':
            writeMessage(info.data);
            break;

        case 'input':
            inputData(info.type, info.data);
            break;

        default:
            writeMessage(info);
        break;
    }

    
    }

/* mainform.addEventListener("submit", (e) => {
    e.preventDefault();
    if(isOnline) ws.send(input.value);
}); */


function writeMessage(n){
    const staticLine = document.createElement("p");
    staticLine.textContent = n;
    output.append(staticLine);
    window.scrollTo({
        top: mainframe.scrollHeight - window.innerHeight,
        behavior: 'smooth'
    });
}

function inputData(dataType, dataLabel) {
    const formHtml = `<form class="one-string-form" id="form">
    <label for="input-data">${dataLabel}</label>
    <input type="${dataType}" name = "input-data" class="input-data"></form>`;
    input.innerHTML = formHtml;
    const form = document.querySelector('#form');
    const formField = form.querySelector('input');
    formField.focus();
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        ws.send(formField.value);
        input.innerHTML = '';
    })
}