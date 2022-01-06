const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')

const ObjectId = require('mongodb').ObjectId

async function query(userId) {
    try {
        const criteria = _buildCriteria(userId)
        const collection = await dbService.getCollection('board')
        const boards = await collection.find(criteria).toArray()
        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }
}

async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = collection.findOne({ '_id': ObjectId(boardId) })
        return board
    } catch (err) {
        logger.error(`while finding board ${boardId}`, err)
        throw err
    }
}



async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.deleteOne({ '_id': ObjectId(boardId) })
        return boardId
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}

async function save(board) {
    const { boardTitle, createdBy, boardStyle, covers, labels, boardMembers, lists, activities } = board;
    let savedBoard;
    if (board._id) {
        try {
            savedBoard = {
                _id: ObjectId(board._id),
                boardTitle,
                createdBy,
                boardStyle,
                covers,
                labels,
                boardMembers,
                lists,
                activities: activities.slice(0, 20) //Avoiding Data leak - Board Object too large
            }
            const collection = await dbService.getCollection('board')
            await collection.updateOne({ "_id": savedBoard._id }, { $set: { ...savedBoard } })
            return savedBoard
        } catch (err) {
            logger.error(`cannot update board`, err)
            throw err
        }
    } else {
        try {
            const collection = await dbService.getCollection('board')
            await collection.insertOne(board)
            return board
        } catch (err) {
            logger.error('cannot add board', err)
            throw err
        }
    }

}


function _buildCriteria(userId) {
    let criteria = {}
    criteria.$or = [{ 'boardMembers._id': userId.userId }, { 'createdBy': null }]
    return criteria;
}

module.exports = {
    query,
    getById,
    remove,
    save
}
