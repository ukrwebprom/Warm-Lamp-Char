const mainframe = document.querySelector(".mainframe");
const mainform = document.querySelector("#maininput");
const output = document.querySelector("#output");
const question = mainform.querySelector("label");
const input = mainform.querySelector("input");
let isStarted = false;
const loaderSymbols = ["''", "|", "/", "-"];
const questionary = [
    '*** Введите ваше имя:',
    '*** Введите ваш возраст',
    '*** Укажите ваш пол (1-женщина, 2-мужчина, 0-не скажу)',
    '*** Укажите возраст собеседника (1 - от 18 до 24, 2 - от 24 до 35, 3 - старше 35, 0 - не важно)',
    '*** Укажите пол собеседника (1-женщина, 2-мужчина, 0-не важно)',
];
let request = 0;

let user = {
    name:'',
    age:null,
    gender:null,
    lookingFor:null,
    lookingAge:null
}

mainform.addEventListener("submit", onFormSubmit);
setQuestion(request);

function setQuestion(n) {
    question.textContent = questionary[n];
}
function setResponse(n){
    const staticLine = document.createElement("p");
    staticLine.textContent = n;
    output.append(staticLine);
    window.scrollTo({
        top: mainframe.scrollHeight - window.innerHeight,
        behavior: 'smooth'
    });
    input.value = "";
}

function onFormSubmit(e){
    e.preventDefault();
    const info = input.value;
    if(isStarted) {
        setResponse(`Вы: ${info}`);
    } else {
        analize(info);
    }
}

function analize(info){
    if(!checkResponse(info)) {
        setResponse('Введите корректные данные');
        return;
    }
    setResponse(`${questionary[request]} ${info}`);
    request +=1;
    if(request === questionary.length) {startChat();}
    else {
        input.type = "number";
        setQuestion(request);
    }
}
function checkResponse(i){
    if(i === null || i=== "" || i<0) {return false;}
    if(request === 1 && i>100) {return false;}
    if(request === 2 && i>2) {return false;}
    if(request === 3 && i>3) {return false;}
    if(request === 4 && i>2) {return false;}
    return true;
}

function startChat() {
    isStarted = true;
    output.innerHTML = "";
    setResponse('Подождите. Ищем подходящего собеседника');
    input.type = "text";
    question.textContent = "==>";
}

/* const getName = () => {
    return new Promise((resolve, reject) =>{
        mainform.addEventListener("submit", function getSubmit(e) {
            e.preventDefault();
            mainform.removeEventListener('submit', getSubmit)
            const info = input.value;
            if(info) {
                resolve(info);
            } else {reject('empty line')};
        });
            
    })
}
getName().then(value => {
    console.log(value);
}, error => {
    console.log(error);
    getName();
});
 */
/* function getChecklist(){
    const checklist = Object.keys(user)
    for(const key in user) {
        if(!user[key]) {
            switch (key) {
                case 'name':
                  getName();
                  break;
              
                case 'age':
                  getAge();
                  break;
              
                default:
                    startChat();
            }
            return;
        }
    }
}

 function startChat() {
    const staticLine = document.createElement("p");
    staticLine.textContent = 'Подождите. Ищем партнера';
    mainform.before(staticLine);
    question.textContent = `${user.name} >`;
    input.value = "";
}

function getName() {
    question.textContent = "*** Введите ваше имя:";
    mainform.addEventListener("submit", function waitName(e) {
        e.preventDefault();
        const info = input.value;
        if(info === "") {
            postError('Введите нормальное имя');
            
        } else {
            updateInterface(info);
            user.name = info;
        }
        getChecklist();
        mainform.removeEventListener("submit", waitName);
    });
}

function getAge() {
    question.textContent = "*** Введите ваше возраст:";
    input.type = 'number';
    mainform.addEventListener("submit", function waitAge(e) {
        e.preventDefault();
        const info = input.value;
        if(info) {
            updateInterface(info);
            user.age = info;
            
        } else {
            postError('Введите нормальный возраст');
        }
        getChecklist();
        mainform.removeEventListener("submit", waitAge);
    });
}

function postError(e) {
    const staticLine = document.createElement("p");
    staticLine.textContent = e;
    mainform.before(staticLine);
    input.value = "";
}
function updateInterface(data) {
  const staticLine = document.createElement("p");
  staticLine.textContent = question.textContent + " " + data;
  mainform.before(staticLine);
  input.value = "";
}

 */