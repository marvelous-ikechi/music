import customRequest from '../shared/CustomRequest';
import * as actionType from '../redux/request/types';


// get event for admin
export const getRequestSuperUser = (id) => async (dispatch) => {
    // console.log("event+id___", id )
  try {
    dispatch({
      type: actionType.SUPER_MUSIC_REQUEST,
    });
    await customRequest
      .get('music/request/super', {params: {event_id : id}})
      .then((res) => {
        dispatch({
          type: actionType.SUPER_MUSIC_SUCCESS,
          payload: res.data.data
        });
      });
  } catch (error) {
    dispatch({
      type: actionType.SUPER_MUSIC_FAILURE,
      payload:error.response.data.message
    });
    console.log('error super admin ', error.response.data);
  }
};

