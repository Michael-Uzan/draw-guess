const express = require('express');
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware');
const { log } = require('../../middlewares/logger.middleware');
const { getBoards, getBoardById, addBoard, removeBoard, updateBoard} = require('./board.controller')
const router = express.Router();


router.get('/',log, getBoards);
router.get('/:id', getBoardById)
router.post('/',requireAuth, addBoard)
router.put('/:id',requireAuth ,updateBoard)
router.delete('/:id' , removeBoard)

module.exports = router;