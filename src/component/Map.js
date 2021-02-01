import React, {useEffect, useState} from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import {
    View,
    StyleSheet,
    Image,
    Text
  } from 'react-native';

import colors from '../styles/colors'

const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   flex:1,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

export default (props) => {
    const {navigation, route} = props
    const {params} = route;
    const monkey = require('../../assets/images/hostLogo1.png')
   



 return (
   <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} 
       style={styles.map}
       region={{
         latitude: params.latitude && params.latitude[1],
         longitude:params.latitude && params.latitude[0],
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
        <Marker coordinate={{ latitude:params.latitude && params.latitude[1] , longitude: params.latitude && params.latitude[0] }}
        pinColor={colors.orange}
        > 
        </Marker>
     </MapView>
   </View>
)
};