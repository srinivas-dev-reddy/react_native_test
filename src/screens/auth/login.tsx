/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  StatusBar,
  Keyboard,
} from 'react-native';
import {SafeAreaView, Dimensions} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import {useGlobal} from '../../context/global/global';
import {vaapasNavigation, SCREEN_MAP} from '../../util/navigation';
import {useAuth} from '../../context/auth/auth';
import GLOBAL_STYLES from '../../theme/styles';
import {color, typography} from '../../theme';
import {Button} from '../../components/button/button';
import Text from '../../components/text/text';
import FocusAwareStatusBar from '../../components/focus-aware-status-bar/focus-aware-status-bar';
import SplashScreen from '../splash';
import {sizing} from '../../theme/sizing';

const {height: screenHeight, width: screenWidth} = Dimensions.get('screen');
const bottomNavHeight = 250;

interface Props {
  style?: {[key: string]: any};
  navigation: any;
}

const Login = (props: Props) => {
  const [phoneNo, setPhoneNo] = useState('');
  const {showToast} = useGlobal();
  const {request} = useAuth();
  const [requestFetching, setRequestFetching] = useState(false);

  useEffect(() => {
    if (phoneNo.length == 10) {
      Keyboard.dismiss();
    }
  }, [phoneNo]);

  const handleSendOTP = () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (phoneNo.match(phoneRegex)) {
      vaapasNavigation(props.navigation, SCREEN_MAP.CONFIRM_OTP, {
        phone_number: phoneNo,
      });
      //   setRequestFetching(true);
      //   request('auth/sendOTP', 'POST', {phoneNumber: phoneNo})
      //     .then(() => {
      //       setRequestFetching(false);
      //       vaapasNavigation(props.navigation, SCREEN_MAP.CONFIRM_OTP, {
      //         phone_number: phoneNo,
      //       });
      //     })
      //     .catch((_err: any) => {
      //       // console.log(err.message);
      //       setRequestFetching(false);
      //       showToast('Check your mobile number and try again!');
      //     });
    } else {
      showToast('Phone number should be numeric and 10 digits');
    }
  };
  return (
    <SafeAreaView>
      <FocusAwareStatusBar barStyle={'dark-content'} />
      <View style={[GLOBAL_STYLES.flex, {width: '100%', height: '100%'}]}>
        <View
          style={[
            GLOBAL_STYLES.grow,
            GLOBAL_STYLES.flex,
            GLOBAL_STYLES.center,
            {
              // backgroundColor: '#000000',
              // backgroundColor: theme.color.primary_bg_2,
              minWidth: screenWidth,
              // minHeight: screenHeight - bottomNavHeight,
            },
          ]}>
          <View style={[{width: '70%'}]}>
            <View>
              <Text text={'Caset'} preset={'header'} />
            </View>
          </View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View
            style={[
              GLOBAL_STYLES.flex,
              GLOBAL_STYLES.spaceBetween,
              {
                minHeight: bottomNavHeight,
                position: 'relative',
                backgroundColor: color.palette.primary,
                paddingHorizontal: 24,
                paddingVertical: 15,
              },
            ]}>
            <Text style={[styles.headingText]}>Register now</Text>
            <Text style={[GLOBAL_STYLES.bold, {color: '#E8BB7F'}]}>
              {/* Enter your phone number */}
            </Text>
            <KeyboardAvoidingView
              // behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
              style={
                {
                  // flex: 1,
                }
              }>
              <View
                style={[
                  GLOBAL_STYLES.flexRow,
                  GLOBAL_STYLES.center,
                  {
                    height: 56,
                    width: '100%',
                    backgroundColor: color.palette.primary_light,
                    borderRadius: 4,
                    marginVertical: 10,
                    paddingHorizontal: 12,
                  },
                ]}>
                <Text
                  style={[
                    {fontFamily: typography.bold, fontSize: 14, color: 'black'},
                  ]}>
                  +91
                </Text>
                <TextInput
                  keyboardType={'numeric'}
                  onChangeText={text => {
                    const phoneRegex = /^[0-9]{0,}$/;
                    if (text.match(phoneRegex)) {
                      setPhoneNo(text);
                    }
                  }}
                  value={phoneNo}
                  maxLength={10}
                  style={[
                    {
                      flexGrow: 1,
                      marginLeft: 10,
                      color: 'black',
                      fontFamily: typography.bold,
                      fontSize: sizing._1rem * 0.75,
                    },
                  ]}
                  placeholder="Enter 10 digit mobile number"
                  placeholderTextColor={'#414141'}
                />
              </View>
            </KeyboardAvoidingView>
            <Button
              text="Register"
              onPress={() => {
                handleSendOTP();
              }}
              style={[
                {
                  backgroundColor: color.palette.primary_light,
                },
              ]}
              textStyle={[
                {
                  color: 'black',
                  fontWeight: 'bold',
                },
              ]}
            />
            <Text
              //   onPress={() => {
              //     vaapasNavigation(
              //       props.navigation,
              //       SCREEN_MAP.PRIVACY_POLICY,
              //       {},
              //     );
              //   }}
              style={[
                GLOBAL_STYLES.bold,
                {color: 'white', paddingVertical: 10},
              ]}>
              Privacy Policy
            </Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: color.palette.black,
  },
  headingText: {
    fontFamily: typography.bold,
    fontSize: sizing._1rem,
    color: '#FDFDFD',
  },
  infoText: {
    flexShrink: 1,
    marginHorizontal: 10,
    paddingHorizontal: 30,
    textAlign: 'center',
  },
  section: {
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
  },
  dot: {
    width: 11,
    height: 11,
    backgroundColor: '#AAAAAA',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  currentDot: {
    backgroundColor: '#FFFFFF',
  },
});

export default Login;
