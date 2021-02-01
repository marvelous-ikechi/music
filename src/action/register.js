import customRequest from '../shared/CustomRequest';

import * as actionType from '../redux/user/type';

export const register = (userDetails, navigation, actions) => async (dispatch) => {
  console.log(userDetails);
  try {
    dispatch({
      type: actionType.GET_USERS_REQUEST,
    });
    await customRequest.post('join', userDetails).then((res) => {
      // console.log(res);
      dispatch({
        type: actionType.GET_USERS_STOPLOADING,
      });
      navigation('AccountConfirm');
    });
  } catch (error) {
    actions.setFieldError('general', error.response.data.message )
    dispatch({
      type: actionType.GET_USERS_FAILURE,
    });
    console.log(error.response.data.message);
  }finally{
    actions.setSubmitting(false);
  }

};
