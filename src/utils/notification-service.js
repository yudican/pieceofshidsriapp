import PushNotification, {Importance} from 'react-native-push-notification';
import ReactNativeAN from 'react-native-alarm-notification';
import {PermissionsAndroid, Platform} from 'react-native';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

export const configureNotification = () => {
  PushNotification.configure({
    onAction: handleNotification,
    popInitialNotification: true,
    requestPermissions: true,
  });
};
export const scheduleNotification = async (
  date = new Date(),
  title = 'Alarm Ringing',
  message = 'Message Here',
) => {
  const dateTime = new Date(date);
  const fireDate = dateTime;

  const alarmNotifData = {
    channel: 'my_channel_id',
    ticker: 'My Notification Message',

    id: 1,
    title,
    message,
    vibrate: true,
    vibration: 100,
    small_icon: 'ic_launcher',
    large_icon: 'ic_launcher',
    color: 'red',
    loop_sound: true,
    has_button: true,
    // sound_name: 'alarm.mp3',
    volume: 1,
    bypass_dnd: true,
    data: {foo: 'bar'},
  };

  await ReactNativeAN.scheduleAlarm({
    ...alarmNotifData,
    fire_date: ReactNativeAN.parseDate(fireDate),
  });

  PushNotification.localNotificationSchedule({
    channelId: 'my_channel_id',
    title: alarmNotifData.title,

    id: alarmNotifData.id,
    message: alarmNotifData.message,
    date: fireDate,
    actions: ['Snooze', 'Stop Alarm'],
    importance: Importance.HIGH,
    // repeatType: 'minute',
    playSound: false,
    vibration: 1000,
    soundName: 'alarm.mp3',
    allowWhileIdle: true,
    invokeApp: true,
    repeatTime: 1,
    repeatType: 'time',
    allowWhileIdle: false,
  });
};
export const createChannelNotification = () => {
  PushNotification.createChannel({
    channelId: 'my_channel_id',
    channelName: 'my_channel_id',
    onNotification: handleNotification,
  });
};
export const requestNotificationPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Notification Permission',
          message: 'Allow this app to send you notifications.',
          buttonPositive: 'OK',
        },
      );

      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        createChannelNotification();
        // scheduleNotification();
      } else {
        console.log('Notification permission denied');
      }
    } else {
      const result = await request(PERMISSIONS.IOS.NOTIFICATIONS);
      if (result === RESULTS.GRANTED) {
        createChannelNotification();
        // scheduleNotification();
      } else {
        console.log('Notification permission denied');
      }
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
  }
};

export const handleNotification = notification => {
  return ReactNativeAN.stopAlarmSound();
};
