/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useDeferredValue} from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../../components/button/button';
import Divider from '../../components/divider/divider';
import FocusAwareStatusBar from '../../components/focus-aware-status-bar/focus-aware-status-bar';
import VectorIcon from '../../components/icon/icon';
import Text from '../../components/text/text';
import {useAuth} from '../../context/auth/auth';
import {useGlobal} from '../../context/global/global';
import {color, spacing} from '../../theme';
import {palette} from '../../theme/palette';
import {sizing} from '../../theme/sizing';
import GLOBAL_STYLES from '../../theme/styles';
import {SCREEN_MAP, vaapasNavigation} from '../../util/navigation';

const Profile = () => {
  const navigation = useNavigation();
  const {signOut} = useAuth();
  const {width} = useWindowDimensions();
  const {top} = useSafeAreaInsets();
  const scrolledY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event, ctx) => {
    const {x, y} = event.contentOffset;
    scrolledY.value = y;
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX:
            scrolledY.value > 80
              ? 10
              : interpolate(scrolledY.value, [0, 80], [width / 2 - 25, 10]),
        },
        {
          translateY: Math.min(
            interpolate(scrolledY.value, [0, 40], [0, 20]),
            20,
          ),
        },
      ],
    };
  });

  const animatedHeader = useAnimatedStyle(() => {
    const MIN_HEIGHT = 130;
    const h =
      scrolledY.value > 80
        ? MIN_HEIGHT
        : Math.max(
            interpolate(scrolledY.value, [0, 80], [200, MIN_HEIGHT]),
            MIN_HEIGHT,
          );
    return {
      height: h,
      maxHeight: h,
      minHeight: h,
    };
  });

  const animatedText = useAnimatedStyle(() => {
    return scrolledY.value > 80
      ? {
          opacity: withTiming(1, {duration: 500}),
        }
      : {
          opacity: withTiming(0, {duration: 200}),
        };
  });

  return (
    <SafeAreaView>
      <FocusAwareStatusBar
        barStyle={'light-content'}
        backgroundColor={palette.primary}
      />
      <Animated.View
        style={[
          style.headerStyle,
          animatedHeader,
          {
            backgroundColor: palette.primary,
            width: '100%',
            zIndex: 10,
            paddingTop: 20,
            paddingBottom: 20,
          },
        ]}>
        <Animated.View
          style={[
            animatedHeaderStyle,
            {
              top: '30%',
              justifyContent: 'center',
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: color.palette.primary_light,
            },
          ]}>
          <VectorIcon style={[GLOBAL_STYLES.center]} name="user" />
        </Animated.View>
        <Animated.Text
          style={[
            GLOBAL_STYLES.bold,
            {
              position: 'absolute',
              top: top + 25,
              left: '20%',
              fontSize: sizing._1rem * 1.5,
              color: color.palette.white,
              transform: [
                {
                  translateX: 0,
                },
                {
                  translateY: 0,
                },
              ],
            },
            animatedText,
          ]}>
          John Doe
        </Animated.Text>
      </Animated.View>
      {/* <View style={[{height: Platform.OS === 'android' ? 50 : 0}]} /> */}
      <Animated.ScrollView
        style={[
          style.container,
          GLOBAL_STYLES.pagePadding,
          {position: 'relative'},
        ]}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        bounces={false}
        onScroll={scrollHandler}>
        <View style={[{height: 160}]} />
        <View
          style={[
            GLOBAL_STYLES.verticalMargin,
            GLOBAL_STYLES.verticalPadding,
            GLOBAL_STYLES.horizontalPadding,
            style.testContainer,
            // GLOBAL_STYLES.center,
          ]}>
          <Text
            text="Personal Information"
            preset="bold"
            style={[style.headerText]}
          />
          <Divider type={'horizontal'} scaleX={1} />
          <View>
            <View style={[style.formGroup]}>
              <Text
                text={'Name'}
                preset={'secondary'}
                style={[style.fieldLabelText]}
              />
              <Text
                text={'John Doe'}
                preset={'bold'}
                style={[style.fieldValueText]}
              />
            </View>
            <View style={[style.formGroup]}>
              <Text
                text={'Email'}
                preset={'secondary'}
                style={[style.fieldLabelText]}
              />
              <Text
                text={'john@doe.com'}
                preset={'bold'}
                style={[style.fieldValueText]}
              />
            </View>
          </View>
        </View>
        <View
          style={[
            GLOBAL_STYLES.verticalMargin,
            GLOBAL_STYLES.verticalPadding,
            GLOBAL_STYLES.horizontalPadding,
            style.testContainer,
            // GLOBAL_STYLES.center,
          ]}>
          <Text
            text="Account Information"
            preset="bold"
            style={[style.headerText]}
          />
          <Divider type={'horizontal'} scaleX={1} />
          <View>
            <View style={[style.formGroup]}>
              <Text
                text={'Bank Account'}
                preset={'secondary'}
                style={[style.fieldLabelText]}
              />
              <Text
                text={'123456789012345'}
                preset={'bold'}
                style={[style.fieldValueText]}
              />
            </View>
            <View style={[style.formGroup]}>
              <Text
                text={'IFSC code'}
                preset={'secondary'}
                style={[style.fieldLabelText]}
              />
              <Text
                text={'INR000123'}
                preset={'bold'}
                style={[style.fieldValueText]}
              />
            </View>
          </View>
        </View>
        <View
          style={[
            GLOBAL_STYLES.verticalMargin,
            GLOBAL_STYLES.verticalPadding,
            GLOBAL_STYLES.horizontalPadding,
            style.testContainer,
            // GLOBAL_STYLES.center,
          ]}>
          <Text
            text="KYC Information"
            preset="bold"
            style={[style.headerText]}
          />
          <Divider type={'horizontal'} scaleX={1} />
          <View>
            <View style={[style.formGroup]}>
              <Text
                text={'Aadhaar Number'}
                preset={'secondary'}
                style={[style.fieldLabelText]}
              />
              <Text
                text={'1234567890123456'}
                preset={'bold'}
                style={[style.fieldValueText]}
              />
            </View>
            <View style={[style.formGroup]}>
              <Text
                text={'PAN Number'}
                preset={'secondary'}
                style={[style.fieldLabelText]}
              />
              <Text
                text={'INDIA12345'}
                preset={'bold'}
                style={[style.fieldValueText]}
              />
            </View>
          </View>
        </View>
        <View
          style={[
            GLOBAL_STYLES.verticalMargin,
            GLOBAL_STYLES.verticalPadding,
            GLOBAL_STYLES.horizontalPadding,
            style.testContainer,
            // GLOBAL_STYLES.center,
          ]}>
          <Text text="Support" preset="bold" style={[style.headerText]} />
          <Divider type={'horizontal'} scaleX={1} />
          <View>
            <View style={[style.formGroup]}>
              <Text
                text={'Email'}
                preset={'secondary'}
                style={[style.fieldLabelText]}
              />
              <Text
                text={'support@caset.in'}
                preset={'bold'}
                dataDetectorType={'email'}
                style={[style.fieldValueText]}
              />
            </View>
            <View style={[style.formGroup]}>
              <Text
                text={'Phone'}
                preset={'secondary'}
                style={[style.fieldLabelText]}
              />
              <Text
                text={'1234567890'}
                preset={'bold'}
                style={[style.fieldValueText]}
              />
            </View>
          </View>
        </View>

        <View style={{marginBottom: sizing._1rem}}>
          <Button
            text="Logout"
            preset={'primary'}
            onPress={() => {
              signOut();
              vaapasNavigation(navigation, SCREEN_MAP.LOGIN);
            }}
          />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    // marginBottom: sizing._1rem,
  },
  headerStyle: {
    height: 200,
    maxHeight: 200,
    position: 'absolute',

    top: 0,
    left: 0,
  },
  testContainer: {
    minHeight: 100,
    borderRadius: 10,
    width: '100%',
    backgroundColor: palette.primary_light,
  },
  formGroup: {
    paddingBottom: spacing[3],
  },
  headerText: {
    fontSize: sizing._1rem * 1.2,
  },
  fieldLabelText: {
    fontSize: sizing._1rem * 1.2,
    fontWeight: '500',
  },
  fieldValueText: {},
});

export default Profile;
