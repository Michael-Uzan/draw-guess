const express = require('express');
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware');
const { log } = require('../../middlewares/logger.middleware');
const { getGames, getGameById, addGame, removeGame, updateGame } = require('./game.controller')
const router = express.Router();


router.get('/', log, getGames);
router.get('/:gameId', getGameById)
router.post('/', addGame)
router.put('/:gameId', updateGame)
// router.post('/', requireAuth, addGame)
// router.put('/:id', requireAuth, updateGame)
// router.delete('/:id', removeGame)

module.exports = router;