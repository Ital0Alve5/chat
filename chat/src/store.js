import {
    reactive
} from 'vue'

const colors = [
        '#F44336',
        '#E91E63',
        '#F50057',
        '#C51162',
        '#EA80FC',
        '#9575CD',
        '#B388FF',
        '#3F51B5',
        '#0091EA',
        '#00B8D4',
        '#00897B',
        '#00BFA5',
        '#69F0AE',
        '#558B2F',
        '#9E9D24',
        '#827717',
        '#AEEA00',
        '#FFEB3B',
        '#FF9100',
        '#FF5722',
        '#D84315',
        '#BF360C',
        '#FF9E80',
        '#FF6E40',
        '#DD2C00',
        '#BCAAA4',
        '#A1887F',
        '#8D6E63',
        '#795548',
        '#9E9E9E',
        '#E0E0E0',
        '#616161',
        '#CFD8DC',
        '#B0BEC5',
        '#607D8B',
        '#546E7A',
        '#000000',
    ];
    
const randomCOlor = colors[Math.floor(Math.random() * colors.length)]

export const store = reactive({
    user: '',
    connected: false,
    typing: false,
    othersAreTyping: false,
    messages: [],
    setMessages(message) {
        message.color = randomCOlor
        this.messages.push(message)
    }
})
