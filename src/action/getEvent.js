import customRequest from '../shared/CustomRequest';
import * as actionType from '../redux/event/type';

// get event for admin
export const AdminGetEvent = () => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_EVENTS_REQUEST,
    });
    await customRequest
      .get('event')
      .then((res) => {
        // console.log("from axios", res.data)
        dispatch({
          type: actionType.GET_EVENTS_SUCCESS,
          payload: res.data.data
        });
      });
  } catch (error) {
    dispatch({
      type: actionType.GET_EVENTS_FAILURE,
    });
    console.log('error', error.response.data);
  }
};


// get events for normal users

export default getEvent = (lat, long) => async (dispatch) => {
  const current_time= new Date().getTime();
  console.log( 'sending', lat , long, current_time);
  try {
    dispatch({
      type: actionType.GET_EVENTS_REQUEST,
    });
    await customRequest
      .get('event', {params:{ lat: lat, long:long, current_time: current_time}})
      .then((res) => {
        console.log("from axios", res.data.data)
        dispatch({
          type: actionType.GET_EVENTS_SUCCESS,
          payload: res.data.data
        });
      });
  } catch (error) {
    dispatch({
      type: actionType.GET_EVENTS_FAILURE,
      payload: error.response.data.message
    });
    console.log('error', error.response.data);
  }
};
