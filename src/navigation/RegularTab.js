import * as React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';

import UpcomingRequest from '../modules/home/UpcomingEvent';
import UpcomingEvent from '../modules/RegularUser/UpcomingEvents'
import Notification from '../modules/RegularUser/Notification'
import UpdateProfile from '../modules/home/UpdateProfile' 

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const notificIcon = require('../../assets/images/notificationIcon.png');
  const homeIcon = require('../../assets/images/homeIcon.png');
  const userLogo = require('../../assets/images/userPic.png');

  const tabNavigationData = [
    {
      name: 'Home',
      component:UpcomingEvent,
      src: homeIcon,
      tint:false
    },
    {
      name: 'Notification',
      component: Notification,
      src: notificIcon,
      
    },
    {
      name: 'UserProfile',
      component: UpdateProfile,
      src: userLogo,
      tint:false
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
                tintColor={ focused ? colors.orange : colors.gray }
                 />
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
