import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  ScrollView,
  ImageBackground,
  SafeAreaView,
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
import * as Icons from '../../shared/Icons';
import {connect} from 'react-redux';
import getEvent from '../../action/getEvent';
import {addUserRequest} from '../../action/userMusicRequest';

const AcceptedRequest = (props) => {
  const {navigation, acceptedRequest} = props;
  const userPic = require('../../../assets/images/userPic.png');
  
  const RequestCard = ({item}) => {
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
              {item.username} has requested to play
            </CustomText>
          </View>
          <View style={styles.secondLevel}>
            <CustomText
              size={20}
              capitalize={'none'}
              color={colors.white}
              weight={'normal'}>
              {item.music_name}
            </CustomText>
          </View>
          <View style={styles.thirdLevel}>
            <CustomText
              size={20}
              capitalize={'none'}
              color={colors.orange}
              weight={'normal'}>
             {item.music_artiste_name}
            </CustomText>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topLevelContainer}>
        <ScrollView style={{flex: 1}}>
          {acceptedRequest &&
            acceptedRequest.map((item, idx) => (
              <RequestCard item={item} key={`acceptedRequest${idx + 1}`} />
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  loading: state.pendingState.pending,
  acceptedRequest: state.superUserRequest.acceptedRequest,
});

export default connect(mapStateToProps)(AcceptedRequest);

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
