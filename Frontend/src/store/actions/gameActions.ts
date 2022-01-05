import IGame from "../../interface/IGame.interfacets";
import { gameService } from "../../services/game.service";

export function loadGame(gameId: string) {
  return async (dispatch: Function) => {
    try {
      const game = await gameService.getGame(gameId)
      dispatch({ type: 'SET_GAME', game })
    } catch (err) {
      console.log('canot load game ', err);
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
    } catch (err) {
      console.log('canot update draw ', err)
    }
  }
}

export function finishRound(game: IGame, roundIdx: number) {
  return async (dispatch: Function) => {
    try {
      const finishedGame = await gameService.finishRound(game, roundIdx)
      dispatch({ type: 'SET_GAME', game: finishedGame })
    } catch (err) {
      console.log('cannot finish game', err)
    }
  }

}

// export function setCurrRateImgs(rateProperties: IRateProperties) {
//   return (dispatch: Function) => {
//     dispatch({ type: 'SET_IMGS', rateProperties })
//   }
// }