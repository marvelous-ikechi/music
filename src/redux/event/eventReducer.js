import * as actionType from './type';
import moment from 'moment';
export const initialUserState = {
  event: [],
  passedEvent:[],
  upcomingEvent:[],
  error:''
};

// a function
const checkPassedEvent =(date) => {
  return moment(new Date((date * 1000))).isBefore(new Date());
}

const checkUpcomingEvent =(date) => {
    return moment(new Date((date * 1000))).isAfter(new Date());
}



export default function eventReducer(state = initialUserState, action) {
  switch (action.type) {
    case actionType.GET_EVENTS_SUCCESS:
      return {
        ...state,
        event: action.payload,
        passedEvent: action.payload.filter((item) => checkPassedEvent(item.end_time)),
        upcomingEvent: action.payload.filter((item) => checkUpcomingEvent(item.end_time)),
        error: ''
      };
    case actionType.GET_EVENTS_FAILURE:
      return {
        ...state,
        error:action.payload
      };
      case actionType.GET_EVENTS_STOPLOADING:
        return {
          ...state,
          error:" ",
        };
    default:
      return state;
  }
}