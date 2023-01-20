/* import _ from 'lodash.throttle'; */
const queryString = window.location.search;
console.log('queryString: ', queryString);

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
}
