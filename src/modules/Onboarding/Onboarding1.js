import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomText from '../../shared/CustomText';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import CustomButton from '../../shared/CustomButton';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



const OnboardingScreen = (props) => {
  const {navigation} = props;
  const hostLogoImage = require('../../../assets/images/hostLogo2.png');
  const userLogoImage = require('../../../assets/images/hostLogo2.png');
  const [userActiveColor, setUserActiveColor] = useState(colors.gray);
  const [hostActiveColor, setHostActiveColor] = useState(colors.gray);
  const [userType, setUserType] = useState('');

  const changeUserBackgroundHandler = () => {
    setUserActiveColor(colors.yellow);
    setHostActiveColor(colors.gray);
    setUserType('Regular User');
  };
  const changeHostBackgroundHandler = () => {
    setUserActiveColor(colors.gray);
    setUserType('Super User');
    setHostActiveColor(colors.yellow);
  };

  const handleSubmit = () => {
    if (userType.length != 0) {
      navigation.navigate('Register', {
        userType: userType,
      });
    } else {
      alert('Please Select User Type');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstLevelContainer}>
        <CustomText
          size={30}
          color={colors.white}
          fontType={fonts.nunitoBold}
          capitalize={'capitalize'}>
          Select User Type
        </CustomText>
      </View>
      <View style={styles.secondLevelContainer}>
        <View>
          <TouchableOpacity onPress={() => changeHostBackgroundHandler()}>
            <View style={styles.hostSection}>
              <Image
                source={hostLogoImage}
                style={styles.image}
                tintColor={hostActiveColor}></Image>
            </View>
            <CustomText
              style={{alignSelf: 'center'}}
              capitalize={'capitalize'}
              color={hostActiveColor}>
              Super User
            </CustomText>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => changeUserBackgroundHandler()}>
            <View style={styles.userSection}>
              <Image
                source={userLogoImage}
                style={styles.image}
                tintColor={userActiveColor}></Image>
            </View>
            <CustomText
              style={{alignSelf: 'center'}}
              capitalize={'capitalize'}
              color={userActiveColor}>
              User
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.thirdLevelSection}>
        <CustomText
          style={{alignSelf: 'center'}}
          capitalize={'capitalize'}
          size={20}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </CustomText>
      </View>
      <View style={styles.fourthLevelSection}>
        <CustomButton
          title={'Next'}
          disabled={userType == ' ' ? true : false}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  firstLevelContainer: {
    top: height * 0.2,
    height: height * 0.05,
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 30,
  },
  secondLevelContainer: {
    top: height * 0.2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: height * 0.4,
  },
  thirdLevelSection: {
    marginTop: 20,
    top: hp(10),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(30),
    padding: 60,
  },
  fourthLevelSection: {
    top: hp(7),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hostSection: {
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: colors.darkGray,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 30,
  },
  userSection: {
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: colors.darkGray,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    height: 70,
    width: 70,
  },
});
