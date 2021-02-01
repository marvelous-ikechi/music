import {createLoadingActionType} from '../../helpers/helperReducer';

// create loading action
const createRequestActionType = createLoadingActionType('REQUEST');
const createSuccessActionType = createLoadingActionType('SUCCESS');
const createFailureActionType = createLoadingActionType('FAILURE');
const createStopLoadingActionType = createLoadingActionType('STOPLOADING');

// set the types
const GET_EVENTS = 'GET_EVENTS';
// const REG_USER_TYPE = 'REG_USER';
// create request type
export const GET_EVENTS_REQUEST = createRequestActionType(GET_EVENTS);
export const GET_EVENTS_SUCCESS = createSuccessActionType(GET_EVENTS);
export const GET_EVENTS_FAILURE = createFailureActionType(GET_EVENTS);
export const GET_EVENTS_STOPLOADING = createStopLoadingActionType(
  GET_EVENTS,
);
