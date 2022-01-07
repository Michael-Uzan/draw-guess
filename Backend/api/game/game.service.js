const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')

const ObjectId = require('mongodb').ObjectId
const COLLECTION_GAME = 'game'

module.exports = {
    query,
    getById,
    remove,
    save
}

async function query(userId) {
    try {
        const criteria = _buildCriteria(userId)
        const collection = await dbService.getCollection(COLLECTION_GAME)
        const boards = await collection.find(criteria).toArray()
        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }
}

async function getById(gameId) {
    try {
        const collection = await dbService.getCollection(COLLECTION_GAME)
        // const game = collection.findOne({ '_id': gameId })
        const game = collection.findOne({ '_id': ObjectId(gameId) })
        return game
    } catch (err) {
        logger.error(`while finding game ${gameId}`, err)
        throw err
    }
}



async function remove(boardId) {
    try {
        const collection = await dbService.getCollection(COLLECTION_GAME)
        await collection.deleteOne({ '_id': ObjectId(boardId) })
        return boardId
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}

async function save(game) {
    // console.log('game', game)
    if (game._id) {
        const { status, rounds, user1, user2 } = game
        let savedGame
        savedGame = {
            _id: ObjectId(game._id),
            status,
            rounds,
            user1,
            user2
        }
        try {
            const collection = await dbService.getCollection(COLLECTION_GAME)
            await collection.updateOne({ "_id": ObjectId(game._id) }, { $set: savedGame })
            // await collection.updateOne({ "_id": ObjectId(game._id) }, { $set: { ...game } })
            return game
        } catch (err) {
            logger.error(`cannot update game`, err)
            throw err
        }
    } else {
        try {
            const collection = await dbService.getCollection(COLLECTION_GAME)
            await collection.insertOne(game)
            return game
        } catch (err) {
            logger.error('cannot add game', err)
            throw err
        }
    }

}

function _buildCriteria(userId) {
    let criteria = {}
    criteria.$or = [{ 'boardMembers._id': userId.userId }, { 'createdBy': null }]
    return criteria;
}

