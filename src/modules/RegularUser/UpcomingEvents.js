import React, {useEffect, useState,} from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CustomText from '../../shared/CustomText';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import CustomButton from '../../shared/CustomButton';
import {connect} from 'react-redux';
import getEvent from '../../action/getEvent';
import Geolocation from 'react-native-geolocation-service';
import {formatDateObject} from '../../shared/formatDate';
import LoaderComponent from '../../component/LoaderComponent'

import moment from 'moment';
import formatDate from '../../shared/formatDate';

const UpcomingEvents = (props) => {
  const {navigation, getEvent, loading, upcomingEvent, events} = props;
  const slantLogo = require('../../../assets/images/slantLogo.png');
  const pencilLogo = require('../../../assets/images/pencil.png');
  const clock = require('../../../assets/images/clock3.png');
  const pin = require('../../../assets/images/pin.png');

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  const getUserEvents = async () => {
    console.log('longitude', longitude);
    await getEvent(latitude, longitude);
    const time= new Date().getTime();
    console.log('present time', time );
  };


  useEffect(() => {
    getLatitude();
    getUserEvents();
  }, [latitude,longitude]);
 
 
// get permission for geolocation
  const getLatitude = async () => {
    if (Platform.OS !=='android' )  { 
        console.log("__ ia am ios");
        const granted = await Geolocation.requestAuthorization('whenInUse');
        if (granted){
          console.log("permission granted");
          Geolocation.getCurrentPosition(
            (position) => {
              console.log("position from geolocation", position);
              //  console.log("latitude", position.coords.latitude );
              console.log("longitude", position.coords.longitude);
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
            },
            (error) => {
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 25000, maximumAge: 10000 }
        );
      }
    }
     else {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'MonkeyMusic',
                message:
                'we need location service to provide your location',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
           Geolocation.getCurrentPosition(
            (position) => {
              console.log("position from geolocation", position);
              //  console.log("latitude", position.coords.latitude );
              console.log("longitude", position.coords.longitude);
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
            },
            (error) => {
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 25000, maximumAge: 10000 }
        );

        } else {
            Defaults.modal.current.renderModel(modalOptions);
            return false;
        }
    } 
    catch (err) {
        console.warn(err);
    }
}

  }




//   const deleteHandler = (id) => {
//     console.log('passedEvent', passedEvent);
//     // deleteEvent(id);
//   };

  const HorinzontalCards = ({item}) => (
    <View style={styles.cardContainer}>
      <View style={styles.cardFirstLevel}>
        <Image source={pencilLogo} style={styles.pencilLogoStyles}></Image>
      </View>
      <View style={styles.cardSecondLevel}>
        <CustomText size={25} capitalize={'none'} weight={'bold'}>
          {item.name}
        </CustomText>
      </View>
      <View style={styles.thinLine}></View>
      <View style={styles.cardThirdLevel}>
        <View style={styles.dateInside}>
          <View style={styles.dateClock}>
            <Image source={clock} style={styles.clockLogoStyles}></Image>
          </View>
          <View style={styles.dateDetails}>
            <View style={styles.dateDetail1}>
              <CustomText size={16} capitalize={'none'}>
               StartTime : {formatDateObject(item.start_time)} 
              </CustomText>
            </View>
            <View style={styles.dateDetail2}>
              <CustomText size={16} capitalize={'none'}>
              EndTime : {formatDateObject(item.end_time)}
              </CustomText>
            </View>
          </View>
        </View>
        <View style={styles.dateInside2}>
          <View style={styles.dateClock}>
            <Image source={pin} style={styles.pinStyles}></Image>
          </View>
          <View style={styles.dateDetails}>
            <View style={styles.dateDetailPlace}>
              <CustomText size={16} capitalize={'none'}>
                {item.address}
              </CustomText>
            </View>
          </View>
        </View>
        <View style={styles.dateInside3}>
          <View style={styles.dateClock2}>
            <CustomButton
              widths={120}
              heights={40}
              title={'Join Event'}
              onPress={() => navigation.navigate("MakeMusicRequest", {
                event_id: item.event_id
              })}
              disabled={false}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Maps",
            {latitude: item.location.coordinates}
            )}
            style={styles.dateDetail4}>
                  <CustomText size={16} capitalize={'none'} color={colors.orange}>
               View on Map
              </CustomText>
          </TouchableOpacity>
          <LoaderComponent loading={loading} />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topLevelContainer}>
      <Image source={slantLogo} style={styles.slantLogo}></Image>
        <View style={styles.secondLevelContainer}>
          <CustomText
            color={colors.white}
            size={30}
            capitalize={'none'}
            fontType={fonts.nunitoBold}>
                Join nearby events & send song requests 
          </CustomText>
          <CustomText
            color={colors.orange}
            size={20}
            capitalize={'none'}
            fontType={fonts.nunitoLight}>
                4 events within 100m radius
          </CustomText>
        </View>
        <View style={styles.thirdLevelContainer}>
        <ScrollView horizontal={true}>
          {
            upcomingEvent && upcomingEvent.map( (item, idx) => (
              <HorinzontalCards key={`upcoming${idx + 1}`} item={item} />
            ) )
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
  upcomingEvent: state.eventState.upcomingEvent,
});

export default connect(mapStateToProps, {getEvent})(
  UpcomingEvents,
);
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    top: 0,
  },
  topLevelContainer: {
    flex: 1,
    display: 'flex',
    padding:20,
    backgroundColor: colors.black,
  },
  cardFirstLayer: {},

  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  cardContainer: {
    height: hp(50),
    width: wp(70),
    borderRadius: 7,
    backgroundColor: 'transparent',
    borderColor: colors.orange,
    borderWidth: 0.3,
    margin: 10,
  },
  backIconsStyle: {
    height: 40,
    width: 170,
  },
  firstLevelContainer: {
    flex: 1,
    marginTop: 10,
    display: 'flex',
    marginLeft: 20,
  },
  thinLine: {
    flex: 0.01,
    backgroundColor: colors.orange,
    margin: 20,
  },
  secondLevelContainer: {
    flex: 0.8,
    display: 'flex',
    margin:15
    
  },
  thirdLevelContainer: {
    flex: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop:70
  },
  slantLogo:{
    height:50,
    width:200
  },

  cardFirstLevel: {
    display: 'flex',
    flex: 0.7,
    alignItems: 'flex-end',
  },
  pencilLogoStyles: {
    margin: 10,
    height: 25,
    width: 25,
  },
  clockLogoStyles: {
    margin: 10,
    height: 20,
    width: 20,
  },
  pinStyles: {
    margin: 10,
    height: 28,
    width: 20,
  },
  trashStyles: {
    height: 28,
    width: 20,
  },
  cardSecondLevel: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  cardThirdLevel: {
    display: 'flex',
    flex: 4,
    alignItems: 'center',
  },
  dateInside: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    marginTop: 5,
  },
  dateInside2: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  dateInside3: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1.5,
    alignItems: 'center',
    marginLeft: 20,
  },
  dateClock: {
    flex: 1,
  },
  dateDetails: {
    flex: 5,
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  dateDetail1: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  dateDetail2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  dateDetailPlace: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
    marginTop: 6,
  },
  dateDetail3: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginRight: 20,
    marginTop: 10,
  },
  dateDetail4: {
    display: 'flex',
    marginTop: 10,
    left:-20,
    flex:1
  },
  dateClock2: {
    flex: 3,
  },
});
