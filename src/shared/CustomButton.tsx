import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import colors from '../styles/colors';
import CustomText from './CustomText';
import fonts from '../styles/fonts';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const {width, height} = Dimensions.get('screen');

export type CustomProps = {
  disabled: boolean,
  onPress: () => void,
  widths? : number,
  heights? : number,
  title: string,
  isLoading: boolean
}
  
const CustomButton: FC<CustomProps> = ({
  disabled,
  onPress,
  widths = width * 0.8,
  heights= height * 0.07,
  isLoading,
  title,

  ...restProps
}) => {
  return (
    <>
      <TouchableOpacity
        style={[styles.borderStyle, {width:widths, height: heights}]}
        disabled={disabled}
        onPress={() => onPress()}>
        <CustomText
          size={16}
          color={colors.black}
          capitalize={'none'}
          fontType={fonts.nunitoBold}>
           {isLoading == true ? (
            <ActivityIndicator size="large" color={colors.black} />
          ) : title }
          
        </CustomText>
      </TouchableOpacity>
      {/* <View style={[styles.borderStyle]}>
        <Button   color={colors.orange} title={title} {...restProps} />
      </View> */}
    </>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  borderStyle: {
    backgroundColor: colors.orange,
    borderWidth: 2,
    borderStyle: 'solid',
    fontSize: 15,
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  appButtonDisabled: {
    backgroundColor: colors.gray,
  },
});
