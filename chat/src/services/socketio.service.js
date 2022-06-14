import {
    io
} from 'socket.io-client';
class SocketioService {
    socket;

    async asyncEmit(eventName, data) {
        return new Promise((resolve, reject) => {
            this.socket.emit(eventName, data);
            this.socket.on(eventName, result => {
                this.socket.off(eventName);
                resolve(result);
            });
            setTimeout(reject, 1000);
        });
    }

    setId() {
        localStorage.setItem('userId', this.socket.id)
    }

    setupSocketConnection() {
        console.log(process.env)
        this.socket = io(`${process.env.VUE_APP_HOST}:${process.env.VUE_APP_PORT}`);
    }

    reconnect() {
        this.socket.connect()
    }
    checkConnection() {
        return this.socket.id
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    emitMessage(value) {
        if (this.socket) {
            this.socket.emit("sendMessage", value)
        }
    }

    async setTyping(store) {
        if (this.socket) {
            this.socket.emit('typing', {
                user: store.user,
                typing: store.typing,
            })
        }
    }

    getTyping(store) {
        let waitStopTyping = undefined
        if (this.socket) {
            this.socket.on("typing", valueTyped => {
                if (waitStopTyping != undefined) {
                    clearTimeout(waitStopTyping)
                }
                waitStopTyping = setTimeout(() => {
                    store.othersAreTyping = false
                }, 800)

                store.othersAreTyping = valueTyped
            })
        }
    }

    listenForMessages(store) {
        if (this.socket) {
            this.socket.on('receivedMessage', (message) => {
                store.setMessages(message)
            })
        }
    }

    previousMessages(store) {
        if (this.socket) {
            this.socket.on('previousMessages', (value) => {
                store.messages = []
                for (let message of value) {
                    store.setMessages(message)
                }
            })
        }
    }

    async checkUser(user) {
        if (this.socket) {
            const userExist = await this.asyncEmit('checkIfUserExists', user)
            return userExist
        }
    }

    registerUser(user) {
        if (this.socket) {
            this.socket.emit('registerUser', user)
        }
    }

    exit() {
        if (this.socket) {
            this.socket.emit('exit')
        }
    }

}

export default new SocketioService();