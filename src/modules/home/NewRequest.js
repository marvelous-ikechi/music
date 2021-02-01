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
  useColorScheme,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomText from '../../shared/CustomText';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import CustomTextInput from '../../shared/CustomTextInput';
import CustomButton from '../../shared/CustomButton';
import {getRequestSuperUser} from '../../action/AdmingetMusicRequest';
import {acceptMusicRequest} from '../../action/acceptMusicRequest';
import {connect} from 'react-redux';

const NewRequest = (props) => {
  const [arrayNewRequest, setArrayNewRequest] = useState([]);

  const {
    navigation,
    getRequestSuperUser,
    route,
    musicRequest,
    acceptMusicRequest,
  } = props;

  const {params} = route;
  const userPic = require('../../../assets/images/userPic.png');
  const cancelLogo = require('../../../assets/images/cancel3.png');
  const checkins = require('../../../assets/images/checkin3.png');

  const acceptHandler = (bol, event_id, req_id) => {
    const data = {
      request_id: req_id,
      event_id: event_id,
      request_response: bol,
    };
    console.log("accept", data);
    acceptMusicRequest(data);
  };

  useEffect(() => {
    // console.log(" getting an error", params.event_id);
    getRequestSuperUser(params.event_id);
    // console.log(" getting an error", musicRequest);
  }, [params.event_id]);

  const RequestCard = ({item}) => {
    const {music_name, shoutout,music_artiste_name, username, event_id, uuid} = item;
    return (
      <View style={styles.cardContainer}>
        <View style={styles.imageStyleContainer}>
          <Image source={userPic} style={styles.imageSmall}></Image>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.firstlevel}>
            <CustomText
              size={10}
              capitalize={'none'}
              color={colors.gray}
              weight={'normal'}>
              {' '}
              {username} has requested to play
            </CustomText>
          </View>
          <View style={styles.secondLevel}>
            <CustomText
              size={20}
              capitalize={'none'}
              color={colors.white}
              weight={'normal'}>
              {music_name}
            </CustomText>
          </View>
          <View style={styles.thirdLevel}>
            <CustomText
              size={20}
              capitalize={'none'}
              color={colors.orange}
              weight={'normal'}>
              {music_artiste_name}
            </CustomText>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => acceptHandler(false, event_id, uuid)}
          style={styles.deleteContainer}>
          <Image source={cancelLogo} style={styles.imageSmallIcons}></Image>
          <CustomText
            size={10}
            capitalize={'none'}
            style={{alignSelf: 'center', marginTop: -5, marginLeft: -5}}
            color={colors.gray}
            weight={'normal'}>
            Reject
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => acceptHandler(true, event_id, uuid)}
          style={styles.acceptContainer}>
          <Image source={checkins} style={styles.imageSmallIcons}></Image>
          <CustomText
            size={10}
            capitalize={'none'}
            style={{alignSelf: 'center', marginTop: -5, marginLeft: -5}}
            color={colors.gray}
            weight={'normal'}>
            Accept
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topLevelContainer}>
        <ScrollView style={{flex: 1}}>
          {musicRequest &&
            musicRequest.map((items, idx) => (
              <RequestCard item={items} key={`musicRequest${idx + 1}`} />
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  loading: state.pendingState.pending,
  events: state.eventState.event,
  upcomingEvent: state.eventState.upcomingEvent,
  musicRequest: state.superUserRequest.musicRequest,
});

export default connect(mapStateToProps, {
  getRequestSuperUser,
  acceptMusicRequest,
})(NewRequest);
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    flexDirection: 'column',
    top: 0,
  },
  topLevelContainer: {
    flex: 1,
    display: 'flex',
    backgroundColor: colors.black,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: width,
    marginTop: 20,
  },
  imageStyleContainer: {
    flex: 1.5,
    backgroundColor: colors.black,
    height: 80,
  },
  contentContainer: {
    flex: 3,
    backgroundColor: colors.black,
    height: 80,
    display: 'flex',
  },
  deleteContainer: {
    flex: 1,
    height: 80,
  },
  acceptContainer: {
    flex: 1,
    height: 80,
  },
  imageSmall: {
    margin: 10,
    height: 60,
    width: 60,
    zIndex: 1,
  },
  firstlevel: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 5,
  },
  secondLevel: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    marginLeft: 5,
  },
  thirdLevel: {
    display: 'flex',
    alignItems: 'flex-start',
    marginLeft: 5,
    justifyContent: 'flex-start',
    flex: 2,
  },
  imageSmallIcons: {
    margin: 10,
    marginTop: 20,
    height: 30,
    width: 30,
    zIndex: 1,
  },
});
