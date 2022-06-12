import {
    reactive
} from 'vue'

export const store = reactive({
    user: '',
    connected: false,
    typing: false,
    othersAreTyping: false,
    messages: [],
    setMessages(message) {
        this.messages.push(message)
    }
})