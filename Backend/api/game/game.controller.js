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
    var userId = req.query;
    const boards = await gameService.query(userId)
    res.json(boards);
  } catch (err) {
    logger.error('Failed to get boards', err)
    res.status(500).send({ err: 'Failed to get boards' })
  }
}

async function getGameById(req, res) {
  try {
    const { gameId } = req.params;
    console.log('gameId', gameId)
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
    // console.log('game', game)
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
    console.log('game', game)
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


function _filterBoard(filterBy, board) {
  const newFilterBy = JSON.parse(filterBy.filterBy)
  const filteredBoard = JSON.parse(JSON.stringify(board))

  if (!newFilterBy.isFilter) return board

  filteredBoard.lists.forEach(list => {
    list.cards = list.cards.filter(card => {
      const regex = new RegExp(newFilterBy.searchKey, 'i');

      let isMemberOnCard = true
      let isLabelsOnCard = true

      if (newFilterBy.members.length) {
        isMemberOnCard = newFilterBy.members.some(filterMember => card.cardMembers.some(cardMember => filterMember === cardMember._id))
      }

      if (newFilterBy.labels.length) {
        isLabelsOnCard = newFilterBy.labels.some(filterLabel => card.cardLabelIds.some(cardLabel => filterLabel === cardLabel))
      }

      const isTxtOnCard = regex.test(card.cardTitle)

      return isTxtOnCard && isMemberOnCard && isLabelsOnCard
    })
    filteredBoard.cardsCount += list.cards.reduce((acc, card) => {
      acc++
      return acc;
    }, 0)
  })
  return filteredBoard
}
