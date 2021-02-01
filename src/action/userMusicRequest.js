import customRequest from '../shared/CustomRequest';
 import * as actionType from '../redux/request/types';

// get event for admin
export const addUserRequest = (userDetails, navigation, actions) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_MUSIC_REQUEST_REQUEST,
    });
    await customRequest
      .post('music/request', userDetails)
      .then((res) => {
        console.log("from axios", res.data);
        dispatch({
          type: actionType.GET_MUSIC_REQUEST_SUCCESS,
          payload: true
        });
        navigation('Dashboards')
      });
  } catch (error) {
    actions.setFieldError('general', error.response.data.message)
    dispatch({
      type: actionType.GET_MUSIC_REQUEST_FAILURE,
    });
    console.log('error', error.response.data);
  }
};
