import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Animated as NativeAnimated,
} from 'react-native';
import Svg, {Path, PathProps} from 'react-native-svg';
import Animated, {
  AnimateProps,
  useAnimatedProps,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {mixPath, useVector} from 'react-native-redash';

import {GraphIndex, graphs, GRAPH_HEIGHT, SIZE} from './model';
import Header from './header';
import Cursor from './cursor';
import {palette} from '../../theme/palette';

const {width} = Dimensions.get('window');
Animated.addWhitelistedNativeProps({d: true});
const AnimatedPath = Animated.createAnimatedComponent(Path);
// NativeAnimated.createAnimatedComponent()

const SELECTION_WIDTH = width - 32;
const BUTTON_WIDTH = (width - 32) / graphs.length;
const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
  },
  backgroundSelection: {
    backgroundColor: palette.white,
    ...StyleSheet.absoluteFillObject,
    width: BUTTON_WIDTH,
    borderRadius: 8,
  },
  selection: {
    flexDirection: 'row',
    width: SELECTION_WIDTH,
    alignSelf: 'center',
  },
  labelContainer: {
    padding: 16,
    width: BUTTON_WIDTH,
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

interface Props {
  handleGraphClick?: (clicking: boolean) => void;
}

const Graph = ({handleGraphClick}: Props) => {
  //   const pathRef = useAnimatedRef<typeof AnimatedPath>();
  //   const pathStr = new NativeAnimated.Value('');
  // const [pathStr, setPathStr] = useState('')
  const translation = useVector(0, 0);
  const transition = useSharedValue(0);
  const previous = useSharedValue<GraphIndex>(0);
  const current = useSharedValue<GraphIndex>(0);
  const animatedProps = useAnimatedProps(() => {
    const previousPath = graphs[previous.value].data.path;
    const currentPath = graphs[current.value].data.path;
    // if (pathRef.current) {
    //   pathRef.current.render();
    // }
    return {
      d: mixPath(transition.value, previousPath, currentPath),
    };
  });

  //   const animatedPath = useDerivedValue(() => {
  //     console.log('In animated path');
  //     const previousPath = graphs[previous.value].data.path;
  //     const currentPath = graphs[current.value].data.path;
  //     console.log(mixPath(transition.value, previousPath, currentPath));
  //     return mixPath(transition.value, previousPath, currentPath);
  //   });
  const style = useAnimatedStyle(() => ({
    transform: [{translateX: withTiming(BUTTON_WIDTH * current.value)}],
  }));

  useEffect(() => {
    // const interval = setInterval(() => {
    //   setVData(getData());
    // }, 3000);

    return () => {
      // clearInterval(interval);
      previous.value = 0;
      current.value = 0;
      transition.value = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* <View>
        <VictoryChart domainPadding={{x: 20}} animate={{duration: 500}}>
          <VictoryBar
            data={vdata}
            style={{
              data: {fill: 'tomato', width: 12},
            }}
            animate={{
              onExit: {
                duration: 500,
                before: () => ({
                  _y: 0,
                  fill: 'orange',
                  label: 'BYE',
                }),
              },
            }}
          />
        </VictoryChart>
      </View> */}
      <Header translation={translation} index={current} />
      <View>
        <Svg width={SIZE} height={GRAPH_HEIGHT}>
          <AnimatedPath
            animatedProps={animatedProps}
            fill="transparent"
            stroke="black"
            strokeWidth={3}
          />
        </Svg>
        <Cursor
          translation={translation}
          index={current}
          handleIsClicking={handleGraphClick}
        />
      </View>
      <View style={styles.selection}>
        <View style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.backgroundSelection, style]} />
        </View>
        {graphs.map((graph, index) => {
          return (
            <TouchableWithoutFeedback
              key={graph.label}
              onPress={() => {
                previous.value = current.value;
                transition.value = 0;
                current.value = index as GraphIndex;
                transition.value = withTiming(1, {duration: 600});
              }}>
              <Animated.View style={[styles.labelContainer]}>
                <Text style={styles.label}>{graph.label}</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </GestureHandlerRootView>
  );
};

export default Graph;
