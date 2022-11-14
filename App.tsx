/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ToastProvider} from 'react-native-toast-notifications';

import {AuthProvider} from './src/context/auth/auth';
import {GlobalProvider} from './src/context/global/global';
import Routes from './src/routes';
import {
  requestUserPermission,
  getFCMToken,
  notificationListener,
} from './src/util/push-notification-helper';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  useEffect(() => {
    requestUserPermission();
    getFCMToken();
    notificationListener();
    console.log('In App');
  }, []);

  return (
    <ToastProvider offset={50}>
      <GlobalProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </GlobalProvider>
    </ToastProvider>
  );
};

export default App;
