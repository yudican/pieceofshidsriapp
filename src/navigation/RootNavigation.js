import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Kuisioner from '../pages/Kuisioner';
import Education from '../pages/Education';
import KualitasHidup from '../pages/KualitasHidup';
import EducationDetail from '../pages/EducationDetail';
import ProfileDetail from '../pages/ProfileDetail';

const Tab = createBottomTabNavigator();

export default function RootNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FF735C',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => {
            return (
              <MaterialCommunityIcons name="home" color={color} size={22} />
            );
          },
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Education"
        component={Education}
        options={{
          tabBarIcon: ({color}) => {
            return (
              <MaterialCommunityIcons name="book" color={color} size={22} />
            );
          },
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Kuisioner"
        component={Kuisioner}
        options={{
          tabBarIcon: ({color}) => {
            return (
              <MaterialCommunityIcons
                name="list-status"
                color={color}
                size={22}
              />
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => {
            return (
              <MaterialCommunityIcons name="account" color={color} size={22} />
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Kualitas Hidup"
        component={KualitasHidup}
        options={{
          unmountOnBlur: true,
          tabBarItemStyle: {display: 'none'},
        }}
      />
      <Tab.Screen
        name="Detail Edukasi"
        component={EducationDetail}
        options={{
          headerShown: false,
          tabBarItemStyle: {display: 'none'},
        }}
      />
      <Tab.Screen
        name="Detail Profile"
        component={ProfileDetail}
        options={{
          headerShown: false,
          tabBarItemStyle: {display: 'none'},
        }}
      />
    </Tab.Navigator>
  );
}
