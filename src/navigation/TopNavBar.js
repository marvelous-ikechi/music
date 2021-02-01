
import * as React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NewRequest from '../modules/home/NewRequest';
import AcceptedRequest from '../modules/home/AcceptedRequest';
import UpcomingEvent from '../modules/home/UpcomingEvent';
import PassedEvent from '../modules/home/PassedEvent';
import colors from '../styles/colors'
import CreateEvent from '../modules/home/CreateEvent';
import AddEvents from '../modules/home/AddEvents';
import {connect} from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const Tab = createMaterialTopTabNavigator();

export const RetroParty = () => {
  return (
    <Tab.Navigator initialRouteName={'NewRequest'} 
    tabBarOptions={{
        activeTintColor: colors.orange,
        labelStyle: { fontSize: 12,
         },
         activeBackgroundColor:colors.orange,
         inactiveBackgroundColor: colors.black,
         labelStyle:colors.orange,
         tabStyle:{
            height:hp(3),
            width:150,
            borderWidth:1,
            borderColor:colors.orange,
            borderRadius:5,
            display:"flex",
            justifyContent:'center',
            alignItems:'center',
            marginLeft:20,
            marginBottom:hp(4)
         },
         indicatorStyle:{
            backgroundColor:'transparent',
            marginLeft:50,
            width:100
         },
         style: {
            backgroundColor: colors.black,
        },
      }}>
      <Tab.Screen name="New Request" component={NewRequest} />
      <Tab.Screen name="Accepted Request" component={AcceptedRequest} />
    </Tab.Navigator>
  );
}


const SuperAdminEvent = ({loading, events, upcomingEvent}) => {
  return (
    <Tab.Navigator initialRouteName={'NewRequest'} tabBarOptions={{
        activeTintColor: colors.orange,
        labelStyle: { fontSize: 12,
                      
         },
         tabStyle:{
            marginTop:20,
            height:50,
            width:150,
            borderWidth:1,
            borderColor:colors.black,
            borderRadius:20,
            display:"flex",
            justifyContent:'center',
            alignItems:'center',
            marginLeft:20
         },
         indicatorStyle:{
            backgroundColor:colors.orange,
            marginLeft:50,
            width:100
         },
        style: { backgroundColor: colors.black},
      }}>
        {upcomingEvent == [] ? (
           <Tab.Screen name="Create Event" component={CreateEvent} />
        ) : (
          <>
          <Tab.Screen name="Upcoming Event" component={UpcomingEvent} />
          <Tab.Screen name="Passed Event" component={PassedEvent} />
          </>
        )
         }
      
     
    </Tab.Navigator>
  );
}


const mapStateToProps = (state) => ({
  loading: state.pendingState.pending,
  events: state.eventState.event,
  upcomingEvent: state.eventState.upcomingEvent,
});


export default connect(mapStateToProps, null)(SuperAdminEvent) ;


 ;