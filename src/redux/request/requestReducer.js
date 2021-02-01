import * as actionType from './types';
import moment from 'moment';
export const initialUserState = {
  musicRequest: [],
  isGoing: false,
  error:[]
};

export default function eventReducer(state = initialUserState, action) {
  switch (action.type) {
    case actionType.GET_MUSIC_REQUEST_SUCCESS:
      return {
        ...state,
        isGoing:action.payload
      };
    case actionType.GET_MUSIC_REQUEST_FAILURE:
      return {
        ...state,
        error:action.payload
      };
    default:
      return state;
  }
}