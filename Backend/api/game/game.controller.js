const gameService = require('./game.service.js');
const logger = require('../../services/logger.service');

module.exports = {
  getGames,
  getGameById,
  addGame,
  removeGame,
  updateGame
}

async function getGames(req, res) {
  try {
    var { status } = req.query;
    const games = await gameService.query(status)
    res.json(games);
  } catch (err) {
    logger.error('Failed to get games', err)
    res.status(500).send({ err: 'Failed to get games' })
  }
}

async function getGameById(req, res) {
  try {
    const { gameId } = req.params;
    const game = await gameService.getById(gameId)
    res.json(game)
  } catch (err) {
    logger.error('Failed to get game', err)
    res.status(500).send({ err: 'Failed to get game' })
  }
}

async function addGame(req, res) {
  try {
    const { game } = req.body;
    const addedGame = await gameService.save(game)
    res.send(addedGame)
  } catch (err) {
    logger.error('Failed to add game', err)
    res.status(500).send({ err: 'Failed to add game' })
  }
}

async function updateGame(req, res) {
  try {
    const game = req.body
    const savedGame = await gameService.save(game)
    res.send(savedGame)
  } catch (err) {
    console.log(err)
    logger.error('Failed to update game', err)
    res.status(500).send({ err: 'Failed to update game' })
  }
}

async function removeGame(req, res) {
  try {
    const boardId = req.params.id;
    const removedId = await gameService.remove(boardId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove board', err)
    res.status(500).send({ err: 'Failed to remove board' })
  }
}


