<template>
  <div>
    <user-modal v-if="openModal"></user-modal>
    <Card v-else />
  </div>
</template>

<script>
import Card from './components/Card.vue';
import UserModal from './components/UserModal.vue';
import { store } from '@/store'
import SocketioService from '@/services/socketio.service';

export default {
  name: 'App',
  components: {
    Card,
    UserModal
  },
  data() {
    return {
      store,
      openModal: false,
      gotUserName: false,
    }
  },
  async mounted() {
    if (localStorage.getItem('user')) {
      this.store.user = localStorage.getItem('user')
      this.store.connected = true
      this.openModal = false
      this.gotUserName = true
      return
    }
    this.openModal = true
    this.gotUserName = false
  },
  methods: {
    connect() {
      SocketioService.setupSocketConnection()
    },
    previousMessages() {
      SocketioService.previousMessages(this.store)
    },
    listenMessages() {
      SocketioService.listenForMessages(this.store)
    },
    listenTyping() {
      SocketioService.getTyping(this.store)
    },
    async emitTyping() {
      await SocketioService.setTyping(this.store)
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
  },
  watch: {
    'store.connected': function (userConnection) {
      if (userConnection) {
        this.connect()
        this.previousMessages()
        this.listenMessages()
        this.listenTyping()
        this.store.user = localStorage.getItem('user')
        SocketioService.registerUser(this.store.user)
        this.store.setMessages({
          user: this.store.user,
          status: 'is on',
        })
        SocketioService.emitMessage({
          user: this.store.user,
          status: 'is on',
        })

        this.openModal = false
        this.gotUserName = true
        return
      }
      this.openModal = true
      this.gotUserName = false

    },

    'store.typing': async function (valueTyped) {
      await this.emitTyping(valueTyped)
    },
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.card {
  width: 70%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 70%;
}
</style>
