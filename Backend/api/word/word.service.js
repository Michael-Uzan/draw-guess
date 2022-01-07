const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getLevels,
}

const COLLECTION_WORDS = 'words'

async function query(level) {
    try {
        const collection = await dbService.getCollection(COLLECTION_WORDS)
        const words = await collection.find().toArray()
        const wordsByLevel = words[0][level]
        return _getRandomWords(wordsByLevel)
    } catch (err) {
        logger.error('cannot find words', err)
        throw err
    }
}
async function getLevels() {
    try {
        const collection = await dbService.getCollection(COLLECTION_WORDS)
        let words = await collection.find().toArray()
        words = words[0]
        const levels = []
        for (const keyLevel in words) {
            if (keyLevel !== '_id') levels.push(keyLevel)
        }
        return levels
    } catch (err) {
        logger.error('cannot find levels', err)
        throw err
    }
}

function _getRandomWords(words) {
    words = _shuffle(words)
    return words.slice(0, 3)
}

function _shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = _getRandomInt(0, items.length);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function _getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive 
}




