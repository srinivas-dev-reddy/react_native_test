import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
// import openMap, {ShowOptions} from 'react-native-open-maps';
import {userDataProp} from './userData';
import {useToast} from 'react-native-toast-notifications';
// import {useWindowDimensions} from 'react-native';
// import STATIC_IMAGES from '../../util/images';
// import Toast from 'react-native-root-toast';
// import Spinner from '../../components/Spinner';

interface gState {
  user: userDataProp;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  [key: string]: object | undefined;
}

interface globalContext {
  globalState: gState;
  updateGlobalState(key: string, value: any): void;
  showToast(message: string): string;
  waitPromise: (time: number) => Promise<void>;
  //   showToast(message: string): void;
}
const GlobalContext = createContext<globalContext>({} as globalContext);

const GlobalProvider = ({children}: PropsWithChildren) => {
  const toast = useToast();
  // const {width, height} = useWindowDimensions();
  const [globalState, setGlobalState] = useState<gState>({} as gState);

  const updateGlobalState = (key: string, value: any) => {
    let currenState: gState = {...(globalState || {})};
    currenState[key] = value;
    setGlobalState(currenState);
  };

  const showToast = (message: string) => {
    // Alert.alert(message);
    toast.hideAll();
    return toast.show(message);

    // if (Platform.OS === 'android') {
    //   // console.log('WHy???');
    //   ToastAndroid.show(message, ToastAndroid.SHORT);
    //   // ToastAndroid.showWithGravityAndOffset(
    //   //   message,
    //   //   ToastAndroid.LONG,
    //   //   ToastAndroid.BOTTOM,
    //   //   25,
    //   //   50,
    //   // );
    // } else {
    //   Alert.alert(message);
    // }
  };

  /**
   *
   * @param time : time in secs
   * @returns void
   */
  const waitPromise = (time: number) => {
    return new Promise<void>(s => {
      setTimeout(() => {
        s();
      }, time * 1000);
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        globalState,
        updateGlobalState,
        showToast,
        waitPromise,
      }}>
      {/* <Spinner animating={Boolean(requestsFetching)} /> */}
      {children}
    </GlobalContext.Provider>
  );
};

function useGlobal(): globalContext {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useGlobal must be used within an GlobalProvider');
  }

  return context;
}

export {GlobalProvider, GlobalContext, useGlobal};
