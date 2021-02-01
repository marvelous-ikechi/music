import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomText from '../../shared/CustomText';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import {CapitalizeFirstLetter} from '../../helpers/capitalize';
import CustomTextInput from '../../shared/CustomTextInput2';
import CustomButton from '../../shared/CustomButton';
import ErrorMessage from '../../component/ErrorMessage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {addUserRequest} from '../../action/userMusicRequest'


const AddMusicRequest = (props) => {
  const {navigation, route, addUserRequest, loading} = props;

//   const {event_id} = route.param;
  const backIcons = require('../../../assets/images/backIcon.png');
  const submitHandler = (values, actions) => {
    const {params} = route
    const data = {
      event_id:params.event_id,
      music_name:values.music_name,
      music_artiste_name:values.music_artiste_name,
      shoutout:values.shoutout
    }; 
    console.log('datas',data);
    addUserRequest(data, navigation.navigate, actions);
  };

  const Formikform = () => (
    <Formik
      initialValues={{
        music_name: '',
        music_artiste_name: '',
        shoutout:''
      }}
      onSubmit={(values, actions) => submitHandler(values, actions)}
      validationSchema={yup.object().shape({
        music_name: yup.string().required().min(2),
        music_artiste_name:yup.string().required().min(2).max(100),
        shoutout:yup.string().required().min(2).max(500)
      })}>
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit,
      }) => (
        <View style={styles.formContainer}>
          <CustomText
            color={colors.orange}
            size={20}
            capitalize={'none'}
            fontType={fonts.nunitoBold}>
            Music Name
          </CustomText>
         
          <CustomTextInput
            value={values.music_name}
            onChangeText={handleChange('music_name')}
            onBlur={() => setFieldTouched('music_name')}
          />
         { touched.music_name && errors.music_name && ( <ErrorMessage errorValue={errors.music_name ? errors.music_name : "Invalid" }  />
          )}
          <CustomText
            color={colors.orange}
            size={20}
            capitalize={'none'}
            fontType={fonts.nunitoBold}>
            Music Artiste Name
          </CustomText>
          
          <CustomTextInput
            value={values.music_artiste_name}
            onChangeText={handleChange('music_artiste_name')}
            onBlur={() => setFieldTouched('music_artiste_name')}
          />
            {touched.music_artiste_name && errors.music_artiste_name && (
           <ErrorMessage errorValue={errors.music_artiste_name}/>
          )}
          <CustomText
            color={colors.orange}
            size={20}
            capitalize={'none'}
            fontType={fonts.nunitoBold}>
            Make a ShoutOut
          </CustomText>
         
          <CustomTextInput
            value={values.shoutout}
            onChangeText={handleChange('shoutout')}
            onBlur={() => setFieldTouched('shoutout')}
          />
           {touched.shoutout && errors.shoutout && (
           <ErrorMessage errorValue={errors.shoutout}/>
          )}
          <CustomButton
            title={'Join'}
            isLoading={loading}
            disabled={!isValid}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 20}>
      <SafeAreaView>
        {/* arrow section */}
        <TouchableOpacity
          style={styles.firstLevelContainer}
          onPress={() => navigation.goBack()}>
          <Image source={backIcons} style={styles.backIconsStyle}></Image>
        </TouchableOpacity>

        <View style={styles.secondLevelContainer}>
          <CustomText
            color={colors.white}
            size={30}
            capitalize={'none'}
            fontType={fonts.nunitoBold}>
            {CapitalizeFirstLetter('Join by Adding a music request')}
          </CustomText>
        </View>
       
        <View style={styles.fourthLevelContainer}>
            <ScrollView style={{flex:1, height:hp(90), marginBottom:hp(2) }}>
            {Formikform()} 
            </ScrollView>
         
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state) => ({
    loading: state.pendingState.pending,
    events: state.eventState.event,
    upcomingEvent: state.eventState.upcomingEvent,
  });
  
export default connect(mapStateToProps, {addUserRequest}) (AddMusicRequest);
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.black,
  },
  formContainer: {
    paddingLeft: 20,
    marginTop: 20,
    marginLeft: 10,
  },

  backIconsStyle: {
    height: 20,
    width: 25,
  },
  firstLevelContainer: {
    flex: 1,
    display: 'flex',
    marginLeft: 20,
    marginTop: 40,
  },
  secondLevelContainer: {
    marginTop: height * 0.07,
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 40,
    flex: 1,
  },
  thirdLevelContainer: {
    marginTop: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60,
    backgroundColor: colors.white,
    width: 120,
    height: 120,
    marginLeft: 120,
    borderWidth: 2,
    borderColor: colors.orange,
    borderRadius: 75,
    flex: 1,
  },

  displayRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    width: width * 0.2,
  },
  imageSmall: {
    height: 120,
    width: 120,
    zIndex: 1,
  },
  imagePickIcons: {
    backgroundColor: colors.orange,
    height: 30,
    width: 30,
    position: 'absolute',
    top: height * 0.13,
    left: width * 0.25,
    zIndex: 2,
    borderRadius: 15,
  },
  fourthLevelContainer: {
    marginTop:hp(12),
    height: hp(70),
    width: width,
    padding: 10,
  },
});
