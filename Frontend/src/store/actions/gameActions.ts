import IGame from "../../interface/IGame.interfacets";
import IUser from "../../interface/IUser.interfacets";
import { eventBusService } from "../../services/event-bus.service";
import { gameService } from "../../services/game.service";
import { socketService } from "../../services/socket.service";

export function loadGame(gameId: string) {
  return async (dispatch: Function) => {
    try {
      const game = await gameService.getGame(gameId)
      dispatch({ type: 'SET_GAME', game })
    } catch (err) {
      console.log('canot load game ', err);
      eventBusService.showErrorMsg('Cannot load game!')
    }
  }
}

export function createNewGame(user: IUser, historyPush: Function) {
  return async (dispatch: Function) => {
    try {
      const game = await gameService.createNewGame(user)
      dispatch({ type: 'SET_GAME', game })
      historyPush(`/game/${game._id}/invite-login`)
      return game
    } catch (err) {
      console.log('cannot start a new game', err)
      eventBusService.showErrorMsg('Cannot create game!')
    }
  }
}

export function finishGame(game: IGame) {
  return async (dispatch: Function) => {
    try {
      await gameService.finishGame(game)
      dispatch({ type: 'SET_GAME', game: null })
      socketService.emit('game-finish')
    } catch (err) {
      console.log('cannot finish game', err)
      eventBusService.showErrorMsg('Cannot finish game!')
    }
  }
}

export function addUserToGame(game: IGame, user: IUser) {
  return async (dispatch: Function) => {
    try {
      const updatedGame = await gameService.addUserToGame(game, user)
      dispatch({ type: 'SET_GAME', game: updatedGame })
      socketService.emit('route-change', 'waiting-choose')
    } catch (err) {
      console.log('cannot add user to game', err)
      eventBusService.showErrorMsg('Cannot add start game!')
    }
  }
}

export function updateDraw(newGame: IGame, imgUrl: string, roundIdx: number) {
  return async (dispatch: Function) => {
    try {
      const gameCopy = JSON.parse(JSON.stringify(newGame))
      gameCopy.rounds[roundIdx].img = imgUrl
      const game = await gameService.updateGame(gameCopy)
      dispatch({ type: 'SET_GAME', game })
      socketService.emit('update-draw')
    } catch (err) {
      console.log('canot update draw ', err)
      eventBusService.showErrorMsg('Error update draw!')
    }
  }
}

export function finishRound(game: IGame, roundIdx: number, isVictory: boolean) {
  return async (dispatch: Function) => {
    try {
      const finishedGame = await gameService.finishRound(game, roundIdx, isVictory)
      dispatch({ type: 'SET_GAME', game: finishedGame })
      socketService.emit('route-change', 'waiting-choose')
    } catch (err) {
      console.log('cannot finish game', err)
      eventBusService.showErrorMsg('Error finish round!')
    }
  }
}

export function startNextRound(game: IGame, roundIdx: number, level: string, guessingWord: string) {
  return async (dispatch: Function) => {
    try {
      const updatedGame = await gameService.startNextRound(game, roundIdx, level, guessingWord)
      dispatch({ type: 'SET_GAME', game: updatedGame })
      socketService.emit('route-change', 'draw-guess')
    } catch (err) {
      console.log('cannot start next round ', err)
      eventBusService.showErrorMsg('Error start a new round!')
    }
  }
}
