import * as actionType from './types';

export const initialUserState = {
  musicRequest: [],
  acceptedRequest:[],
  error:[]
};



export default function superRequestReducer(state = initialUserState, action) {
  switch (action.type) {
    case actionType.SUPER_MUSIC_SUCCESS:
      return {
        ...state,
        musicRequest:action.payload.filter(item => item.status === 0),
        acceptedRequest:action.payload.filter(item => item.status !== 0)
      };
    case actionType.SUPER_MUSIC_FAILURE:
      return {
        ...state,
        error:action.payload
      };
    default:
      return state;
  }
}