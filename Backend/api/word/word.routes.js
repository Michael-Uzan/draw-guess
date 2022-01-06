const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getLevels, getWords } = require('./word.controller')
const router = express.Router()


router.get('/levels', getLevels)
router.get('/:level', getWords)

module.exports = router