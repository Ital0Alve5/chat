<template>
    <div class="card text-center">
        <div class="card-header">
            <p>Ítalo's chat</p>
            <button class="btn btn-danger disconnect" @click.prevent="exit">Exit</button>
        </div>
        <div class="card-body">
            <div class="card-body__content" ref="cardBody">
                <div v-for="message in store.messages" :key="message">
                    <Status v-if="message.status" :message="message"></Status>
                    <Sent v-else-if="message.user == store.user" :message="message"></Sent>
                    <Received v-else :message="message"></Received>
                </div>
                <div v-if="typing" class="typing">
                    <div class="typing__text">
                        <b>{{ typing.user }} is typing...</b>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer text-muted">
            <form class="input-group mb-3">
                <input type="text" v-model="inputText" placeholder="Type your message..." class="form-control">
                <button class="btn btn-primary" @click.prevent="sendMessage">Enviar</button>
            </form>
        </div>
    </div>
</template>

<script>
import { store } from '@/store'
import Received from '@/components/message/Received.vue'
import Sent from '@/components/message/Sent.vue'
import Status from '@/components/message/Status.vue'

import SocketioService from '@/services/socketio.service';

export default {
    name: 'Card',
    components: {
        Received,
        Sent,
        Status
    },
    data() {
        return {
            store,
            inputText: '',
            timer: undefined,
            typing: false
        }
    },
    methods: {
        sendMessage() {
            this.store.setMessages({
                user: this.store.user,
                message: this.inputText,
            })
            SocketioService.emitMessage({
                user: this.store.user,
                message: this.inputText,
            })
            this.inputText = ''
        },
        async exit() {

            this.store.setMessages({
                user: this.store.user,
                status: 'left',
            })
            SocketioService.emitMessage({
                user: this.store.user,
                status: 'left',
            })

            localStorage.removeItem('user')
            this.store.user = ''
            this.store.messages = []
            this.store.connected = false
            SocketioService.disconnect();
        },
    },
    watch: {
        inputText: function (value) {
            this.store.typing = value
            if (this.waitStopTyping != undefined) {
                clearTimeout(this.waitStopTyping)
            }
            this.waitStopTyping = setTimeout(() => {
                this.store.typing = false
            }, 800)
        },
        'store.othersAreTyping': function (valueTyped) {
            this.typing = valueTyped
        }
    }

}
</script>

<style lang="scss">
.typing {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}

.input-group {
    margin-top: 1rem;
}

.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
        margin: 0 auto;
        transform: translateX(50%);
    }
}

.card-body {
    &__content {
        height: 35rem;
        overflow: auto;
        position: relative;
    }
}
</style>
