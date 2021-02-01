import React, {useEffect, useState} from 'react';

// import AppStack from './AppStack';
import Auth from './AuthStack';
import Regular from './RegularStack';
import SuperUserStack from './SuperUserStack'
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';


const Stack = createStackNavigator();

const App = ({ user}) => {
  const [tokens, setToken] = useState('');

  useEffect(() => {
    console.log(" userType ", user);
    getToken();
  },[user]);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
    } catch (error) {
      setToken('');
    } 
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>

      {
          user && user.account_type === "Regular User" ? (
          <Stack.Screen name="Regular" component={Regular} />
          ) :  user && user.account_type ==="Super User" ? (<Stack.Screen name="Super" component={SuperUserStack} />
          ) :  <Stack.Screen name="Auth" component={Auth} />
      }
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => ({
  user: state.userState.user
});


export default connect(mapStateToProps, null)(App)