const output = document.querySelector("#output");
const input = document.querySelector("#input");
const mainframe = document.querySelector(".chat-main-frame");
const form = document.querySelector('#form');
const label = document.querySelector('.input-label');
const formField = document.querySelector('.input-data');

let userID = sessionStorage.getItem('userID');

const ws = new WebSocket(`ws://tranquil-reaches-58824.herokuapp.com/?id=${userID}`);

ws.onopen = () => {
    //writeMessage("Произошло подключение к сереверу");
    isOnline = true;
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

        case 'exit':
            window.location.href = 'http://www.warmlampchat.fun/';
            break;

        default:
            writeMessage(info);
        break;
    }

    
    }

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
/*     const formHtml = `<form class="one-string-form" id="form">
    <label for="input-data">${dataLabel}</label>
    <input type="${dataType}" name = "input-data" class="input-data" autocomplete="off"></form>`;
    input.innerHTML = formHtml; */
    label.textContent = dataLabel;
    formField.focus();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    ws.send(formField.value);
    formField.value = '';
})
document.body.addEventListener('click', () => {
    formField.focus();
});