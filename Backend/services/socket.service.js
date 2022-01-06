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
        socket.on('user-watch', userId => {
            socket.join('watching:' + userId)
        })
        socket.on('set-user-socket', userId => {
            logger.debug(`Setting (${socket.id}) socket.userId = ${userId}`)
            socket.userId = userId
        })
        socket.on('unset-user-socket', () => {
            delete socket.userId
        })
        socket.on('boardId', boardId => {
            if (socket.myTopic === boardId) return;
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(boardId)
            socket.myTopic = boardId;
        })
        socket.on('update-board', board => {
            console.log('Emitting update board', board.boardTitle);
            socket.broadcast.to(socket.myTopic).emit('board updated', board) //CHECKING TEST
            if (board.activities[0].isNotif === 'new-notif') {
                console.log('sending notif from backend')

                socket.broadcast.to(socket.myTopic).emit('sending notification', true)
            }

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

async function _getBoardSockets(boardId, userId) {
    let sockets = await _getAllSockets();
    console.log(userId);
    console.log('board', boardId);
    return sockets.filter(s => {
        console.log(s.userId === userId);
        return s.myTopic == boardId && s.userId !== userId
    })

}

async function _getUserSocket(userId) {
    const sockets = await _getAllSockets();
    const socket = sockets.find(s => s.userId == userId)
    return socket;
}
async function _getAllSockets() {
    // return all Socket instances
    const sockets = await gIo.fetchSockets();
    return sockets;
}

async function _printSockets() {
    const sockets = await _getAllSockets()
    console.log(`Sockets: (count: ${sockets.length}):`)
    sockets.forEach(_printSocket)
}
function _printSocket(socket) {
    console.log(`Socket - socketId: ${socket.id} userId: ${socket.userId}`)
}

module.exports = {
    connectSockets,
    emitTo,
    emitToUser,
    broadcast,
}



