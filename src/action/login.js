import customRequest from '../shared/CustomRequest';
import AsyncStorage from '@react-native-community/async-storage';

import * as actionType from '../redux/user/type';

export const login =  (userDetails, navigation, actions) => async (dispatch) => {
  // console.log(userDetails);
  dispatch({
    type: actionType.GET_USERS_REQUEST,
  });
  try {
    await customRequest.post('login', userDetails).then((res) => {
       console.log(res);
      inAsync('token', res.data.data.token);
      dispatch({
        type: actionType.GET_USERS_SUCCESS,
        payload: res.data.data.user,
      });
      navigation('Dashboards');
    });
  } catch (error) {
    console.log("error", error.response.data)
     actions.setFieldError('general', error.response.data.message )
    dispatch({
      type: actionType.GET_USERS_FAILURE,
    });
    // console.log(error.response.data);
  }
};

export const inAsync = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('something went wrong');
  }
};
