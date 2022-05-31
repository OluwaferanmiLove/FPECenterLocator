import {
  LOADING,
  LOGIN,
  LOGOUT,
  ADD_BLOCK_DATA,
} from "./action.type";

export const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload,
        ...(action.payload === false && {triggerGet: Math.random()}),
      }
    case LOGIN:
      return {
        ...state,
        loggedin: true,
        user: action.payload,
      }
    case LOGOUT:
      return {
        ...state,
        loggedin: false,
        user: {},
      }
    case ADD_BLOCK_DATA:
      return {
        ...state,
        addBlockData: action.payload,
      }
    default:
      return state
  }
}