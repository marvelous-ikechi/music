import React from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar } from 'react-native'
import colors from '../styles/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Screen = ({children}) => {
    const userLogoImage = require('../../assets/images/slantLogo.png');

    return (
        <SafeAreaView style={styles.container} >
            <StatusBar backgroundColor={colors.black} barStyle={'dark-content'} />
           <View style={styles.logoSection}>
           <Image
          source={userLogoImage}
          style={styles.imageSmall}
          tintColor={colors.orange}>

          </Image>
           </View>
           <View style={styles.children}>
               {children}
           </View>
        </SafeAreaView>
    )
}

export default Screen

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.black,
        display:"flex",
        flex:1

    },
    logoSection:{
        flex:2,
        display:"flex",
        justifyContent:"center",
        marginLeft:wp(10)
    },
    children:{
        flex:6
    },
    imageSmall: {
        height: hp(10),
        width: wp(80),
      },
})
