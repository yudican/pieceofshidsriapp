import React from 'react';
import {Button, Text, View} from 'react-native';

export default function Alarm() {
  // async function onDisplayNotification() {
  //   // Request permissions (required for iOS)
  //   await notifee.requestPermission()

  //   // Create a channel (required for Android)
  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default Channel',
  //   });

  //   // Display a notification
  //   await notifee.displayNotification({
  //     title: 'Notification Title',
  //     body: 'Main body content of the notification',
  //     android: {
  //       channelId,
  //       smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
  //       // pressAction is needed if you want the notification to open the app when pressed
  //       pressAction: {
  //         id: 'default',
  //       },
  //     },
  //   });
  // }

  async function listTriggerNotification() {
    // notifee.getTriggerNotificationIds().then(ids => {
    //   // setData(ids);
    //   if(ids.length <= 0){
    //     console.log('kosong');
    //   }else{
    //     console.log(ids);
    //   }
    // });
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>tes</Text>
      <Button onPress={() => listTriggerNotification()} title="Check"></Button>
      {/* <Button onPress={() => notifee.cancelNotification('1')} title="Delete"></Button> */}
    </View>
  );
}
