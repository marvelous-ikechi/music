import React from 'react';
import {StyleSheet, TextInput, View, Dimensions} from 'react-native';
import colors from '../styles/colors';
import CustomText from '../shared/CustomText'

const CustomTextInput = ({height, width, isError, ...restProps}) => {
  return (
    <>
      <View
        style={[
          styles.borderStyle,
          {borderColor: isError ? colors.red : colors.orange},
        ]}>
        <TextInput
          placeholderStyle={{fontSize: 20}}
          placeholderTextColor={colors.white}
          style={{fontSize: 18, color: 'white'}}
          {...restProps}
        />
      </View>
    </>
  );
};

export default CustomTextInput;
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  borderStyle: {
    width: width * 0.8,
    height: height * 0.07,
    // height: 54,
    borderWidth: 2,
    borderStyle: 'solid',
    fontSize: 15,
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
    paddingLeft: 20,
  },
});
