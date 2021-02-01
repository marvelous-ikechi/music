import customRequest from '../shared/CustomRequest';

import * as actionType from '../redux/user/type';

export default createRequest = (userDetails) => async (dispatch) => {
  console.log(userDetails);
  try {
    dispatch({
      type: actionType.GET_USERS_REQUEST,
    });
    await customRequest
      .post('music/request', userDetails)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: actionType.GET_USERS_STOPLOADING,
        });
      });
  } catch (error) {
    dispatch({
      type: actionType.GET_USERS_FAILURE,
    });
    console.log(error);
  }
};
