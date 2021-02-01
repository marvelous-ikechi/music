import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../../styles/colors';
import CustomText from '../../shared/CustomText';

const Notification = () => {
    return (
        <View style={styles.container}>
            <CustomText color={colors.orange}>Notification Screen</CustomText>
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.black,
        display:'flex',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
