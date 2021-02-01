// this is the user reducers
import * as actionType from './type';

export const initialUserState = {
  user: [],
};

export default function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case actionType.GET_USERS_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case actionType.GET_USERS_FAILURE:
      return {
        ...state,
        user:[]
      };
    default:
      return state;
  }
}
