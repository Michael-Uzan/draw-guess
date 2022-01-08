const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

const COLLECTION_USER = 'user'

module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
}

async function query(filterBy = {}) {
    try {
        const collection = await dbService.getCollection(COLLECTION_USER)
        const users = await collection.find().toArray()
        return users
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection(COLLECTION_USER)
        const user = await collection.findOne({ '_id': ObjectId(userId) })
        return user
    } catch (err) {
        logger.error(`while finding user ${userId}`, err)
        throw err
    }
}

async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection(COLLECTION_USER)
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        logger.error(`while finding user ${username}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection(COLLECTION_USER)
        await collection.deleteOne({ '_id': ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}

async function update(user) {
    try {
        const userToSave = {
            _id: ObjectId(user._id),
            username: user.username,
            img: user.img,
            points: user.points
        }
        const collection = await dbService.getCollection(COLLECTION_USER)
        await collection.updateOne({ '_id': ObjectId(user._id) }, { $set: userToSave })
        return user;
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
        throw err
    }

}


function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    return criteria
}


