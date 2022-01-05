import IUser from "../../interface/IUser.interfacets";

const initialState: UserState = {
  loggedInUser: null
}

export function userReducer(state: UserState = initialState, action: UserAction) {
  var newState = state;
  switch (action.type) {
    case 'SET_USER':
      newState = { ...state, loggedInUser: action.user }
      break;
    default:
  }
  return newState;
}

interface UserAction {
  user: IUser,
  type: string
}

interface UserState {
  loggedInUser: IUser | null,
}