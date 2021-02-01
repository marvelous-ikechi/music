import {combineReducers} from 'redux';

// ## Generator Reducer Imports
import app from '../AppView';
import pendingReducer from './requestpending';
import userReducer from './user/userReducer';
import eventReducer from './event/eventReducer';
import superUserRequest from './request/superRequestReducer';

export default combineReducers({
  // ## Generator Reducers
  pendingState: pendingReducer,
  userState: userReducer,
  eventState:eventReducer,
  superUserRequest:superUserRequest
});
