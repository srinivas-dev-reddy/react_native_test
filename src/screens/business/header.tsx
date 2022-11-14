import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {ReText, Vector, round} from 'react-native-redash';

import {graphs, SIZE, GraphIndex} from './model';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  values: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  value: {
    fontWeight: '500',
    fontSize: 24,
  },
  label: {
    fontSize: 18,
  },
});

interface HeaderProps {
  translation: Vector<Animated.SharedValue<number>>;
  index: Animated.SharedValue<GraphIndex>;
}

const Header = ({translation, index}: HeaderProps) => {
  const data = useDerivedValue(() => {
    return graphs[index.value].data;
  });
  // const dynamicData = useDerivedValue(() => {
  //   console.log(data.value);
  //   const d = data.value || data;
  //   const p = interpolate(
  //     translation.y.value,
  //     [0, SIZE],
  //     [d?.maxPrice || 0, d?.minPrice || 100],
  //   );

  //   return {
  //     price: `₹ ${round(p, 2).toLocaleString('en-US', {currency: 'INR'})}`,
  //     percentChange: `${round(d.percentChange, 3)}%`,
  //     label: d.label,
  //     style: {
  //       fontWeight: '500',
  //       fontSize: 24,
  //       color: d.percentChange > 0 ? 'green' : 'red',
  //     },
  //   };
  // });
  const price = useDerivedValue(() => {
    const p = interpolate(
      translation.y.value,
      [0, SIZE],
      [graphs[index.value].data.maxPrice, graphs[index.value].data.minPrice],
    );
    return `₹ ${round(p, 2).toLocaleString('en-US', {currency: 'INR'})}`;
  });
  const percentChange = useDerivedValue(() => {
    return `${round(graphs[index.value].data.percentChange, 3)}%`;
  }, [index.value]);

  const label = useDerivedValue(() => {
    const d = graphs[index.value].data;
    return d.label;
  }, [data]);
  const style = useAnimatedStyle(() => {
    const d = graphs[index.value].data;
    return {
      fontWeight: '500',
      fontSize: 24,
      color: d.percentChange > 0 ? 'green' : 'red',
    };
  });
  return (
    <View style={styles.container}>
      <View style={styles.values}>
        <View>
          <ReText style={styles.value} text={price} />
          {/* <Animated.Text>{dynamicData.value.price}</Animated.Text> */}
          <Text style={styles.label}>BWK</Text>
        </View>
        <View>
          <ReText style={style} text={percentChange} />
          <ReText style={styles.label} text={label} />
        </View>
      </View>
    </View>
  );
};

export default Header;
