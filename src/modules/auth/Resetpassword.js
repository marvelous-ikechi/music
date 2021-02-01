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
import CustomButton from '../../shared/CustomButton';
import resetPassword from '../../action/resetPassword';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ErrorMessage from '../../component/ErrorMessage';



const ResetPassword = (props) => {
  const {navigation, loading, resetPassword} = props;
  const backgroundImg = require('../../../assets/images/registerBackground.png');
  const backIcons = require('../../../assets/images/backIcon.png');
  const userLogoImage = require('../../../assets/images/hostLogo2.png');
  const facebookLogo = require('../../../assets/images/facebookIcon.png');
  const googleLogo = require('../../../assets/images/googleIcon.png');

  const submitHandler = async (values, actions) => {
    const data = {
      token: values.token,
      password: values.password,
    };
    console.log(data);
    await resetPassword(data, navigation.navigate, actions);
    // navigation.navigate('ForgotPassword');
    // Alert.alert(JSON.stringify(values));
  };

  const Formikform = () => (
    <Formik
      initialValues={{
        token: '',
        password: '',
      }}
      onSubmit={async (values, actions) => await submitHandler(values, actions)}
      validationSchema={yup.object().shape({
        token: yup
          .string()
          .required()
          .min(5)
          .max(10, 'Invalid Token.')
          .required(),
        password: yup
          .string()
          .min(4)
          .max(10, 'Password should not excced 10 chars.')
          .required(),
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

{
            errors.general && (<ErrorMessage errorValue={ errors.general ?  errors.general : 'Something went wrong'} />)
          }
          {
            errors.token && (<ErrorMessage errorValue={touched.token && errors.token ?  errors.token : 'invalid token'} />)
          }
         
          <CustomTextInput
            value={values.token}
            onChangeText={handleChange('token')}
            onBlur={() => setFieldTouched('token')}
            placeholder="token"
            isError={errors.token ? true : false}
          />

          {touched.password && errors.password && (
            <ErrorMessage errorValue={touched.password && errors.password ?  errors.password : 'invalid password'} />
          )}
          <CustomTextInput
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={() => setFieldTouched('password')}
            secureTextEntry
            placeholder="Password"
            isError={errors.password ? true : false}
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
            {CapitalizeFirstLetter('ResetPassword')}
          </CustomText>
          <CustomText
            color={colors.white}
            size={15}
            style={{marginLeft: 10}}
            capitalize={'none'}
            fontType={fonts.nunitoLight}>
            {CapitalizeFirstLetter('Enter the otp send\n to your mail')}
          </CustomText>
        </View>
        <View style={styles.thirdLevelContainer}>
          <Formikform />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.pendingState.pending,
});

export default connect(mapStateToProps, {resetPassword})(ResetPassword);
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
    marginTop: height * 0.05,
    display: 'flex',
    marginLeft: 20,
  },
  secondLevelContainer: {
    marginTop: height * 0.03,
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
  displayRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    width: width * 0.2,
  },
  socialLoginIconSize: {
    height: 30,
    width: 30,
  },
  imageSmall: {
    height: 80,
    width: 80,
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
