
import React, { useState, useEffect,useCallback } from 'react';

import { Text, View, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import CustomText from '../shared/CustomText';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import formatDate from '../shared/formatDate';
import moment from 'moment';

const DateComponent = ({setFieldValue}) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  useEffect(() => {
  combineDateAndTime(date, time);
  }, [date, time]);

  // onchange
  const onChange = (event, selectedValue) => {
    setShow(Platform.OS === 'ios');
    if (mode == 'date') {
      const currentDate = selectedValue || new Date();
      setDate(currentDate);
      setMode('time');
      // setShow(Platform.OS !== 'ios');
    } else {
      const selectedTime = selectedValue || new Date();
      setTime(selectedTime);
      setShow(Platform.OS === 'ios');
      setMode('date');
    }
  };

  // setMode show
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  // show mode 
  const showDatepicker = () => {
    showMode('date');
  };


  // combine dateAndTime 
const combineDateAndTime = (date, time) => {
    if (date && time) {
      const timeString = time.getHours() + ':' + time.getMinutes() + ':00';
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Jan is 0, dec is 11
      const day = date.getDate();
      const dateString = '' + year + '-' + month + '-' + day;
      const dateTime = moment(`${dateString} ${timeString}`, 'YYYY-MM-DD HH:mm:ss').format();
      const dateTimeObject = moment(`${dateString} ${timeString}`, 'YYYY-MM-DD HH:mm:ss').toDate();
      const timeStamp = Math.round(new Date(dateTimeObject).getTime());
      console.log( "i am sending this ", timeStamp );
      setFieldValue(timeStamp);
    }
};

  return (
    <View>
      <TouchableOpacity onPress={() => showDatepicker()}>
      <CustomText
            size={18}
            style={{marginTop: 12}}
            color={colors.white}
            capitalize={'none'}
            fontType={fonts.nunitoLight}>
           {formatDate(date, time)}
          </CustomText>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      )}
    </View>
  );
};

// const formatDate = (date, time) => {
//   return `${date.getDate()}/${date.getMonth() +
//     1}/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
// };

export default DateComponent;