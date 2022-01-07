// const asyncLocalStorage = require('./als.service');
const { Socket } = require('socket.io');
const logger = require('./logger.service');

var gIo = null
function connectSockets(http, session) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST']
        }
    })
    const sharedSession = require('express-socket.io-session')
    gIo.use(sharedSession(session, {
        autoSave: true
    }))

    gIo.on('connection', socket => {
        console.log('New socket', socket.id)
        socket.on('disconnect', socket => {
            console.log('Someone disconnected')
        })
        // socket.on('user-watch', userId => {
        //     socket.join('watching:' + userId)
        // })
        // socket.on('set-user-socket', userId => {
        //     logger.debug(`Setting (${socket.id}) socket.userId = ${userId}`)
        //     socket.userId = userId
        // })
        // socket.on('unset-user-socket', () => {
        //     delete socket.userId
        // })
        socket.on('gameId', gameId => {
            console.log('gameId', gameId)
            if (socket.myTopic === gameId) return;
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(gameId)
            socket.myTopic = gameId;
        })
        socket.on('update-draw', () => {
            console.log('Emitting update draw');
            socket.broadcast.to(socket.myTopic).emit('draw-updated')
        })
        socket.on('route-change', (route) => {
            console.log('Emitting route change');
            socket.broadcast.to(socket.myTopic).emit('route-changed', route)
        })
        socket.on('game-finish', () => {
            console.log('Emitting game finish');
            socket.broadcast.to(socket.myTopic).emit('game-finished')
        })
    })
}

function emitTo({ type, data, label }) {
    if (label) gIo.to('watching:' + label).emit(type, data)
    else gIo.emit(type, data)
}

async function emitToUser({ type, data, userId }) {
    logger.debug('Emiting to user socket: ' + userId)
    const socket = await _getUserSocket(userId)
    if (socket) socket.emit(type, data)
    else {
        console.log('User socket not found');
        _printSockets();
    }
}

// Send to all sockets BUT not the current socket 
async function broadcast({ type, data, room = null, userId }) {
    console.log('BROADCASTING', JSON.stringify(arguments));
    const excludedSocket = await _getUserSocket(userId)
    if (!excludedSocket) {
        logger.debug('Shouldnt happen, socket not found')
        _printSockets();
        return;
    }
    logger.debug('broadcast to all but user: ', userId)
    if (room) {
        excludedSocket.broadcast.to(room).emit(type, data)
    } else {
        excludedSocket.broadcast.emit(type, data)
    }
}

module.exports = {
    connectSockets,
    emitTo,
    emitToUser,
    broadcast,
}



