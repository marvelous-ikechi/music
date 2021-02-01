import React, { FC,  useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  
  Image,
  View
} from "react-native";
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomText from '../../shared/CustomText';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import CustomButton from '../../shared/CustomButton';

const Accept  = ({navigation, loading}) => {

  const submitHandler =  (values )  => {
    console.log("here")
  };
  
  return (
     <SafeAreaView style={styles.container}>
         <View style={styles.topLevel}>
         <View style={styles.firstLevelContainer}>
          <CustomText
            color={colors.white}
            size={30}
            capitalize={'none'}
            fontType={fonts.nunitoBold}>
            {'Shout out for\nJohn pearson'}
          </CustomText>
         
        </View>

        <View style={styles.secondLevelContainer}>
          <CustomText
            color={colors.orange}
            size={30}
            capitalize={'none'}
            fontType={fonts.nunitoLight}>
            {"It's for my brother's\n20th birthday.\nHis name is\ndavid hughes :)"}
          </CustomText>
         
        </View>

        <View style={styles.thirdLevelContainer}>
        <CustomButton
            title={'Accept'}
            disabled={false}
            onPress={() => submitHandler}
          />
        </View>
         </View>
        
    </SafeAreaView>
        
  );
};


const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.black,
  },
  topLevel:{
    top:50,
    margin:10
  },
 
  firstLevelContainer: {
    marginTop: height * 0.05,
    display: 'flex',
    marginLeft: 25,
  },
  secondLevelContainer: {
    marginTop: height * 0.05,
    display: 'flex',
    marginLeft: 25,
  },
  thirdLevelContainer: {
    top: height * 0.3,
    marginLeft: 25,

  },
  fourthLevelContainer: {
    top: height * 0.06,
    display: 'flex',
    alignItems: 'center',
    marginLeft: -10,
  },
  displayRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: width * 0.9,
  },
  socialLoginIconSize: {
    height: 30,
    width: 30,
  },
  forgotPassword: {
    display: 'flex',

  },
  mg2:{
    marginLeft:50
  }
});

export default Accept;