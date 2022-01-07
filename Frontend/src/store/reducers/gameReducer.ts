import IGame from "../../interface/IGame.interfacets"

const INITIAL_STATE: GameState = {
  game: null,
  roundIdx: 0 //game.rounds.length - 1
}

export function gameReducer(state: GameState = INITIAL_STATE, action: GameAction) {
  switch (action.type) {
    case 'SET_GAME':
      return {
        ...state,
        game: action.game,
        roundIdx: action.game ? (action.game.rounds.length - 1) : 0
      }
    default:
      return state
  }
}

export interface GameAction {
  type: string
  game: IGame,
}

export interface GameState {
  game: IGame | null,
  roundIdx: number
}