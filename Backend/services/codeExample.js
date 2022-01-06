//Frontend in boardApp cmp
componentDidMount() {
    const { boardId } = this.props.match.params
    this.props.loadBoard(boardId);
    socketService.emit('boardId', boardId);
    socketService.on('board updated', board => {
        this.props.loadBoard(board._id)
    })
    socketService.on('sending notification', (isNotif) => {
        this.props.setNotif(isNotif)
    })
}


//Frontend in board.actions 
export function updateBoard(board, action = null, card = '', txt = '') {
    return async dispatch => {
        try {
            if (action) {
                var activity = _storeSaveActivity(action, card, txt);
                board.activities.unshift(activity);
            }
            dispatch({ type: 'UPDATE_BOARD', board: { ...board } });
            await boardService.save(board);
            dispatch({ type: 'UPDATE_LAST_UPDATED_BOARD' });
            socketService.emit('update-board', board);
        } catch (err) {
            dispatch({ type: 'UNDO_UPDATE_BOARD' });
            showErrorMsg('Sorry cannot update board')
        }
    }
}

//Backend
socket.on('update-board', board => {
    socket.broadcast.to(socket.boardId).emit('board updated', board)
    if (board.activities[0].isNotif) {
        socket.broadcast.to(socket.boardId).emit('sending notification', true)
    }

})

