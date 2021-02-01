import {createLoadingActionType} from '../../helpers/helperReducer';

// create loading action
const createRequestActionType = createLoadingActionType('REQUEST');
const createSuccessActionType = createLoadingActionType('SUCCESS');
const createFailureActionType = createLoadingActionType('FAILURE');
const createStopLoadingActionType = createLoadingActionType('STOPLOADING');

// set the types
const GET_USERS_TYPE = 'GET_USERS';
// const REG_USER_TYPE = 'REG_USER';
// create request type
export const GET_USERS_REQUEST = createRequestActionType(GET_USERS_TYPE);
export const GET_USERS_SUCCESS = createSuccessActionType(GET_USERS_TYPE);
export const GET_USERS_FAILURE = createFailureActionType(GET_USERS_TYPE);
export const GET_USERS_STOPLOADING = createStopLoadingActionType(
  GET_USERS_TYPE,
);
