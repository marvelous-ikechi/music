import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import CustomText from '../../shared/CustomText';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {CapitalizeFirstLetter} from '../../helpers/capitalize';

const IntroScreen = (props) => {
  const {navigation} = props;
  const backIcons = require('../../../assets/images/backIcon.png');
  const userLogoImage = require('../../../assets/images/hostLogo2.png');

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Dashboards');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  
  return (
    <SafeAreaView style={styles.container}>
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
          {CapitalizeFirstLetter('Welcome')}
        </CustomText>
      </View>
      <View style={styles.thirdLevelContainer}>
        <CustomText
          color={colors.white}
          size={25}
          capitalize={'none'}
          fontType={fonts.nunitoLight}>
          {CapitalizeFirstLetter(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          )}
        </CustomText>
      </View>
    </SafeAreaView>
  );
};

export default IntroScreen;
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    top: 0,
    backgroundColor: colors.black,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdLevelContainer: {
    top: height * 0.01,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60,
    left: 25,
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
