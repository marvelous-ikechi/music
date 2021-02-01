import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {RegularStackNavigation} from './StackNavigationData';

const RegularUser = createStackNavigator();

export default function RegularStackView(props) {
  return (
    <RegularUser.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="RegularUserIntro">
      {RegularStackNavigation.map((item, idx) => (
        <RegularUser.Screen
          key={`stack_item-${idx + 1}`}
          name={item.name}
          component={item.component}
        />
      ))}
    </RegularUser.Navigator>
  );
}
