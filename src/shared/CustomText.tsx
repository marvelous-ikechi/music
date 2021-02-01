import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
// import {colors, fonts} from '../styles';
import fonts from '../styles/fonts';

export type CustomProps = {
  children: any,
  size?: number,
  weight?: string,
  capitalize?:string,
  fontType ?:Object,
  style ?:any,
  color?:string,
  onPress? : () => void
  
}


const CustomText : FC <CustomProps>  = ({
  children,
  size = 0,
  weight = 'normal',
  capitalize = 'lowercase',
  color = '#E2E8EF',
  fontType = fonts.nunitoLight,
  onPress,
  style,
}) => {
  return (
    <View>
      <Text onPress={onPress}
        style={[
          styles.titlesText,
          {
            fontSize: size === 0 ? RFValue(17) : size,
            fontWeight: weight,
            textTransform: capitalize,
            color: color,
            fontFamily: fontType,
          },
          style,
        ]}>
        {children}
      </Text>
    </View>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  titlesText: {
    // alignItems: 'flex-end',
    // justifyContent: 'center',
    // textAlign: 'center',
    letterSpacing: -0.02,
    fontFamily: fonts.nunitoBlackItalic,
  },
});
