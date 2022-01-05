const INITIAL_STATE = {
  game: null,
  roundIdx: 0 //game.rounds.length - 1
}

export function gameReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case 'SET_GAME':
      return {
        ...state,
        game: action.game,
        roundIdx: (action.game.rounds.length - 1) || 0
      }
    default:
      return state
  }
}