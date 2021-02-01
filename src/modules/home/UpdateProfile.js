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
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomText from '../../shared/CustomText';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {CapitalizeFirstLetter} from '../../helpers/capitalize';
import CustomTextInput from '../../shared/CustomTextInput2';
import CustomButton from '../../shared/CustomButton';
import {color} from 'react-native-reanimated';
const UpdateProfileScreen = (props) => {
  const {navigation} = props;
  const backIcons = require('../../../assets/images/backIcon.png');
  const userLogoImage = require('../../../assets/images/userPic.png');

  const submitHandler = (values) => {
    const data = {
      name: values.name,
    }; // Alert.alert(JSON.stringify(values));
    // Alert.alert(JSON.stringify(values));

    console.log(data);
    navigation.navigate('ForgotPassword');
    // Alert.alert(JSON.stringify(values));
  };

  const Formikform = () => (
    <Formik
      initialValues={{
        name: '',
        bio: '',
      }}
      onSubmit={(values) => submitHandler(values)}
      validationSchema={yup.object().shape({
        name: yup.string().required().min(5),
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
          <CustomText
            color={colors.orange}
            size={20}
            capitalize={'none'}
            fontType={fonts.nunitoBold}>
            Your Name
          </CustomText>
          {touched.name && errors.name && (
            <CustomText
              size={14}
              style={{margin: 2}}
              color={colors.red}
              capitalize={'none'}
              fontType={fonts.nunitoBold}>
              {errors.name}
            </CustomText>
          )}
          <CustomTextInput
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={() => setFieldTouched('name')}
          />

          <CustomText
            color={colors.orange}
            size={20}
            capitalize={'none'}
            fontType={fonts.nunitoBold}>
            Bio
          </CustomText>
          {touched.bio && errors.bio && (
            <CustomText
              size={14}
              style={{margin: 2}}
              color={colors.red}
              capitalize={'none'}
              fontType={fonts.nunitoBold}>
              {errors.bio}
            </CustomText>
          )}
          <CustomTextInput
            value={values.bio}
            onChangeText={handleChange('bio')}
            onBlur={() => setFieldTouched('bio')}
          />

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
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 20}>
      <SafeAreaView>
        {/* arrow section */}
       

        <View style={styles.secondLevelContainer}>
          <CustomText
            color={colors.white}
            size={30}
            capitalize={'none'}
            fontType={fonts.nunitoBold}>
            {CapitalizeFirstLetter('Update \nyour profile')}
          </CustomText>
        </View>
        <View style={styles.thirdLevelContainer}>
          <Image source={userLogoImage} style={styles.imageSmall}></Image>
          <TouchableOpacity style={styles.imagePickIcons}></TouchableOpacity>
        </View>
        <View style={styles.fourthLevelContainer}>
          <Formikform />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default UpdateProfileScreen;
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.black,
  },
  formContainer: {
    paddingLeft: 20,
    marginTop: 20,
    marginLeft: 10,
  },

  backIconsStyle: {
    height: 20,
    width: 25,
  },
  firstLevelContainer: {
    flex: 1,
    display: 'flex',
    marginLeft: 20,
    marginTop: 40,
  },
  secondLevelContainer: {
    marginTop: height * 0.07,
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 40,
    flex: 1,
  },
  thirdLevelContainer: {
    marginTop: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60,
    backgroundColor: colors.white,
    width: 120,
    height: 120,
    marginLeft: 120,
    borderWidth: 2,
    borderColor: colors.orange,
    borderRadius: 75,
    flex: 1,
  },

  displayRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    width: width * 0.2,
  },
  imageSmall: {
    height: 120,
    width: 120,
    zIndex: 1,
  },
  imagePickIcons: {
    backgroundColor: colors.orange,
    height: 30,
    width: 30,
    position: 'absolute',
    top: height * 0.13,
    left: width * 0.25,
    zIndex: 2,
    borderRadius: 15,
  },
  fourthLevelContainer: {
    height: height * 0.33,
    width: width,
    padding: 10,
  },
});
