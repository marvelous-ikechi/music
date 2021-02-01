import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CustomText from '../shared/CustomText';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import colors from '../styles/colors';
const ErrorMessage = ({ errorValue }) => (
  <View style={styles.container}>
       <CustomText size={14} style={styles.errorText} color={colors.red} weight={'bold'}>
              {errorValue} 
        </CustomText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    height:hp(3),
  },
  errorText: {
    color: 'red'
  }
})

export default ErrorMessage