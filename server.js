const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:8080']
    }
});

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

http.listen(3002, () => {
    console.log('listening on *:3002');
});