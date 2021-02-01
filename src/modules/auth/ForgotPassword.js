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
  Alert,
  ActivityIndicator,
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
import forgotPassword from '../../action/forgotPassword';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const ForgotPasswordScreen = (props) => {
  const {navigation, forgotPassword, loading} = props;
  const backgroundImg = require('../../../assets/images/registerBackground.png');
  const backIcons = require('../../../assets/images/backIcon.png');

  const submitHandler = async (values) => {
    const data = {
      email: values.email,
    };

    await forgotPassword(data, navigation.navigate);

    // Alert.alert(JSON.stringify(values));
  };

  const Formikform = () => (
    <Formik
      initialValues={{
        email: '',
      }}
      onSubmit={(values) => submitHandler(values)}
      validationSchema={yup.object().shape({
        email: yup.string().email().required(),
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
          {touched.email && errors.email && (
            <CustomText
              size={14}
              style={{margin: 10}}
              color={colors.red}
              capitalize={'none'}
              fontType={fonts.nunitoBold}>
              {errors.email}
            </CustomText>
          )}
          <CustomTextInput
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={() => setFieldTouched('email')}
            placeholder="Email"
          />
          {loading == true ? (
            <ActivityIndicator size="large" color={colors.orange} />
          ) : null}
          <CustomButton
            title={'Continue'}
            disabled={!isValid}
            onPress={handleSubmit}
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
            {CapitalizeFirstLetter('Forgot\n Password')}
          </CustomText>
          <CustomText
            color={colors.white}
            size={15}
            style={{marginLeft: 10}}
            capitalize={'none'}
            fontType={fonts.nunitoLight}>
            {CapitalizeFirstLetter(
              'Enter the email address associated \n with the account',
            )}
          </CustomText>
        </View>
        <View style={styles.thirdLevelContainer}>
          <Formikform />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

ForgotPasswordScreen.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.pendingState.pending,
});

export default connect(mapStateToProps, {forgotPassword})(ForgotPasswordScreen);

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
