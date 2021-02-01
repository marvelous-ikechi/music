import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomText from '../../shared/CustomText';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {CapitalizeFirstLetter} from '../../helpers/capitalize';
import CustomTextInput from '../../shared/CustomTextInput';
import CustomButton from '../../shared/CustomButton';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import verify from '../../action/verifyAccount';
import ErrorMessage from '../../component/ErrorMessage';

const AccountConfirmation = (props) => {
  const {navigation, verify, loading} = props;
  const backgroundImg = require('../../../assets/images/registerBackground.png');
  const backIcons = require('../../../assets/images/backIcon.png');

  const submitHandler = async (values, actions) => {
    const data = {
      token: values.otp,
    };
    console.log(data);
    await verify(data, navigation.navigate, actions);
  };

  const Formikform = () => (
    <Formik
      initialValues={{
        otp: '',
      }}
      onSubmit={(values, actions) => submitHandler(values, actions)}
      validationSchema={yup.object().shape({
        otp: yup.string().required(),
      })}>
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit,
      }) => (
        <View style={styles.formContainer}>
          {errors.general && (
            <ErrorMessage
              errorValue={errors.general ? errors.general : 'invalid otp'}
            />
          )}

          {touched.otp && errors.otp && (
             <ErrorMessage
             errorValue={errors.otp ? errors.otp : 'invalid otp'}
           />
          )}
          <CustomTextInput
            value={values.otp}
            onChangeText={handleChange('otp')}
            onBlur={() => setFieldTouched('otp')}
            placeholder="Enter Otp"
            isError={errors.otp || errors.general ? true : false}
          />

          <CustomButton
            title={'Continue'}
            disabled={!isValid}
            onPress={handleSubmit}
            isLoading={loading}
          />
        </View>
      )}
    </Formik>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImg} style={styles.image}>
        {/* arrow section */}
        <TouchableOpacity
          style={styles.firstLevelContainer}
          onPress={() => navigation.goBack()}>
          <Image source={backIcons} style={styles.backIconsStyle}></Image>
        </TouchableOpacity>
        {/* logo section */}

        {/* text Section */}

        <View style={styles.secondLevelContainer}>
          <CustomText
            color={colors.white}
            size={30}
            capitalize={'none'}
            fontType={fonts.nunitoBold}>
            {CapitalizeFirstLetter('Confirm Account')}
          </CustomText>
          <CustomText
            color={colors.white}
            size={17}
            capitalize={'none'}
            fontType={fonts.nunitoLight}>
            {CapitalizeFirstLetter(
              'An otp has been sent to your mail please check and input here',
            )}
          </CustomText>
        </View>
        <View style={styles.thirdLevelContainer}>
          {Formikform () }
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

AccountConfirmation.propTypes = {
  verify: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.pendingState.pending,
});

export default connect(mapStateToProps, {verify})(AccountConfirmation);

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    top: 0,
  },
  formContainer: {
    paddingLeft: 20,
    marginTop: 100,
    marginLeft: 10,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  backIconsStyle: {
    height: 20,
    width: 25,
  },
  firstLevelContainer: {
    marginTop: height * 0.05,
    display: 'flex',
    marginLeft: 20,
  },
  secondLevelContainer: {
    marginTop: height * 0.1,
    display: 'flex',
    marginLeft: 35,
  },
  thirdLevelContainer: {
    top: height * 0.01,
  },
  fourthLevelContainer: {
    top: height * 0.04,
    display: 'flex',
    alignItems: 'center',
    marginLeft: -10,
  },

  imageContainer: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPassword: {
    display: 'flex',
  },
  gotoRegister: {
    display: 'flex',
    marginTop: 40,
    marginLeft: 20,
  },
});
