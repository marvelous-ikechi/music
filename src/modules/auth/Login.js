import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomText from '../../shared/CustomText';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {CapitalizeFirstLetter} from '../../helpers/capitalize';
import CustomTextInput from '../../shared/CustomTextInput';
import ErrorMessage from '../../component/ErrorMessage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CustomButton from '../../shared/CustomButton';
import {login} from '../../action/login';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const LoginScreen = (props) => {
  const {navigation, loading, login} = props;
  const backgroundImg = require('../../../assets/images/registerBackground.png');
  const backIcons = require('../../../assets/images/backIcon.png');
  const userLogoImage = require('../../../assets/images/hostLogo2.png');
  const facebookLogo = require('../../../assets/images/facebookIcon.png');
  const googleLogo = require('../../../assets/images/googleIcon.png');


  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required()
      .min(4)
      .max(50, 'Name should not excced 50 chars.')
     
      .required(),
    password: yup
      .string()
      .min(6)
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,20}$/,
        'password must be have one uppercase,lowercase and one Digit',
      )
      .max(18, 'Password should not excced 18 chars.')
      .required(),
  });

  const submitHandler = async (values, actions) => {
    const {name, password} = values
    const data = {
      username: name,
      password: password,
    };
    console.log("data", data);
      await login(data, navigation.navigate, actions)
       

    // try {
    //   await login(data, navigation.navigate);
    // } catch (error) {
    //   actions.setFieldError('general', error.message);
    // } finally {
    //   actions.setSubmitting(false);
    // }
    
  };

  const Formikform = () => (
    <Formik
      initialValues={{
        name: '',
        password: '',
      }}
      onSubmit={ (values, actions) =>  submitHandler(values, actions)}
      validationSchema={validationSchema}>
      {({
        values,
        handleChange,
        errors,
        touched,
        handleBlur,
        isValid,
        isSubmitting,
        handleSubmit,
      }) => (
        <View style={styles.formContainer}>
          {
            errors.general && (<ErrorMessage errorValue={errors.general ? errors.general : 'Invalid details' } />)
          }
          {
            errors.name && (<ErrorMessage errorValue={touched.name && errors.name ?  errors.name : 'invalid name'} />)
          }
          
          <CustomTextInput
            value={values.email}
            onChangeText={handleChange('name')}
            onBlur={() => handleBlur('name')}
            placeholder="Username"
            isError={errors.name || errors.general ? true : false}
          />
          {
            errors.password && (<ErrorMessage errorValue={touched.password && errors.password ? errors.password : 'invalid password'} />)
          }
          
          <CustomTextInput
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={() => handleBlur('password')}
            secureTextEntry
            placeholder="Password"
            isError={errors.password || errors.general ? true : false}
          />
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <CustomText
              color={colors.white}
              size={15}
              style={{alignSelf: 'flex-end', left: -70}}
              capitalize={'none'}
              weight={'bold'}
              fontType={fonts.nunitoLight}>
              Forgot Password ?
            </CustomText>
          </TouchableOpacity>
         
          <CustomButton
            title={'Continue'}
            disabled={!isValid || isSubmitting}
            onPress={handleSubmit}
            isLoading={loading || isSubmitting}
          />
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <CustomText
              color={colors.white}
              size={15}
              style={{alignSelf: 'center', left: -10}}
              capitalize={'none'}
              fontType={fonts.nunitoLight}>
              Login Via OTP
            </CustomText>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImg} style={styles.image}>
        {/* arrow section */}
        {/* <TouchableOpacity
          style={styles.firstLevelContainer}
          onPress={() => navigation.goBack()}>
          <Image source={backIcons} style={styles.backIconsStyle}></Image>
        </TouchableOpacity> */}
        {/* logo section */}
        <View style={styles.imageContainer}>
          <Image
            source={userLogoImage}
            style={styles.imageSmall}
            tintColor={colors.orange}></Image>
          <CustomText
            size={35}
            color={colors.orange}
            fontType={fonts.nunitoExtraBold}
            capitalize={'uppercase'}>
            Monkey
          </CustomText>
          <CustomText
            size={35}
            color={colors.orange}
            fontType={fonts.nunitoLight}
            capitalize={'uppercase'}>
            Music
          </CustomText>
        </View>
        {/* text Section */}

        <View style={styles.secondLevelContainer}>
          <CustomText
            color={colors.white}
            size={30}
            capitalize={'none'}
            fontType={fonts.nunitoBold}>
            {CapitalizeFirstLetter('Sign In')}
          </CustomText>
        </View>
        <View style={styles.thirdLevelContainer}>
          {Formikform()}
        </View>
        <View style={styles.fourthLevelContainer}>
          <CustomText
            color={colors.white}
            size={14}
            capitalize={'none'}
            fontType={fonts.nunitoLight}>
            or sign in with
          </CustomText>
          <View style={styles.displayRow}>
            <Image
              source={facebookLogo}
              style={styles.socialLoginIconSize}></Image>
            <Image
              source={googleLogo}
              style={styles.socialLoginIconSize}></Image>
          </View>
        </View>
        <TouchableOpacity
          style={styles.gotoRegister}
          onPress={() => navigation.navigate('Onboarding')}>
          <CustomText
            color={colors.white}
            size={15}
            style={{alignSelf: 'center', left: -10}}
            capitalize={'none'}
            fontType={fonts.nunitoLight}>
            New User ? Create an account
          </CustomText>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

LoginScreen.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.pendingState.pending,
});

export default connect(mapStateToProps, {login})(LoginScreen);
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    top: 0,
  },
  formContainer: {
    paddingLeft: 20,
    marginTop: 20,
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
    marginTop: hp(5),
    display: 'flex',
    marginLeft: 20,
  },
  secondLevelContainer: {
    marginTop: hp(0.3),
    display: 'flex',
    marginLeft: 35,
  },
  thirdLevelContainer: {
    top: hp(0.1),
  },
  fourthLevelContainer: {
    top: hp(2),
    display: 'flex',
    alignItems: 'center',
    marginLeft: -10,
  },
  displayRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    width: wp(20),
  },
  socialLoginIconSize: {
    height: hp(4),
    width: wp(8),
  },
  imageSmall: {
    height: 80,
    width: 80,
  },
  imageContainer: {
    marginTop: hp(2),
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
