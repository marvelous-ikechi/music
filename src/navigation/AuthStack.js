import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackNavigation} from './StackNavigationData';

const AuthStack = createStackNavigator();

export default function AuthStackView(props) {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Welcome">
      {AuthStackNavigation.map((item, idx) => (
        <AuthStack.Screen
          key={`stack_item-${idx + 1}`}
          name={item.name}
          component={item.component}
        />
      ))}
    </AuthStack.Navigator>
  );
}
