import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AuthNav from './AuthNavigation';
import RootNavigation from './RootNavigation';

export default function Navigation() {
  const isLoggin = useSelector(state => state.auth.isLoggin);

  return (
    <NavigationContainer>
      {isLoggin ? <RootNavigation /> : <AuthNav />}
    </NavigationContainer>
  );
}
