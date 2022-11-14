/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, SafeAreaView, ScrollView, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {AutoImage} from '../../components/auto-image/auto-image';
import FocusAwareStatusBar from '../../components/focus-aware-status-bar/focus-aware-status-bar';
import Text from '../../components/text/text';
import {color, spacing} from '../../theme';
import GLOBAL_STYLES from '../../theme/styles';
import BusinessList from './business-list';
import Favorites from './favourites';

interface Props {
  navigation: any;
}

const deals_data = [
  {
    url: 'https://caset-static-files.s3.ap-south-1.amazonaws.com/marketing/boat.png',
    alt: 'Boat',
    id: 1,
  },
  {
    url: 'https://caset-static-files.s3.ap-south-1.amazonaws.com/marketing/Licious.png',
    alt: 'Licious',
    id: 2,
  },
  {
    url: 'https://caset-static-files.s3.ap-south-1.amazonaws.com/marketing/Zivame.png',
    alt: 'Zivame',
    id: 3,
  },
];
const {width} = Dimensions.get('window');
const Explore = (props: Props) => {
  return (
    <SafeAreaView>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={color.palette.white}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        // keyboardShouldPersistTaps={'always'}
        style={[GLOBAL_STYLES.pagePadding]}>
        <Text text="Explore" preset="header" />

        {/* Favorites */}
        <Favorites navigation={props.navigation} />

        {/* Deals */}
        {/* <Text text='' /> */}
        <FlatList
          horizontal
          data={deals_data}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id + ''}
          snapToInterval={width - spacing[4] * 2}
          scrollEventThrottle={16}
          decelerationRate={'fast'}
          renderToHardwareTextureAndroid
          // contentContainerStyle={{alignItems: 'center'}}
          snapToAlignment={'start'}
          renderItem={({item}) => {
            return (
              <View style={[GLOBAL_STYLES.center]}>
                <AutoImage
                  source={{
                    uri: item.url,
                  }}
                  resizeMethod={'resize'}
                  resizeMode={'contain'}
                  style={{
                    width: width - spacing[4] * 2 - spacing[3] * 2,
                    height: 150,
                    marginHorizontal: spacing[3],
                  }}
                />
              </View>
            );
          }}
        />

        {/* List of available business casets */}
        <Text text="Casets" preset={'secondary'} style={[GLOBAL_STYLES.bold]} />

        <BusinessList navigation={props.navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Explore;
