import React, {useEffect} from 'react';
import {NativeEventEmitter, NativeModules, StatusBar} from 'react-native';
import ReactNativeAN from 'react-native-alarm-notification';
import BackgroundFetch from 'react-native-background-fetch';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import Navigation from './src/navigation/Navigation';
import {store} from './src/redux/Store';
import {
  configureNotification,
  requestNotificationPermission,
  scheduleNotification,
} from './src/utils/notification-service';

const {RNAlarmNotification} = NativeModules;
const RNAlarmEmitter = new NativeEventEmitter(RNAlarmNotification);

const App = props => {
  const initBackGroundFetch = () => {
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 1, // <-- minutes (15 is minimum allowed)
        // Android options
        forceAlarmManager: true, // <-- Set true to bypass JobScheduler.
        stopOnTerminate: true,
        startOnBoot: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY, // Network connection needed
      },
      async taskId => {
        console.log(taskId);
        // Do stuff with notifications, for example:
        const dateTime = new Date();
        dateTime.setHours(7, 0, 0); // akan dijalankan setiap pukul 07:00:00
        await scheduleNotification(dateTime, 'Alarm Ringing', 'Message Here');
        BackgroundFetch.finish(taskId);
      },
      error => {
        console.log('[js] RNBackgroundFetch failed to start');
      },
    );
  };

  useEffect(() => {
    SplashScreen.hide();
    ReactNativeAN.stopAlarmSound();
    requestNotificationPermission();
    configureNotification();
    initBackGroundFetch();

    const dismissSubscription = RNAlarmEmitter.addListener(
      'OnNotificationDismissed',
      data => console.log(JSON.parse(e)),
    );

    const openedSubscription = RNAlarmEmitter.addListener(
      'OnNotificationOpened',
      data => console.log(JSON.parse(e)),
    );

    return () => {
      dismissSubscription.remove();
      openedSubscription.remove();
    };
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
      <StatusBar style="auto" />
    </Provider>
  );
};

export default App;
