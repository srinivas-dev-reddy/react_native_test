import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {getStoredData, storeData} from './storage';
import {BASE_URL} from './const';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export async function getFCMToken() {
  console.log(
    'Device Details',
    await DeviceInfo.getUniqueId(),
    await DeviceInfo.getDevice(),
    await DeviceInfo.getDeviceName(),
  );
  const deviceId = await DeviceInfo.getUniqueId();
  const deviceName = await DeviceInfo.getDeviceName();

  let fcmtoken = await AsyncStorage.getItem('fcmtoken');
  let lastFcmSaveDate: Date =
    (await getStoredData('fcmSaveDate')) || new Date();

  console.log(lastFcmSaveDate);
  const validTillDate = new Date(lastFcmSaveDate);
  validTillDate.setMonth(validTillDate.getMonth() + 1);

  if (!fcmtoken || !lastFcmSaveDate || validTillDate < new Date()) {
    fcmtoken = await messaging().getToken();
    if (fcmtoken) {
      console.log('FcmToken', fcmtoken);
      await AsyncStorage.setItem('fcmtoken', fcmtoken);
      await storeData('fcmSaveDate', new Date());

      //   call server to register the new token with user
    } else {
      console.error('Something went wrong');
    }
  }

  const deviceData = {
    deviceId,
    OS: Platform.OS,
    version: String(Platform.Version),
    fcmtoken: fcmtoken,
    lastFcmSaveDate: new Date(),
  };
  console.log('Device data', deviceData);
  // fetch(BASE_URL + 'device', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(deviceData),
  // })
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log('Device Added', data);
  //   })
  //   .catch(() => {
  //     console.error('Device Adding Failed');
  //   });

  console.log(Platform.OS, fcmtoken);
}

export function notificationListener() {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async _remoteMessage => {
    console.log('Notification on foreground state');
  });
  messaging().setBackgroundMessageHandler(async _remoteMessage => {
    console.log('Handling background messages');
  });
}
