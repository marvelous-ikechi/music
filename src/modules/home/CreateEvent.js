import React, {useEffect} from 'react';
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
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomText from '../../shared/CustomText';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {CapitalizeFirstLetter} from '../../helpers/capitalize';


const CreateEvent = (props) => {
  const {navigation} = props;
  const backgroundImg = require('../../../assets/images/registerBackground.png');
  const slantLogo = require('../../../assets/images/slantLogo.png');


  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImg} style={styles.image}>
        <View style={styles.firstLevelContainer}>
          <Image source={slantLogo} style={styles.backIconsStyle}></Image>
        </View>
        <View style={styles.secondLevelContainer}>
          <CustomText
            color={colors.white}
            size={30}
            capitalize={'none'}
            fontType={fonts.nunitoBold}>
            {CapitalizeFirstLetter('No Event Created')}
          </CustomText>
        </View>
        <View style={styles.thirdLevelContainer}>
          <CustomText
            color={colors.gray}
            size={20}
            style={{marginLeft: 10, alignSelf: 'center'}}
            capitalize={'none'}
            fontType={fonts.nunitoLight}>
            {CapitalizeFirstLetter(
              'You have not created any\n event yet, tap the below plus\n icon to create one and get\n song requests',
            )}
          </CustomText>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};



export default CreateEvent;
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
    height: 40,
    width: 170,
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
    top: height * 0.4,
    display: 'flex',
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
