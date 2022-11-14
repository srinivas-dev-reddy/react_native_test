/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Animated, {
  LightSpeedInRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  ZoomIn,
  ZoomInDown,
  ZoomOut,
} from 'react-native-reanimated';
import Text from '../../components/text/text';
import {palette} from '../../theme/palette';
import {sizing} from '../../theme/sizing';
import GLOBAL_STYLES from '../../theme/styles';
import STATIC_IMAGES from '../../util/images';

const ANIMATION_DURATION = 800;

const SplashScreen = () => {
  const shrink = useSharedValue(false);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(shrink.value ? 1 : 2, {duration: 800}),
        },
        {
          rotate: withTiming(shrink.value ? '0deg' : '360deg', {duration: 800}),
        },
      ],
    };
  });
  useEffect(() => {
    setTimeout(() => {
      shrink.value = true;
    }, 0);
  }, []);

  return (
    <View
      style={[
        GLOBAL_STYLES.flex,
        GLOBAL_STYLES.center,
        {flex: 1, backgroundColor: palette.white, width: '100%'},
      ]}>
      {/* <Animated.View style={[animatedStyle]}>
        <Image
          source={STATIC_IMAGES.LOGO}
          style={[
            {
              width: 100,
              height: 100,
            },
          ]}
        />
      </Animated.View> */}

      <View style={[GLOBAL_STYLES.flexRow]}>
        <Animated.View
          entering={LightSpeedInRight.randomDelay().duration(
            ANIMATION_DURATION,
          )}>
          <Text text="C" preset="header" style={style.textSize} />
        </Animated.View>
        <Animated.View
          entering={LightSpeedInRight.randomDelay().duration(
            ANIMATION_DURATION,
          )}>
          <Text text="A" preset="header" style={style.textSize} />
        </Animated.View>
        <Animated.View
          entering={LightSpeedInRight.randomDelay().duration(
            ANIMATION_DURATION,
          )}>
          <Text text="S" preset="header" style={style.textSize} />
        </Animated.View>
        <Animated.View
          entering={LightSpeedInRight.randomDelay().duration(
            ANIMATION_DURATION,
          )}>
          <Text text="E" preset="header" style={style.textSize} />
        </Animated.View>
        <Animated.View
          entering={LightSpeedInRight.randomDelay().duration(
            ANIMATION_DURATION,
          )}>
          <Text text="T" preset="header" style={style.textSize} />
        </Animated.View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  textSize: {
    fontSize: sizing._1rem * 3.5,
  },
});

export default SplashScreen;
