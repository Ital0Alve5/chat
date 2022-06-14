const express = require('express')
const app = express()
const socket = require('http').createServer(app);
const http = require('http').createServer(app);
require('dotenv').config()

const webPort = process.env.PORT || 80

const io = require('socket.io')(socket, {
    cors: {
        origins: [`${process.env.VUE_APP_HOST}:${webPort}`]
    }
});

app.use(express.static('./chat/dist'));

app.get('/', (_req, res) => {
    res.sendFile('./chat/dist/index.html');
});

http.listen(webPort, ()=>{
    console.log(`${process.env.VUE_APP_HOST}:${webPort}`)
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

const port = process.env.VUE_APP_SOCKET_PORT || 3002
socket.listen(port, () => {
    console.log(`listening on *:${port}`);
})