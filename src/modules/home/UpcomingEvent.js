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
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomText from '../../shared/CustomText';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {CapitalizeFirstLetter} from '../../helpers/capitalize';
import CustomButton from '../../shared/CustomButton';
import {connect} from 'react-redux';
import {AdminGetEvent} from '../../action/getEvent';
import deleteEvent from '../../action/deleteEvent';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import moment from 'moment'
import LoaderComponent from '../../component/LoaderComponent';


const UpcomingEvents  = (props ) => {
  const {navigation, AdminGetEvent, deleteEvent, loading,upcomingEvent} = props;
  const backgroundImg = require('../../../assets/images/registerBackground.png');
  const slantLogo = require('../../../assets/images/slantLogo.png');
  const pencilLogo = require('../../../assets/images/pencil.png');
  const clock = require('../../../assets/images/clock3.png');
  const pin = require('../../../assets/images/pin.png');
  const trash = require('../../../assets/images/trash3.png');



  const getUserEvents = async () => {
     await AdminGetEvent();
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


  const Loaders = () => (
    <LoaderComponent loading={loading} />
  );

  const deleteHandler = async (id) => {
    console.log('upcomingEvent', upcomingEvent )
    await deleteEvent(id);
    await getUserEvents();
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
            <TouchableOpacity onPress={() => navigation.navigate('View Request', {event_id:item.event_id} )} >
             <CustomButton  widths={wp(40)} heights={40} onPress={() => navigation.navigate("View Request", {
               screen: "New Request",
               params:{event_id:item.event_id}
              })} title={'View Request'} disabled={false}/>
            </TouchableOpacity>
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
        
        <View style={styles.secondLevelContainer}>
          <CustomText
            color={colors.white}
            size={30}
            capitalize={'none'}
            fontType={fonts.nunitoBold}>
            {CapitalizeFirstLetter('Upcoming Events')}
          </CustomText>
          <CustomText
            color={colors.orange}
            size={18}
            capitalize={'none'}
            fontType={fonts.nunitoBold}>
            You cannot have more than one upcoming events
          </CustomText>
        </View>
        <View style={styles.thirdLevelContainer}>
          <ScrollView horizontal={true}>
            {
              upcomingEvent ? upcomingEvent.map((item, idx) => {
                return (
                  <HorinzontalCards item={item} key={`request${idx + 1}`}/>
                )
              }) : (
                <CustomText
            color={colors.orange}
            size={18}
            capitalize={'none'}
            fontType={fonts.nunitoBold}>
            You have no events
          </CustomText>
              )
            }
          </ScrollView>
        </View>
        {Loaders()}
    </SafeAreaView>
  );
};


const mapStateToProps = (state) => ({
  loading: state.pendingState.pending,
  events: state.eventState.event,
  upcomingEvent: state.eventState.upcomingEvent,
});

export default connect(mapStateToProps, {AdminGetEvent, deleteEvent})(UpcomingEvents);
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    top: 0,
    backgroundColor:colors.black

  },
  
 
  
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  cardContainer:{
    height:hp(50),
    width: wp(75),
    marginLeft:wp(5),
    borderRadius: 7,
    borderColor:colors.orange,
    borderWidth:2,
    display:"flex",
    justifyContent:"center"
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
    top:hp(15),
    display: 'flex',
    marginLeft: 35,
  },
  thirdLevelContainer: {
    top:hp(10),
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
