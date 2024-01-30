import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Alarm from '../pages/Alarm';
import Login from '../pages/auth/Login';
import {Registration} from '../pages/auth/Registration';

const Stack = createNativeStackNavigator();

export default function AuthNav() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="Alarm" component={Alarm} />
    </Stack.Navigator>
  );
}
