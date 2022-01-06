const wordService = require('./word.service')
const logger = require('../../services/logger.service')

module.exports = {
    getLevels,
    getWords,
}

async function getWords(req, res) {
    try {
        const { level } = req.params
        const words = await wordService.query(level)
        res.send(words)
    } catch (err) {
        logger.error('Failed to get words', err)
        res.status(500).send({ err: 'Failed to get words' })
    }
}

async function getLevels(req, res) {
    try {
        const levels = await wordService.getLevels()
        res.send(levels)
    } catch (err) {
        logger.error('Failed to get levels', err)
        res.status(500).send({ err: 'Failed to get levels' })
    }
}

