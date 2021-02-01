import customRequest from '../shared/CustomRequest';
import * as actionType from '../redux/user/type';

export default resetPassword = (userDetails, navigation, actions) => async (
  dispatch,
) => {
  console.log(userDetails);
  try {
    dispatch({
      type: actionType.GET_USERS_REQUEST,
    });
    await customRequest.post('reset', userDetails).then((res) => {
      console.log(res.data);
      dispatch({
        type: actionType.GET_USERS_STOPLOADING,
      });
      navigation('Login');
    });
  } catch (error) {
    actions.setFieldError('general', error.response.data.message )
    dispatch({
      type: actionType.GET_USERS_FAILURE,
    });
    console.log(error);
  }finally{
    actions.setSubmitting(false);
  }
};
