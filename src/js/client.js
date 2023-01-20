const output = document.querySelector("#output");
const input = document.querySelector("#input");
const mainframe = document.querySelector(".mainframe");
const rollerSymbols = ['\\', '|', '/', '―'];
let isOnline = false;
let userID = sessionStorage.getItem('userID');
console.log(userID);

//const ws = new WebSocket(`ws://localhost:8080`);
const ws = new WebSocket(`ws://salty-bayou-10932.herokuapp.com?id=${userID}`);
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

        case 'loader':
            output.innerHTML = '';
            getLaoder(info.data);
            break;

        default:
            writeMessage(info);
        break;
    }

    
    }


function getLaoder(b){
    if(b) {
        const loader='<p>Идет поиск собеседника <span class="roller"></span></p>';
        input.innerHTML = loader;
        const roller=document.querySelector('.roller');
        let i=0;
        let rollInterval = setInterval(() => {
            roller.textContent = rollerSymbols[i];
            i = i<3 ? i+=1 : 0;
        }, 100);
    } else {
        clearInterval(rollInterval);
        input.innerHTML = '';
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