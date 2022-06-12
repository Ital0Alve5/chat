<template>
    <div class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <p v-if="erro.active" class="alert alert-danger" role="alert">
                    {{ erro.message }}
                </p>
                <div class="modal-body">
                    <form>
                        <input type="text" v-model="inputNick" placeholder="Set your nick" class="form-control">
                        <button @click.prevent="setUserName" class="btn btn-primary">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '@/store'
import SocketioService from '@/services/socketio.service';

export default {
    name: 'UserModal',
    data() {
        return {
            store,
            inputNick: '',
            erro: {
                active: false,
                message: ''
            }
        }
    },
    methods: {
        async setUserName() {
            if (this.inputNick.length > 0) {
                if (!(await this.checkIfUserExists())) {
                    this.connectUser()
                }
                return
            }
            this.setError('Não pode ser vazio.')

        },
        async checkIfUserExists() {
            SocketioService.setupSocketConnection()
            const userChecked = await SocketioService.checkUser(this.inputNick)
            SocketioService.disconnect()
            if (userChecked) {
                this.setError('Usuário já existe.')
                return true
            }
            return false
        },
        async connectUser() {
            localStorage.setItem('user', this.inputNick)
            this.store.connected = true
        },
        checkConnection() {
            return SocketioService.checkConnection()
        },
        setError(message) {
            this.erro.active = true
            this.erro.message = message
            setTimeout(() => {
                this.erro.active = false
                this.erro.message = ''
            }, 4000)
        }
    }
}
</script>

<style lang="scss">
.modal {
    display: block;
    background: rgba(0, 0, 0, 0.4);
}

.modal-content {
    p {
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }
}

.modal-body {
    form {
        display: flex;

        input {
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
        }

        button {
            padding: 10px 20px;
            font-weight: 800;
            border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;
        }
    }
}
</style>
