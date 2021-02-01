import React from 'react';
import {StyleSheet, TextInput, View, Dimensions} from 'react-native';
import colors from '../styles/colors';



const CustomTextInput2 = ({ ...restProps}) => {
  return (
    <>
      <View style={[styles.borderStyle]}>
        <TextInput
          // placeholderStyle={{fontSize: 20}}
          placeholderTextColor={colors.white}
          style={{fontSize: 18, color: 'white'}}
          {...restProps}
        />
      </View>
    </>
  );
};

export default CustomTextInput2;
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  borderStyle: {
    // borderColor: colors.orange,
    borderBottomColor: colors.gray,
    width: width * 0.8,
    height: height * 0.05,
    // height: 54,
    borderWidth: 0.5,
    borderStyle: 'solid',
    fontSize: 18,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
