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

async function query(status) {
    try {
        const criteria = _buildCriteria(status)
        const collection = await dbService.getCollection(COLLECTION_GAME)
        let games = await collection.find(criteria).toArray()
        games = games.slice(0, 3)
        return games
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }
}

async function getById(gameId) {
    try {
        const collection = await dbService.getCollection(COLLECTION_GAME)
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

function _buildCriteria(status) {
    let criteria = {}
    criteria.$or = [{ 'status': status }]
    return criteria;
}

