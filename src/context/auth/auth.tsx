/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import {useGlobal} from '../global/global';
import {BASE_URL} from '../../util/const';
import {storeData, getStoredData} from '../../util/storage';
import DeviceInfo from 'react-native-device-info';
import {
  Alert,
  Linking,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {VersionResp} from '../../interfaces/version';
import {compareVersions, routeToStore} from '../../util/helper';
import {User} from '../../interfaces/user';
import defaultUser from '../../test-data/user';

type methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type AuthContextData = {
  authData: AuthData;
  loading: boolean;
  signIn(data: any, authenticated?: boolean): Promise<void>;
  signOut(): void;
  isLoggedIn: boolean;
  isOptionalUpdateAvailable: boolean;
  updateUserData(data: User): Promise<void>;
  request(URL: string, method: methods, data?: any): Promise<any>;
  authRequest(URL: string, method: methods, data?: any): Promise<any>;
  formAuthRequest(URL: string, method: methods, data: any): Promise<any>;
  formRequest(URL: string, method: methods, data: any): Promise<any>;
};

type AuthData = {
  access: string;
  user: typeof defaultUser;
};

const defaultAuth: AuthData = {
  access: '',
  user: defaultUser,
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({children}: React.PropsWithChildren) => {
  const {showToast} = useGlobal();
  const [authData, setAuthData] = useState<AuthData>(defaultAuth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {updateGlobalState, waitPromise} = useGlobal();

  //The loading part will be explained in the persist step session
  const [loading, setLoading] = useState(true);
  const [showRequiredUpdateModal, setShowRequiredUpdateModal] = useState(false);
  const [isOptionalUpdateAvailable, setIsOptionalUpdateAvailable] =
    useState(false);

  const getVersionFromServer = useCallback(async () => {
    return;
    const isEmulator = await DeviceInfo.isEmulator();
    // if (isEmulator) return;
    const currentVersion = DeviceInfo.getVersion();
    request(`version/${Platform.OS}`, 'GET', {})
      .then((data: VersionResp) => {
        console.log(data);
        if (!(data.required || data.optional)) {
          return;
        }

        if (data.required) {
          console.log('In required');
          const v = data.required;
          if (compareVersions(v.versionString, currentVersion)) {
            console.log('Required update');
            return setShowRequiredUpdateModal(true);
          }
        }

        if (data.optional) {
          const v = data.optional;
          if (compareVersions(v.versionString, currentVersion)) {
            console.log('Optional update');
            return setIsOptionalUpdateAvailable(true);
          }
        }
      })
      .catch(_err => {});
  }, [request]);

  useEffect(() => {
    console.log('App Auth');
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    async function startSetup() {
      console.log('\n\n\n\n\n\n\nStartup setup running!\n\n\n\n\n\n\n\n');
      let token: string = await getStoredData('access_token');
      if (!token) {
        return;
      }
      let storedUser: any = defaultUser;
      setAuthData({
        access: token,
        user: storedUser,
      });

      updateGlobalState('user', storedUser);
      if (storedUser && token) {
        setIsLoggedIn(true);
      }
    }
    startSetup();

    getVersionFromServer();
  }, []);

  const addDeviceToUser = useCallback(async () => {
    return;
    const deviceId = await DeviceInfo.getUniqueId();
    const deviceName = await DeviceInfo.getDeviceName();

    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
    let lastFcmSaveDate: Date =
      (await getStoredData('fcmSaveDate')) || new Date();
    const deviceData = {
      deviceId,
      OS: Platform.OS,
      version: String(Platform.Version),
      fcmtoken: fcmtoken,
      lastFcmSaveDate: lastFcmSaveDate,
    };
    if (fcmtoken && isLoggedIn) {
      authRequest('user/device', 'POST', deviceData)
        .then(() => {
          console.log('User device link success');
        })
        .catch(_err => {
          console.log('User device link failed', deviceData);
        });
    }
  }, [authRequest, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      // Add Device to User
      addDeviceToUser();
    }
  }, [isLoggedIn]);

  const requestValidation = useCallback(async (resp: any) => {
    if (resp.status === 401) {
      signOut();
      return null;
    }
    let res = await resp.json();
    if (resp.status === 405) {
      console.log(res);
      throw new Error('Invalid Method');
    }
    if (resp.status > 399) {
      console.log(res);
      if (res.message) {
        if (Array.isArray(res.message)) {
          throw new Error(res.message.join('\n'));
        } else {
          throw new Error(res.message);
        }
      } else {
        throw new Error('failed');
      }
    }
    return res;
  }, []);

  const _request = useCallback(
    async (
      URL: string,
      method: methods,
      data?: any,
      isAuthNeeded = false,
      formData = false,
    ) => {
      let token = await getStoredData('access_token');
      if (isAuthNeeded) {
        // Auth required request
        if (formData) {
          return fetch(BASE_URL + URL, {
            method: method,
            body:
              method !== 'GET'
                ? formData
                  ? data
                  : JSON.stringify(data || {})
                : undefined,
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }).then(resp => {
            return requestValidation(resp);
          });
        } else {
          return fetch(BASE_URL + URL, {
            method: method,
            body:
              method !== 'GET'
                ? formData
                  ? data
                  : JSON.stringify(data || {})
                : undefined,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }).then(resp => {
            return requestValidation(resp);
          });
        }
      } else {
        // Not auth request
        if (formData) {
          return fetch(BASE_URL + URL, {
            method: method,
            body:
              method !== 'GET'
                ? formData
                  ? data
                  : JSON.stringify(data || {})
                : undefined,
            headers: {
              Accept: 'application/json',
            },
          }).then(resp => {
            return requestValidation(resp);
          });
        } else {
          return fetch(BASE_URL + URL, {
            method: method,
            body: method !== 'GET' ? JSON.stringify(data || {}) : undefined,
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }).then(resp => {
            return requestValidation(resp);
          });
        }
      }
    },
    [requestValidation],
  );

  const request = useCallback(
    async (
      URL: string,
      method: methods,
      data?: any,
      isAuthNeeded = false,
      formData = false,
    ) => {
      const promises = [];
      promises.push(waitPromise(0.1));
      promises.push(_request(URL, method, data, isAuthNeeded, formData));
      return Promise.all(promises).then(_data => {
        return _data[1];
      });
    },
    [_request, waitPromise],
  );

  const authRequest = useCallback(
    (URL: string, method: methods, data?: any) => {
      return request(URL, method, data, true);
    },
    [request],
  );

  function formAuthRequest(URL: string, method: methods, data: any) {
    return request(URL, method, data, true, true);
  }

  function formRequest(URL: string, method: methods, data: any) {
    return request(URL, method, data, false, true);
  }

  const signIn = async (data: any, authenticated = false) => {
    setAuthData(data);
    if (authenticated) {
      setIsLoggedIn(true);
    }
    if (data.token) {
      await storeData('access_token', data.token);
      await storeData('user', data.user);
      updateGlobalState('user', data.user);
      setIsLoggedIn(true);
    }
  };

  const updateUserData = async (data: User) => {
    if (authData) {
      const a = {...authData};
      a.user = data;
      setAuthData(a);
      await storeData('user', data);
      updateGlobalState('user', data);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      updateGlobalState('user', null);
    }
  }, [isLoggedIn]);

  const signOut = async () => {
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    console.log('Signed Out');
    setAuthData(defaultAuth);
    await storeData('access_token', null);
    await storeData('user', null);
    showToast('Logged Out');
    setIsLoggedIn(false);
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider
      value={{
        authData,
        loading,
        signIn,
        signOut,
        isLoggedIn,
        request,
        authRequest,
        formAuthRequest,
        formRequest,
        updateUserData,
        isOptionalUpdateAvailable,
      }}>
      {/* <Modal visible={showRequiredUpdateModal}>
        <View
          style={[GLOBAL_STYLES.flex, GLOBAL_STYLES.center, styles.container]}>
          <View style={[styles.updateContainer]}>
            <Text
              style={[
                GLOBAL_STYLES.bold,
                {
                  color: 'white',
                  marginVertical: 10,
                  fontSize: theme.size._r * 2,
                },
              ]}>
              Major update released
            </Text>
            <Pressable
              onPress={routeToStore}
              style={[
                styles.button,
                GLOBAL_STYLES.flexRow,
                GLOBAL_STYLES.center,
              ]}>
              <Text
                style={[
                  GLOBAL_STYLES.grow,
                  GLOBAL_STYLES.center,
                  GLOBAL_STYLES.bold,
                  {textAlign: 'center'},
                ]}>
                Please Update
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

// export const AuthProvider = _AuthProvider;
export {AuthProvider, AuthContext, useAuth};
