import customRequest from '../shared/CustomRequest';

import * as actionType from '../redux/event/type';
import { Alert } from 'react-native';

export default addEvent = (userDetails, navigation, setEventTitle, setEndTime, setStartTime, setLocation, setErrorMessage) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_EVENTS_REQUEST,
    });
    await customRequest
      .post('event', userDetails)
      .then( async(res) => {
         console.log("inside first action", res.data);
         await customRequest
      .get('event')
      .then((res) => {
        console.log("inside second action", res.data);
        Alert.alert("Event Successfully added, check upcoming events");
        setEventTitle(" ");
        setEndTime(" ");
        setStartTime(" ");
        setLocation(" ");
        dispatch({
          type: actionType.GET_EVENTS_SUCCESS,
          payload: res.data.data
        });
        navigation('UpcomingEvent');
      });
        // dispatch({
        //   type: actionType.GET_EVENTS_STOPLOADING,
        // });
        // 
      });
  } catch (error) {
    if(error.response){
      setErrorMessage(error.response.data.message);
      dispatch({
        type: actionType.GET_EVENTS_FAILURE,
        payload: error.response.data.message
      });
    }else if (error.request){
      setErrorMessage(error.request);
      console.log(error.request);
      dispatch({
        type: actionType.GET_EVENTS_FAILURE,
        payload: error.request
      });
    }else {
      setErrorMessage(error.message);
      dispatch({
        type: actionType.GET_EVENTS_FAILURE,
        payload: error.message
      });
      console.log(error.message);
    }
    
  }
};
