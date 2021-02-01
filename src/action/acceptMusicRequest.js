import customRequest from '../shared/CustomRequest';
import * as actionType from '../redux/request/types';


// get event for admin
export const acceptMusicRequest = (detail) => async (dispatch) => {
    console.log("inside", detail);
  try {
    dispatch({
      type: actionType.SUPER_MUSIC_REQUEST,
    });
    await customRequest
      .post('music/request/super', detail)
      .then((res) => {
        dispatch({
          type: actionType.SUPER_MUSIC_STOPLOADING,
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

