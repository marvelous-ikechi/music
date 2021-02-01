import React, {FC, useState, useEffect} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';

import CustomText from '../../shared/CustomText';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import CustomButton from '../../shared/CustomButton';
import CustomTextInput from '../../shared/CustomTextInput2';
import RNGooglePlaces from 'react-native-google-places';
import DateComponent from '../../shared/DateComponent';
import {connect} from 'react-redux';
import addEvent from '../../action/addEvent';
import {AdminGetEvent} from '../../action/getEvent';


const AddEvent = ({navigation, loading, addEvent, upcomingEvent, AdminGetEvent}) => {

  
  const backIcons = require('../../../assets/images/backIcon.png');
  const [location, setLocation] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [endTime, setEndTime] = useState(new Date());
  const [errorMessages, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [eventTitleError, setEventTitleError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async () => {
   
    if (!eventTitle){
      setErrorMessage('Event title Cant be empty');
      setIsError(true);
      return;
    }else {
      setIsError(false);
    }    

    const data = {
      name: eventTitle,
      start_time: startTime,
      end_time: endTime,
      location: location,
      lat: latitude.toString(),
      long: longitude.toString()
    }
    // console.log("data", data)
    await addEvent(data, navigation.navigate, setEventTitle, setEndTime,setStartTime,setLocation , setErrorMessage, setSuccessMessage);
  };

  useEffect(() => {
   AdminGetEvent();
  }, [])

  const validation  = (value ) => {
    const errMessage = "cant be less than three"
    if(!value && value.length < 3){
        return errMessage;
    }
    return 
  }

  const checkErrors = (value) => {
    setEventTitleError(validation(value))
  }



  const FormikForm = () => (
    
        <View style={styles.formContainer}>
          {isError && (
            <CustomText
            size={14}
            style={{margin: 10}}
            color={colors.red}
            capitalize={'none'}
            fontType={fonts.nunitoBold}>
            {errorMessages}
          </CustomText>
          )}  
            
          <CustomText
            size={17}
            style={{marginTop: 5}}
            color={colors.orange}
            capitalize={'none'}
            fontType={fonts.nunitoLight}>
            Event Title
          </CustomText>
          <CustomTextInput
            value={eventTitle}
            onChangeText={(value)   => setEventTitle(value)}
            mode={'Outline'}
            onBlur={() => checkErrors(eventTitle)}
            isError = {eventTitleError}
          />

          <CustomText
            size={18}
            style={{marginTop: 12}}
            color={colors.orange}
            capitalize={'none'}
            fontType={fonts.nunitoLight}>
            Starting Date & Time
          </CustomText>

          <View style={styles.displayRow}>
            <DateComponent setFieldValue={setStartTime}/>
          </View>

          <CustomText
            size={18}
            style={{marginTop: 12}}
            color={colors.orange}
            capitalize={'none'}
            fontType={fonts.nunitoLight}>
            End Date & Time
          </CustomText>

          <View style={styles.displayRow}>
            <DateComponent setFieldValue={setEndTime} />
          </View>

          <TouchableOpacity onPress={() => openSearchModal()}>
            <CustomText
              size={18}
              style={{marginTop: 12}}
              color={colors.orange}
              capitalize={'none'}
              fontType={fonts.nunitoLight}>
              Pick a place
            </CustomText>
          <CustomTextInput
            value={location}
            editable={false}
          />
        </TouchableOpacity>

          <TouchableOpacity >
            <CustomButton
              title={'Create Event'}
              disabled={isError}
              onPress={() => handleSubmit()}
              isLoading={loading}
            />
          </TouchableOpacity>
        </View>
  );

  const openSearchModal = () => {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        const {latitudeNE, longitudeNE} = place.viewport
        console.log(place.viewport);
        console.log(latitudeNE);
        setLatitude(latitudeNE);
        setLongitude(longitudeNE);
        console.log(longitudeNE);
        setLocation(place.address);
        
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.secondLevelContainer}>
          <CustomText
            color={colors.white}
            size={30}
            capitalize={'none'}
            fontType={fonts.nunitoBold}>
            Create new event
          </CustomText>

        </View>
        <View style={styles.thirdLevelContainer}>
          {FormikForm () }
        </View>
      </SafeAreaView>
    </View>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  formContainer: {
    paddingLeft: 20,
    marginTop: 20,
    marginLeft: 10,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  backIconsStyle: {
    height: 20,
    width: 25,
  },
  firstLevelContainer: {
    marginTop: height * 0.05,
    display: 'flex',
    marginLeft: 20,
  },
  secondLevelContainer: {
    marginTop: height * 0.05,
    display: 'flex',
    marginLeft: 25,
  },
  thirdLevelContainer: {
    top: height * 0.03,
  },
  fourthLevelContainer: {
    top: height * 0.06,
    display: 'flex',
    alignItems: 'center',
    marginLeft: -10,
  },
  displayRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    width: width * 0.9,
  },
  socialLoginIconSize: {
    height: 30,
    width: 30,
  },
  forgotPassword: {
    display: 'flex',
  },
  mg2: {
    marginLeft: 50,
  },
});



const mapStateToProps = (state) => ({
  loading: state.pendingState.pending,
  upcomingEvent: state.eventState.upcomingEvent,
});

export default connect(mapStateToProps, {addEvent,AdminGetEvent})(AddEvent);
