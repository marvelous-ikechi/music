import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {SuperUserStack} from './StackNavigationData';

const SuperUser = createStackNavigator();

export default function RegularStackView(props) {
  return (
    <SuperUser.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Intro">
      {SuperUserStack.map((item, idx) => (
        <SuperUser.Screen
          key={`stack_item-${idx + 1}`}
          name={item.name}
          component={item.component}
        />
      ))}
    </SuperUser.Navigator>
  );
}
