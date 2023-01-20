export class WS {

    constructor(messageHandler) {

        this.message = {};
        this.handler = messageHandler;
        
    }

    login(name, ID) {
        this.userName = name;
        this.chatID = ID;
        this.ws = new WebSocket(`ws://tranquil-reaches-58824.herokuapp.com/?id=${this.chatID}&name=${this.userName}`);
    }

    onGetMessage() {
        this.handler(this.message);
    }

    send() {

    }

}