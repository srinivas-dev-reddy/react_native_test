/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Platform,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import FocusAwareStatusBar from '../../components/focus-aware-status-bar/focus-aware-status-bar';
// import {login, sendOTP} from '../../API/requests';
// import Spinner from '../../components/Spinner';
import {useAuth} from '../../context/auth/auth';
import {useGlobal} from '../../context/global/global';
import {color, typography} from '../../theme';
import GLOBAL_STYLES from '../../theme/styles';
import {SCREEN_MAP, vaapasNavigation} from '../../util/navigation';

const greyColor = color.palette.lightGrey;

interface ItemProps {
  image: any;
  illustration: string;
  text: string;
  imageStyle?: {[key: string]: any};
  textStyle?: {[key: string]: any};
}

interface RenderItemProps {
  item: ItemProps;
  index: number;
}

interface Props {
  style?: {[key: string]: any};
  navigation: any;
  route: any;
}

const {width: screenWidth} = Dimensions.get('window');

const waitTimeForNextOTP = 5 * 60;

const ConfirmOTP = (props: Props) => {
  const {phone_number} = props.route?.params || '';
  if (!phone_number) {
    vaapasNavigation(props.navigation, SCREEN_MAP.LOGIN);
  }
  const [isFetching, setIsFetching] = useState(false);
  const [lastOtpTime, setLastOtpTime] = useState<Date | null>(new Date());
  const {updateGlobalState, showToast} = useGlobal();
  const {signIn, request} = useAuth();
  let otpRefs = [];
  for (let i = 0; i < 6; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    otpRefs.push(useRef(i));
  }
  const [otp, setOTP] = useState(Array(6).fill(''));
  const [otpTextRefs, setOTPTextRefs] = useState(otpRefs);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (secondsLeft === waitTimeForNextOTP) {
      function countSeconds() {
        let s = secondsLeft;
        let counter = setInterval(() => {
          s = s - 1;
          if (s) {
            setSecondsLeft(s);
          } else {
            setSecondsLeft(0);
            clearInterval(counter);
          }
        }, 1000);
      }
      countSeconds();
    }
  }, [secondsLeft]);

  const handleSendOTP = () => {
    if (secondsLeft) {
      showToast(`Please wait ${secondsLeft} secs`);
      return;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (phone_number.match(phoneRegex)) {
      //   setIsFetching(true);
      //   sendOTP(phone_number)
      //     .then(() => {
      //       setIsFetching(false);
      //       setSecondsLeft(waitTimeForNextOTP);
      //       showToast('OTP sent');
      //     })
      //     .catch((err: any) => {
      //       setIsFetching(false);
      //       console.warn(err);
      //       showToast('Check your mobile number and try again!');
      //     });
    } else {
      showToast('Invalid mobile number');
    }
  };

  const handleLogin = () => {
    // vaapasNavigation(props.navigation, SCREEN_MAP.WAIT_LIST, {});
    // return;
    const OTP = otp.join('');
    if (OTP.length !== 6) {
      showToast('Invalid OTP');
      return;
    }
    vaapasNavigation(props.navigation, SCREEN_MAP.HOME_SCREEN, {});
    // setIsFetching(true);
    // request('auth/verifyOTP', 'POST', {
    //   phoneNumber: phone_number,
    //   OTP: OTP,
    // })
    //   .then((data: {token: string}) => {
    //     setIsFetching(false);
    //     let newData = {
    //       ...data,
    //     };
    //     signIn(newData);
    //   })
    //   .catch((err: any) => {
    //     setIsFetching(false);
    //     showToast(err.message || 'Please try again after sometime');
    //   });
  };

  const renderOTPInputs = () => {
    const inputs = [...otp];
    const marginBetween = 4;

    const txt = inputs.map((i, j) => {
      return (
        <View
          key={j}
          style={[
            GLOBAL_STYLES.flex,
            GLOBAL_STYLES.grow,
            {
              // width: 54,
              // height: 48,
              backgroundColor: color.palette.primary_light,
              borderWidth: 1,
              borderColor: 'white',
              marginLeft: j === 0 ? 0 : marginBetween,
              marginRight: j + 1 === inputs.length ? 0 : marginBetween,
              // margin: 10,
              borderRadius: 4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <TextInput
            style={[
              {
                fontSize: 20,
                padding: 12,
                color: 'black',
                fontFamily: typography.bold,
                textAlign: 'center',
                borderColor: color.palette.black,
                borderRadius: 4,
                // paddingBottom:20
              },
            ]}
            key={j}
            keyboardType={'numeric'}
            textAlign={'center'}
            onChangeText={v => focusNext(j, v)}
            onKeyPress={e => {
              e.preventDefault();
              focusPrevious(e.nativeEvent.key, j);
            }}
            value={otp[j]}
            onFocus={() => {
              let otpData = [...otp];
              otpData[j] = '';
              setOTP(otpData);
            }}
            placeholder={''}
            maxLength={1}
            placeholderTextColor={greyColor}
            underlineColorAndroid="transparent"
            ref={otpTextRefs[j]}
          />
        </View>
      );
    });
    return txt;
  };

  const focusPrevious = (key: string, index: number) => {
    if (key === 'Backspace' && index !== 0) {
      otpTextRefs[index - 1].current.focus();
    }
  };

  const focusNext = (index: number, value: string) => {
    if (index < otpTextRefs.length - 1 && value) {
      otpTextRefs[index + 1].current.focus();
    }
    if (index === otpTextRefs.length - 1) {
      otpTextRefs[index].current.blur();
    }
    let otpData = [...otp];
    otpData[index] = value;
    setOTP(otpData);
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle={'dark-content'} />
      {/* Status Bar configuration */}
      {/* <View style={{ flex: 4 }}> */}
      {/* Part One */}
      <View
        style={{
          flex: 3,
          display: 'flex',
          // backgroundColor: color.palette.primary_bg_2,
        }}>
        <View style={{padding: '4%'}}>
          <Text
            style={{
              fontSize: 21,
              color: color.palette.black,
              fontFamily: typography.bold,
              paddingTop: '10%',
            }}>
            Confirm your number
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingVertical: 20,
            }}>
            {renderOTPInputs()}
          </View>
          <View style={[GLOBAL_STYLES.flexRow, GLOBAL_STYLES.spaceBetween]}>
            <Text
              style={[
                styles.terms,
                {
                  fontFamily: typography.primary,
                },
              ]}>
              OTP sent to{' '}
              <Text
                style={[
                  GLOBAL_STYLES.bold,
                  styles.terms,
                  {color: color.palette.primary},
                ]}>
                +91 {phone_number}
              </Text>
            </Text>
            <View>
              <Text
                onPress={() => {
                  vaapasNavigation(props.navigation, SCREEN_MAP.LOGIN, {});
                }}
                style={[
                  GLOBAL_STYLES.bold,
                  styles.terms,
                  {color: color.palette.primary},
                ]}>
                Change
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              handleLogin();
            }}
            style={{width: '100%'}}>
            <View
              //   colors={['#00FF55', '#BBFD08']}
              //   start={{x: 0, y: 1}}
              //   end={{x: 1, y: 0}}
              style={styles.button}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: typography.bold,
                  fontSize: 16,
                }}>
                Verify
              </Text>
            </View>
          </TouchableOpacity>
          {/* <Text style={styles.alreadyMember}>RESEND OTP</Text> */}
        </View>
      </View>

      {/* <Spinner animating={true}/> */}
    </View>
  );
};

export default ConfirmOTP;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    // backgroundColor: color.palette.primary_bg,
    backgroundColor: color.palette.white,
    height: '100%',
    width: '100%',
  },
  help: {
    position: 'absolute',
    right: 10,
    fontWeight: '900',
    flexDirection: 'row',
    top: 75,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    borderWidth: 1,
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    // backgroundColor: "white",
    borderRadius: 8,
  },
  backgroundImage: {
    flex: 4,
  },
  image: {
    resizeMode: 'contain',
    width: 90,
    height: 90,
    marginTop: 50,
    marginLeft: 20,
  },
  questionIcon: {
    color: color.palette.primary,
  },
  helperIcon: {
    color: color.palette.primary,
    textAlignVertical: 'center',
    top: 15,
  },
  title: {marginTop: '5%', textAlign: 'center', color: 'white'},
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: color.palette.primary,
    backgroundColor: color.palette.black,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    height: 48,
    fontWeight: 'bold',
    padding: 10,
    paddingLeft: 20,
    color: color.palette.black,
    fontFamily: 'Gilroy-Bold',
    flexGrow: 1,
  },
  terms: {
    color: color.palette.lightGrey,
    paddingBottom: 20,
    fontSize: 14,
  },
  primayColor: {
    color: color.palette.black,
  },
  button: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: color.palette.primary,
    height: 48,
    fontFamily: 'Gilroy-Bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  alreadyMember: {
    color: color.palette.black,
    paddingTop: 20,
    fontFamily: 'Gilroy-Bold',
    fontSize: 12,
  },
  loginText: {
    color: color.palette.primary,
    textDecorationLine: 'underline',
  },
});
