import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomText from '../../shared/CustomText';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {CapitalizeFirstLetter} from '../../helpers/capitalize';
import CustomTextInput from '../../shared/CustomTextInput';
import CustomButton from '../../shared/CustomButton';
import {color} from 'react-native-reanimated';
import {connect} from 'react-redux';
import getEvent from '../../action/getEvent';
import deleteEvent from '../../action/deleteEvent';

import moment from 'moment'


const PassedEvent  = (props ) => {
  const {navigation, getEvent, deleteEvent, loading,passedEvent} = props;
  const backgroundImg = require('../../../assets/images/registerBackground.png');
  const slantLogo = require('../../../assets/images/slantLogo.png');
  const pencilLogo = require('../../../assets/images/pencil.png');
  const clock = require('../../../assets/images/clock3.png');
  const pin = require('../../../assets/images/pin.png');
  const trash = require('../../../assets/images/trash3.png');



  const getUserEvents = async () => {
     await getEvent();
  }

  useEffect(() => {
    getUserEvents();
  }, [])

  const convertTodate = (startTime, endTime) => {
    const startDateObject = moment(new Date((startTime * 1000))).format('ll');
    const endDateObject = moment(new Date((endTime * 1000))).format('ll');

    const startTimeObject = moment(new Date((startTime * 1000))).format('LT');
    const endTimeObject = moment(new Date((endTime * 1000))).format('LT');
    
    // console.log(startDateObject, endDateObject);      
    const dates = `${startDateObject} - ${endDateObject}`;
    const times = `${startTimeObject} - ${endTimeObject}`;
     return {
       dates,
       times
     }

  }

  const deleteHandler = (id) => {
    console.log('passedEvent', passedEvent);
    // deleteEvent(id);
  };


  const HorinzontalCards = ({item}) => (
    <View style={styles.cardContainer}>
        <View style={styles.cardFirstLevel}>
        <Image source={pencilLogo} style={styles.pencilLogoStyles}></Image>
        </View>
        <View style={styles.cardSecondLevel}>
  <CustomText size={25} capitalize={'none'} weight={'bold'} >{item.name}</CustomText>
        </View>
        <View style={styles.thinLine}>
        </View>
        <View style={styles.cardThirdLevel}>
        <View style={styles.dateInside}>
        <View style={styles.dateClock}>
        <Image source={clock} style={styles.clockLogoStyles}></Image>
        </View>
        <View style={styles.dateDetails}>
        <View style={styles.dateDetail1}>
  <CustomText size={16} capitalize={'none'} > {convertTodate(item.start_time, item.end_time).dates}</CustomText>
          </View>
          <View style={styles.dateDetail2}>
          <CustomText size={16} capitalize={'none'} > {convertTodate(item.start_time, item.end_time).times} </CustomText>
          </View>
        </View>
        
        </View>
        <View style={styles.dateInside2}>
          <View style={styles.dateClock}>
            <Image source={pin} style={styles.pinStyles}></Image>
          </View>
        <View style={styles.dateDetails}>
          <View style={styles.dateDetailPlace}>
  <CustomText size={16} capitalize={'none'} >{item.address}</CustomText>
          </View>
        </View>
        </View>
        <View style={styles.dateInside3}>
          <View style={styles.dateClock2}>
            <CustomButton  widths={120} heights={40} title={'View Request'} onPress={() => console.log()} disabled={false}/>
          </View>
          <TouchableOpacity onPress={() => deleteHandler(item.event_id)} style={styles.dateDetail3}>
              <Image source={trash} style={styles.trashStyles}></Image>
          </TouchableOpacity >
        </View>
        </View>
    </View>
  )
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topLevelContainer}>
       
        <View style={styles.secondLevelContainer}>
          <CustomText
            color={colors.white}
            size={30}
            capitalize={'none'}
            fontType={fonts.nunitoBold}>
            {CapitalizeFirstLetter(' Passed Events')}
          </CustomText>
        </View>
        <View style={styles.thirdLevelContainer}>
          <ScrollView horizontal={true}>
            {
              passedEvent && passedEvent.map((item, idx) => {
                return (
                  <HorinzontalCards item={item} key={`request${idx + 1}`}/>
                )
              })
            }
          
           

          </ScrollView>
       
        </View>
        
      </View>
    </SafeAreaView>
  );
};


const mapStateToProps = (state) => ({
  loading: state.pendingState.pending,
  events: state.eventState.event,
  passedEvent: state.eventState.passedEvent
});

export default connect(mapStateToProps, {getEvent, deleteEvent})(PassedEvent);
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    top: 0,
  },
  topLevelContainer:{
    flex:1,
    display:"flex",
    backgroundColor:colors.black
  },
  cardFirstLayer:{

  },
  
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  cardContainer:{
    height:height * 0.5,
    width: width * 0.7,
    borderRadius: 7,
    backgroundColor:'transparent',
    borderColor:colors.orange,
    borderWidth:0.3,
    margin:10
  },
  backIconsStyle: {
    height: 40,
    width: 170,
  },
  firstLevelContainer: {
    flex:1,
    marginTop:10,
    display: 'flex',
    marginLeft: 20,
  },
  thinLine:{
    flex: 0.01,
    backgroundColor:colors.orange,
    margin:20
  },
  secondLevelContainer: {
    flex:0.8,
    display: 'flex',
    marginLeft: 35,
  },
  thirdLevelContainer: {
    flex:4,
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    marginBottom:50

  },
  
  cardFirstLevel:{
    display:"flex",
    flex:0.7,
    alignItems:'flex-end',

  },
  pencilLogoStyles:{
    margin: 10,
    height: 25,
    width:25
  },
  clockLogoStyles:{
    margin: 10,
    height: 20,
    width:20
  },
  pinStyles:{
    margin: 10,
    height: 28,
    width:20
  },
  trashStyles:{
    height: 28,
    width:20
  },
  cardSecondLevel:{
    display:"flex",
    flex:1,
    alignItems:'center',
   
  },
  cardThirdLevel:{
    display:"flex",
    flex:4,
    alignItems:'center',
  },
  dateInside:{
    display:"flex",
    flexDirection:'row',
    flex: 1,
    marginTop:5
  },
  dateInside2:{
    display:"flex",
    flexDirection:'row',
    flex: 1
  },
  dateInside3:{
    display:"flex",
    flexDirection:'row',
    flex:1.5,
    alignItems:"center",
    marginLeft:20
  },
  dateClock:{
  flex:1,
  },
  dateDetails:{
    flex: 5,
    display:'flex',
    justifyContent:"flex-start",
    marginTop:5
  },
  dateDetail1:{
    display:'flex',
    justifyContent:"flex-start",
    alignItems:'flex-start',
    marginLeft:10
  },
  dateDetail2:{
    display:'flex',
    justifyContent:"center",
    alignItems:'flex-start',
    marginLeft:10
  },
  dateDetailPlace:{
    display:'flex',
    justifyContent:"center",
    alignItems:'flex-start',
    marginLeft:10,
    marginTop:6
  }, 
  dateDetail3:{
    display:'flex',
    justifyContent:"center",
    alignItems:'center',
    flex:1,
    marginRight:20,
    marginTop:10

  },
  dateClock2:{
    flex: 3
  }
  
});
