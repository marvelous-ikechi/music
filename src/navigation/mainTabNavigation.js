import React, {useState, useEffect} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';

import CreateEventDashboard from '../modules/home/CreateEvent';
import UpdateProfileScreen from '../modules/home/UpdateProfile';
import UpcomingEvents from '../modules/home/UpcomingEvent';
import AddEvents from '../modules/home/AddEvents';
import SuperAdminEvent from './TopNavBar';
 import {RetroParty} from './TopNavBar';
import {connect} from 'react-redux';
import {AdminGetEvent} from '../action/getEvent';
import { useIsFocused } from '@react-navigation/native';
import ViewRequest from '../modules/SuperUser/ViewRequest'

const Tab = createBottomTabNavigator();

const  BottomTabs = (props) => {
  
  // separation the millions 
  const {AdminGetEvent, events, upcomingEvent } = props ;
  const isFocused = useIsFocused();

  useEffect(() => {
    AdminGetEvent();
  }, [isFocused])

  useEffect(() => {
    console.log('state for admin screen separation', events, upcomingEvent.length )
  }, [events])

  const curvedArrow = require('../../assets/images/curvedArrow.png');
  const mediaIcons = require('../../assets/images/multimedia.png');
  const userLogo = require('../../assets/images/userPic.png');

  const tabNavigationData = [

    {
      name: 'ViewRequest',
      component:UpcomingEvents,
      src: mediaIcons,
    },
    {
      name: 'Add Event',
      component: AddEvents ,
      src: curvedArrow,
    },
    {
      name: 'UpdateProfileScreen',
      component: UpdateProfileScreen,
      src: userLogo,
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName="AddEvent"
      tabBarOptions={{
        style: {backgroundColor: colors.darkGray},
        backgroundColor: 'transparent',
      }}>
      {tabNavigationData.map((item, idx) => (
        <Tab.Screen
          key={`tab_item${idx + 1}`}
          name={item.name}
          component={item.component}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.tabBarItemContainer}>
                <Image source={item.src} size={30} style={styles.images}
                 tintColor={focused ? colors.orange : colors.gray} />
              </View>
            ),
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  fontSize: 12,
                  color: focused ? colors.orange : colors.gray,
                }}>
                {item.name}
              </Text>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

// check if super admin has an event running then dont show add screen;


const mapStateToProps = (state) => ({
  loading: state.pendingState.pending,
  events: state.eventState.event,
  upcomingEvent: state.eventState.upcomingEvent,
});



export default connect(mapStateToProps, {AdminGetEvent}) (BottomTabs);

const styles = StyleSheet.create({
  tabBarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  tabBarIcon: {
    width: 23,
    height: 23,
  },
  tabBarIconFocused: {
    tintColor: colors.primary,
  },
  images: {
    width: 25,
    height: 25,
  },
});
