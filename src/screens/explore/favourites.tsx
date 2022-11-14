/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {LayoutAnimation, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Animated, {SlideInRight} from 'react-native-reanimated';
import {AutoImage} from '../../components/auto-image/auto-image';
import Text from '../../components/text/text';
import favorites from '../../test-data/favourites';
import {color, spacing} from '../../theme';
import {palette} from '../../theme/palette';
import {sizing} from '../../theme/sizing';
import GLOBAL_STYLES from '../../theme/styles';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import ComponentLoader from '../../components/component-loader/component-loader';
import {useIsFocused} from '@react-navigation/native';
import VectorIcon from '../../components/icon/icon';

interface Props {
  navigation: any;
}

const chartConfig = {
  backgroundGradientFrom: palette.white,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: palette.white,
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => palette.lightGrey,
  // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => palette.lighterGrey, // optional
      // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 2, // optional
    },
  ],
  // legend: ['Rainy Days'], // optional
};

const Favorites = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    LayoutAnimation.easeInEaseOut();
  }, []);

  return (
    <View style={[GLOBAL_STYLES.verticalPadding, style.favContainer]}>
      <ComponentLoader isLoading={isLoading} />
      {/* <View style={[style.loader, GLOBAL_STYLES.center]}>
        <Text text="Loading..." />
      </View> */}
      <View style={[GLOBAL_STYLES.flex, style.headerTextPadding]}>
        <Text
          text="Favorites"
          preset={'secondary'}
          style={{fontWeight: 'bold'}}
        />
      </View>
      <FlatList
        horizontal={true}
        data={isFocused ? favorites : []}
        ListEmptyComponent={() => {
          return (
            <View>
              <Text text="No Data Available" preset="secondary" />
            </View>
          );
        }}
        showsHorizontalScrollIndicator={false}
        //   style={[{backgroundColor: 'red'}]}
        // style={[{paddingLeft: spacing[2]}]}
        keyExtractor={item => item.id + '_favorite'}
        renderItem={({item, index}) => {
          return (
            <Animated.View
              entering={SlideInRight.delay(index * 100).duration(500)}
              key={index}
              style={[style.itemContainer, GLOBAL_STYLES.shadow]}>
              <View style={[style.itemContainerInner, style.hideOverflow]}>
                <AutoImage
                  source={{uri: item.businessLogoUrl}}
                  style={[style.image]}
                />
                <Text
                  text={item.name}
                  style={{fontWeight: '500', fontSize: sizing._1rem * 1.1}}
                />
                <Text
                  text={item.currencySymbol + ' ' + item.price}
                  preset={'secondary'}
                  style={{fontWeight: 'bold'}}
                />
                <View style={[GLOBAL_STYLES.flexRow]}>
                  <VectorIcon
                    name={
                      item.percentChangeType === 'profit'
                        ? 'trending-up'
                        : 'trending-down'
                    }
                    size={sizing._1rem * 1.3}
                    color={
                      item.percentChangeType === 'profit'
                        ? color.success
                        : color.failed
                    }
                    source={'ion-icon'}
                  />
                  <Text
                    text={item.percentChange}
                    preset={'bold'}
                    style={[
                      GLOBAL_STYLES.center,
                      {
                        color:
                          item.percentChangeType === 'profit'
                            ? color.success
                            : color.failed,
                        marginLeft: spacing[1],
                      },
                    ]}
                  />
                </View>
                <View style={[style.graphView]}>
                  <LineChart
                    data={{
                      labels: [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                      ],
                      datasets: [
                        {
                          data: [20, 45, 28, 80, 99, 43].map(
                            () =>
                              Math.random() * 100 + Math.random() * 100 + 300,
                          ),
                          color: (opacity = 1) =>
                            item.accentColor || palette.lighterGrey, // optional
                          // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                          strokeWidth: 2, // optional
                        },
                      ],
                      // legend: ['Rainy Days'], // optional
                    }}
                    width={180}
                    withDots={false}
                    withHorizontalLines={false}
                    withVerticalLines={false}
                    verticalLabelRotation={90}
                    formatYLabel={() => ''}
                    // yLabelsOffset={30}
                    height={67}
                    chartConfig={{
                      backgroundGradientFrom: palette.white,
                      backgroundGradientFromOpacity: 0,
                      backgroundGradientTo: palette.white,
                      backgroundGradientToOpacity: 0.5,
                      color: (opacity = 1) =>
                        item.accentColor || palette.lighterGrey,
                      // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                      strokeWidth: 2, // optional, default 3
                      barPercentage: 0.5,
                      useShadowColorFromDataset: false, // optional
                    }}
                    style={{
                      paddingRight: 0,
                      paddingLeft: 0,
                      top: 19,
                      borderRadius: 10,
                    }}
                  />
                </View>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  loader: {
    zIndex: 100,
    backgroundColor: palette.lightGrey,
    width: '100%',
    position: 'absolute',
    flex: 1,
    height: '100%',
    borderRadius: 10,
  },
  favContainer: {
    minWidth: 200,
    minHeight: 280,
  },
  itemContainer: {
    width: 150,
    height: 200,
    // backgroundColor: palette.primary_light,
    backgroundColor: palette.white,
    borderRadius: 10,
    // padding: spacing[2],
    marginVertical: spacing[2],
    marginHorizontal: spacing[2],
    // paddingLeft: spacing[3],
    borderColor: palette.lighterGrey,
    borderWidth: 0.3,
  },
  itemContainerInner: {
    width: 150,
    height: 200,
    // backgroundColor: palette.primary_light,
    backgroundColor: palette.white,
    borderRadius: 12,
    padding: spacing[2],
    // marginVertical: spacing[2],
    // marginHorizontal: spacing[2],
    paddingLeft: spacing[3],
    borderColor: palette.lighterGrey,
    borderWidth: 0.3,
  },
  headerTextPadding: {
    paddingLeft: spacing[2],
  },
  image: {
    width: 40,
    height: 40,
    marginRight: spacing[2],
    borderRadius: 6,
  },
  hideOverflow: {
    overflow: 'hidden',
  },
  graphView: {
    left: -1 * spacing[2] * 1.5,
    // bottom: 20,
    // position: 'absolute',
    // height: 60,
  },
});

export default Favorites;
