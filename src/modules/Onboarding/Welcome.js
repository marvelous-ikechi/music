import React, {useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import CustomText from '../../shared/CustomText';
import colors from '../../styles/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



const WelcomeScreen  = (props) => {
  const imgsrc1 = require('../../../assets/images/download.png');
  const {navigation} = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={imgsrc1} style={styles.image}>
        {/* <View style={styles.skipBtn}>
          <TouchableOpacity onPress={() => navigation.navigate('Onboarding')}>
            <CustomText
              color={colors.white}
              size={20}
              capitalize={'capitalize'}>
              Next
            </CustomText>
          </TouchableOpacity>
        </View> */}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    top: 0,
    backgroundColor: colors.orange,
  },
  skipBtn: {
    position: 'absolute',
    top: Platform.OS =='ios' ? height * 0.8 : height * 0.9,
    left: width * 0.7,
    height: height * 0.05,
    width: width * 0.2,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: colors.red,
    backgroundColor: colors.red,
  },
  image: {
    height:hp(100),
    width:wp(100),
    resizeMode: 'contain',
  },
});
