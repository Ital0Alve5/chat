const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const socket = require('http').createServer(app);
const http = require('http').createServer(app);
require('dotenv').config()

const webPort = process.env.PORT || 5000

const io = require('socket.io')(socket, {
    cors: {
        origins: [
            `https://localhost:${webPort}`,
            `http://localhost:${webPort}`,
            `http://0.0.0.0:${webPort}`,
            `https://0.0.0.0:${webPort}`,
            `https://italochat.herokuapp.com/`,
            `http://italochat.herokuapp.com/`
        ]
    }
});

app.use(express.static(__dirname + '/chat/dist'));

app.get('/', (_req, res) => {
    res.sendFile(__dirname + '/chat/dist/index.html');
})

http.listen(webPort, () => {
    console.log(`port: ${webPort}`)
    console.log('https://italochat.herokuapp.com:')
})

let messages = []
let users = []

io.on('connection', (socket) => {
    console.log('new user connected: ' + socket.id);

    socket.emit('previousMessages', messages)

    socket.on('typing', value => {
        socket.broadcast.emit('typing', value)
    })


    socket.on('checkIfUserExists', value => {
        let check = users.filter(userData => {
            if (userData.user == value) {
                return userData
            }
        })

        if (check.length > 0) {
            socket.emit('checkIfUserExists', true)
        } else {
            socket.emit('checkIfUserExists', false)
        }
    })

    socket.on('registerUser', value => {
        let removeUser = users.filter(userData => {
            if (userData.id !== socket.id) {
                return userData
            }
        })
        users = removeUser
        users.push({
            user: value,
            id: socket.id
        })
    })

    socket.on('disconnect', () => {
        let removeUser = users.filter(userData => {
            if (userData.id !== socket.id) {
                return userData
            }
        })
        users = removeUser
    });


    socket.on('sendMessage', value => {
        messages.push(value)
        socket.broadcast.emit('receivedMessage', value)
    })
});

socket.listen(3002, () => {
    console.log(`listening on *:${3002}`);
})