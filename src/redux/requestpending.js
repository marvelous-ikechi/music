import {getActionName} from '../helpers/helperReducer';

// setting global state for pending and loading

const pendingReducer = (state = {}, action) => {
  const {type} = action;
  const actionName = getActionName(type);

  if (!actionName) {
    return {
      ...state,
    };
  }

  if (type.endsWith('_REQUEST')) {
    return {
      ...state,
      pending: true,
    };
  }

  if (
    type.endsWith('_SUCCESS') ||
    type.endsWith('_FAILURE') ||
    type.endsWith('_STOPLOADING')
  ) {
    return {
      ...state,
      pending: false,
    };
  }

  return {
    ...state,
  };
};

export default pendingReducer;
