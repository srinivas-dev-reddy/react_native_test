import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {getYForX, Vector} from 'react-native-redash';

import {GraphIndex, graphs} from './model';

const CURSOR = 50;
const styles = StyleSheet.create({
  cursor: {
    width: CURSOR,
    height: CURSOR,
    borderRadius: CURSOR / 2,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cursorBody: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'black',
  },
});

interface CursorProps {
  index: Animated.SharedValue<GraphIndex>;
  translation: Vector<Animated.SharedValue<number>>;
  handleIsClicking?: (clicking: boolean) => void;
}

const Cursor = ({index, translation, handleIsClicking}: CursorProps) => {
  const isActive = useSharedValue(false);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      isActive.value = true;
    },
    onActive: event => {
      translation.x.value = event.x;
      translation.y.value =
        getYForX(graphs[index.value].data.path, translation.x.value) || 0;
      if (handleIsClicking) {
        handleIsClicking(true);
      }
    },
    onCancel: () => {
      isActive.value = false;
      translation.x.value = 0;
      translation.y.value = 0;
    },
    onEnd: () => {
      isActive.value = false;
      translation.x.value = 0;
      translation.y.value = 0;
      if (handleIsClicking) {
        handleIsClicking(false);
      }
    },
  });

  const style = useAnimatedStyle(() => {
    const translateX = translation.x.value - CURSOR / 2;
    const translateY = translation.y.value - CURSOR / 2;
    return {
      transform: [
        {translateX},
        {translateY},
        {scale: withSpring(isActive.value ? 1 : 0)},
      ],
      opacity:
        translation.x.value === translation.y.value && translation.x.value === 0
          ? 0
          : 1,
    };
  });

  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <PanGestureHandler {...{onGestureEvent}}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.cursor, style]}>
            <View style={styles.cursorBody} />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default Cursor;
