import customRequest from '../shared/CustomRequest';
import {AdminGetEvent} from '../action/getEvent'

import * as actionType from '../redux/event/type';

export default deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_EVENTS_REQUEST,
    });
    await customRequest
      .delete(`event`, {params: {event_id : id}})
      .then((res) => {
            
        dispatch({
          type: actionType.GET_EVENTS_STOPLOADING,
        });
      });
  } catch (error) {
    dispatch({
      type: actionType.GET_EVENTS_FAILURE,
    });
    // console.log(error);
  }
};
