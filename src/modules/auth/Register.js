import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
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
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from '../../action/register';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ErrorMessage from '../../component/ErrorMessage';


const RegisterScreen = (props) => {
  const {navigation, route, register, loading} = props;
  const backgroundImg = require('../../../assets/images/registerBackground.png');
  const backIcons = require('../../../assets/images/backIcon.png');
  const facebookLogo = require('../../../assets/images/facebookIcon.png');
  const googleLogo = require('../../../assets/images/googleIcon.png');

  const {userType} = route.params;

  const submitHandler = async (values, actions) => {
    const data = {
      email: values.email,
      name: values.name,
      password: values.password,
      account_type: userType,
    };
    console.log('before submiting', data);
    await register(data, navigation.navigate, actions);
  };

  const Formikform = () => (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      }}
      onSubmit={async (values, actions) => await submitHandler(values, actions)}
      validationSchema={yup.object().shape({
        email: yup.string().email().required(),
        password: yup
          .string()
          .min(6)
          .max(10, 'Password should not excced 10 chars.')
          .required()
          .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,20}$/,
            'password must contain atleast one uppercase,lowercase and min lenght of 6',
          ),
        name: yup
          .string()
          .min(4)
          .max(50, 'Name should not excced 50 chars.')
          .required(),
        passwordConfirmation: yup
          .string()
          .oneOf([yup.ref('password'), null], 'Passwords must match'),
      })}>
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        isSubmitting,
        handleSubmit,
       
      }) => (
        <View style={styles.formContainer}>
            {
            errors.general && (<ErrorMessage errorValue={ errors.general ?  errors.general : 'invalid name'} />)
          }
          {
            errors.name && (<ErrorMessage errorValue={touched.name && errors.name ?  errors.name : 'invalid name'} />)
          }
          <CustomTextInput
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={() => setFieldTouched('name')}
            placeholder="Name"
            isError={errors.name || errors.general ? true : false}
          />
          {touched.email && errors.email && 
           (<ErrorMessage errorValue={touched.email && errors.email ?  errors.email : 'invalid email'} />)
          }
          <CustomTextInput
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={() => setFieldTouched('email')}
            placeholder="Email"
            isError={errors.email || errors.general ? true : false}
          />

          {touched.password && errors.password && (
         <ErrorMessage errorValue={touched.password && errors.password ?  errors.password : 'weak password'} />
          )}
          <CustomTextInput
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={() => setFieldTouched('password')}
            secureTextEntry
            placeholder="Password"
            isError={errors.password || errors.general ? true : false}
          />

          {touched.passwordConfirmation && errors.passwordConfirmation && (
            <ErrorMessage errorValue={touched.passwordConfirmation && errors.passwordConfirmation ?  errors.passwordConfirmation : "Doesn't match "} />
          )}
          <CustomTextInput
            value={values.passwordConfirmation}
            onChangeText={handleChange('passwordConfirmation')}
            placeholder="Confirm Password"
            secureTextEntry
            onBlur={() => setFieldTouched('passwordConfirmation')}
            secureTextEntry={true}
            isError={errors.passwordConfirmation || errors.general ? true : false}
          />
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('Login')}>
            <CustomText
              color={colors.white}
              size={15}
              style={{alignSelf: 'flex-end', left: -70}}
              capitalize={'none'}
              weight={'bold'}
              fontType={fonts.nunitoLight}>
              Already has an account Login ?
            </CustomText>
          </TouchableOpacity>
           <CustomButton
            title={'Continue'}
            disabled={!isValid || isSubmitting}
            onPress={handleSubmit}
            isLoading={loading || isSubmitting}
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
        {/* text Section */}
        <View style={styles.secondLevelContainer}>
          <CustomText
            color={colors.white}
            size={30}
            capitalize={'none'}
            fontType={fonts.nunitoBold}>
            {CapitalizeFirstLetter('Create\nan account')}
          </CustomText>
          <CustomText
            color={colors.white}
            size={15}
            capitalize={'none'}
            fontType={fonts.nunitoLight}>
            {CapitalizeFirstLetter('Fill the details & create your account')}
          </CustomText>
        </View>
        <View style={styles.thirdLevelContainer}>
        <ScrollView
          style={styles.scrollviewContainer}>
          {Formikform()}
        </ScrollView>
        </View>
       
        <View style={styles.fourthLevelContainer}>
          <CustomText
            color={colors.white}
            size={12}
            style={{marginLeft: 10}}
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
      </ImageBackground>
    </SafeAreaView>
  );
};

RegisterScreen.propTypes = {
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.pendingState.pending,
  user: state.userState.user,
});

export default connect(mapStateToProps, {register})(RegisterScreen);
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    top: 0,
  },
  formContainer: {
    display: 'flex',
    marginBottom:hp(20),
    marginLeft:hp(5)
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
    marginTop: hp(5),
    display: 'flex',
    marginLeft: 25,
  },
  thirdLevelContainer: {
    top: hp(5),
    height: hp(60),
    marginBottom:hp(5)
  },
  fourthLevelContainer: {
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
    height: 30,
    width: 30,
  },
  forgotPassword: {
    display: 'flex',
  },
  errorsContainer: {
    display: 'flex',
    height: hp(3),
    width: wp(70),
    marginLeft: wp(3),
  },
});
