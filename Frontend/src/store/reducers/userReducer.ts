import IUser from "../../interface/IUser.interfacets";

const initialState: UserState = {
  loggedinUser: null
}

export function userReducer(state: UserState = initialState, action: UserAction) {
  var newState = state;
  switch (action.type) {
    case 'SET_USER':
      newState = { ...state, loggedinUser: action.user }
      break;
    default:
  }
  return newState;
}

interface UserAction {
  user: IUser,
  type: string
}

export interface UserState {
  loggedinUser: IUser | null,
}