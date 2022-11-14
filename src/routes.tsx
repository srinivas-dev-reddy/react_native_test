/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {memo, useEffect, useState} from 'react';
import {Platform, View} from 'react-native';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';
// import ProfileItemView from './screens/Profile/ProfileItemView';
// import FontAwesomeIcon, {SolidIcons} from 'react-native-fontawesome';
import {SCREEN_MAP} from './util/navigation';
import Explore from './screens/explore/explore';
import {sizing} from './theme/sizing';
import {palette} from './theme/palette';
import {typography} from './theme';

import SplashScreen from './screens/splash';
import ExploreBusiness from './screens/business/explore-business';
import Wallet from './screens/wallet/wallet';
import VectorIcon, {fontSources} from './components/icon/icon';
import Profile from './screens/profile/profile';
import Portfolio from './screens/portfolio/portfolio';
import GLOBAL_STYLES from './theme/styles';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import RoyaltyFeed from './screens/business/royalty-feed';
import Login from './screens/auth/login';
import ConfirmOTP from './screens/auth/confirm-otp';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // background: 'transparent',
    // card: 'transparent',
  },
};

const TransitionScreen = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({
    current,
    next,
    layouts,
  }: {
    current: any;
    next: any;
    layouts: any;
  }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            translateX: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -layouts.screen.width],
                })
              : 1,
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
};

const CardOptions: any = {
  cardStyle: {
    backgroundColor: 'transparent',
    animation: 'slide_from_left',
    animationDuration: 400,
  },
  // ...TransitionScreen,
};

interface IconMapProp {
  [x: string]: {
    source: fontSources;
    iconName: string;
  };
}

const TabIconMap: IconMapProp = {
  [SCREEN_MAP.EXPLORE]: {
    source: 'font-awesome5',
    iconName: 'compass',
  },
  [SCREEN_MAP.PORTFOLIO]: {
    source: 'material-community',
    iconName: 'view-dashboard',
  },
  [SCREEN_MAP.WALLET]: {
    source: 'font-awesome5',
    iconName: 'wallet',
  },
  [SCREEN_MAP.PROFILE]: {
    source: 'font-awesome5',
    iconName: 'user',
  },
};

const Routes = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 2000);
  }, []);

  if (showSplashScreen) {
    return <SplashScreen />;
  }

  const HomeScreenTabs = () => {
    return (
      <Tab.Navigator
        initialRouteName={SCREEN_MAP.EXPLORE}
        screenListeners={{
          focus: e => {
            console.log(
              // e.data.closing ? 'Closed' : 'Opened',
              e.data,
              e.target,
              'at',
              new Date().toUTCString(),
            );
          },
        }}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            const {source, iconName = 'user'} = TabIconMap[route.name];
            const iconSize = sizing._2rem * 0.75;
            const focusedStyle = {
              shadowColor: palette.lightGrey,
              shadowOffset: {width: 5, height: 5},
              shadowOpacity: 0.8,
              shadowRadius: 1,
            };

            if (source === 'font-awesome5') {
              return (
                <VectorIcon
                  source={source}
                  style={[
                    {
                      fontSize: iconSize,
                    },
                  ]}
                  toAnimate={true}
                  focused={focused}
                  solid
                  name={iconName}
                  color={focused ? palette.primary : palette.lightGrey}
                  // color={focused ? theme.color.primary : theme.color.grey}
                />
              );
            }
            return (
              <VectorIcon
                source={source}
                style={[
                  {
                    fontSize: iconSize,
                    // ...(focused ? focusedStyle : {}),
                  },
                ]}
                toAnimate={true}
                focused={focused}
                name={iconName}
                color={focused ? palette.primary : palette.lightGrey}
                // color={focused ? theme.color.primary : theme.color.grey}
              />
            );
          },
          tabBarStyle: {
            backgroundColor: palette.white,
            borderTopColor: 'transparent',
            paddingVertical: 10,
            // paddingTop: 0,
            paddingBottom: 10,
            marginBottom: Platform.OS === 'ios' ? 10 : 0,
            height: 60,
          },
          tabBarInactiveTintColor: palette.lightGrey,
          tabBarActiveTintColor: palette.primary,
          tabBarLabelStyle: {
            fontFamily: typography.bold,
          },
          headerShown: false,
          tabBarShowLabel: false,
          style: {
            alignItems: 'center',
            height: '100%',
            flex: 1,
          },
        })}>
        <Tab.Screen component={Explore} name={SCREEN_MAP.EXPLORE} />
        <Tab.Screen component={Portfolio} name={SCREEN_MAP.PORTFOLIO} />
        <Tab.Screen component={Wallet} name={SCREEN_MAP.WALLET} />
        <Tab.Screen component={Profile} name={SCREEN_MAP.PROFILE} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        initialRouteName={
          SCREEN_MAP.LOGIN
          // isLoggedIn ? SCREEN_MAP.WAIT_LIST : SCREEN_MAP.USER_EDUCATION
        }
        screenOptions={{
          headerShown: false,
          // cardOverlayEnabled: false,
        }}
        screenListeners={{
          focus: e => {
            console.log(
              // e.data.closing ? 'Closed' : 'Opened',
              e.data,
              e.target,
              'at',
              new Date().toUTCString(),
            );
          },
          transitionEnd: e => {
            console.log(
              e.data.closing ? 'Closed' : 'Opened',
              e.target,
              'at',
              new Date().toUTCString(),
            );
          },
        }}>
        <Stack.Screen
          name={SCREEN_MAP.LOGIN}
          component={Login}
          options={CardOptions}
        />
        <Stack.Screen
          name={SCREEN_MAP.CONFIRM_OTP}
          component={ConfirmOTP}
          options={CardOptions}
        />
        <Stack.Screen
          name={SCREEN_MAP.HOME_SCREEN}
          component={HomeScreenTabs}
          options={CardOptions}
        />
        <Stack.Screen
          name={SCREEN_MAP.EXPLORE_BUSINESS}
          component={ExploreBusiness}
          options={{
            ...CardOptions,
          }}
        />
        <Stack.Screen
          name={SCREEN_MAP.ROYALTY_FEED}
          component={RoyaltyFeed}
          options={{
            ...CardOptions,
          }}
        />
        {/* <Stack.Screen
          name={SCREEN_MAP.WALLET}
          component={Wallet}
          options={CardOptions}
        /> */}
        {/* <Stack.Screen name={SCREEN_MAP.EXPLORE} component={Explore} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(Routes);
