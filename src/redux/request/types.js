import {createLoadingActionType} from '../../helpers/helperReducer';

// create loading action
const createRequestActionType = createLoadingActionType('REQUEST');
const createSuccessActionType = createLoadingActionType('SUCCESS');
const createFailureActionType = createLoadingActionType('FAILURE');
const createStopLoadingActionType = createLoadingActionType('STOPLOADING');

// set the types
const GET_MUSIC_REQUEST = 'MUSIC_REQUESTS';
// const REG_USER_TYPE = 'REG_USER';
// create request type
export const GET_MUSIC_REQUEST_REQUEST = createRequestActionType(GET_MUSIC_REQUEST);
export const GET_MUSIC_REQUEST_SUCCESS = createSuccessActionType(GET_MUSIC_REQUEST);
export const GET_MUSIC_REQUEST_FAILURE = createFailureActionType(GET_MUSIC_REQUEST);
export const GET_MUSIC_REQUEST_STOPLOADING = createStopLoadingActionType(
  GET_MUSIC_REQUEST,
);


const SUPER_MUSIC = 'SUPER_MUSIC_REQUEST';
export const SUPER_MUSIC_REQUEST = createRequestActionType(SUPER_MUSIC);
export const SUPER_MUSIC_SUCCESS = createSuccessActionType(SUPER_MUSIC);
export const SUPER_MUSIC_FAILURE = createFailureActionType(SUPER_MUSIC);
export const SUPER_MUSIC_STOPLOADING = createStopLoadingActionType(
  SUPER_MUSIC,
);

