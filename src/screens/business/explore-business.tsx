import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import GoBack from '../../components/go-back/go-back';
import Text from '../../components/text/text';
import GLOBAL_STYLES from '../../theme/styles';
import Rainbow from './rainbow';
import {color, spacing} from '../../theme';
import {sizing} from '../../theme/sizing';
import Divider from '../../components/divider/divider';
import {AutoImage} from '../../components/auto-image/auto-image';
import {getCurrencySymbol} from '../../util/helper';
import VectorIcon from '../../components/icon/icon';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_MAP, vaapasNavigation} from '../../util/navigation';
import FocusAwareStatusBar from '../../components/focus-aware-status-bar/focus-aware-status-bar';
import VictoryGraph from './victory-graph';
import {TextField} from '../../components/text-field/text-field';
import {Button} from '../../components/button/button';

interface Props {
  navigation: any;
}

export const data = [
  {x: 1453075200, y: 1.47},
  {x: 1453161600, y: 1.37},
  {x: 1453248000, y: 1.53},
  {x: 1453334400, y: 1.54},
  {x: 1453420800, y: 1.52},
  {x: 1453507200, y: 2.03},
  {x: 1453593600, y: 2.1},
  {x: 1453680000, y: 2.5},
  {x: 1453766400, y: 2.3},
  {x: 1453852800, y: 2.42},
  {x: 1453939200, y: 2.55},
  {x: 1454025600, y: 2.41},
  {x: 1454112000, y: 2.43},
  {x: 1454198400, y: 2.2},
];

const ExploreBusiness = (props: Props) => {
  const graphDisplayIndex = useSharedValue(0);
  const [pageScrollEnabled, setPageScrollEnabled] = useState(true);
  const [selectedGraph, setSelectedGraph] = useState(0);
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const [openModal, setOpenModal] = useState(false);
  const [selectedModalOption, setSelectedModalOption] = useState(0);
  const [quantity, setQuantity] = useState('');
  const [moveToPortfolio, setMoveToPortfolio] = useState(false);

  const graphViewAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(graphDisplayIndex.value ? -width : 0, {
            duration: 500,
          }),
        },
      ],
    };
  });

  useEffect(() => {
    // setTimeout(() => {
    //   console.log('Setting');
    //   graphDisplayIndex.value = 1;
    // }, 2000);
    // setTimeout(() => {
    //   console.log('Setting');
    //   graphDisplayIndex.value = 0;
    // }, 6000);
    return () => {
      setSelectedModalOption(0);
      setOpenModal(false);
      setMoveToPortfolio(false);
    };
  }, []);

  useEffect(() => {
    if (moveToPortfolio && !openModal) {
      vaapasNavigation(props.navigation, SCREEN_MAP.PORTFOLIO);
    }
  }, [moveToPortfolio, openModal, props.navigation]);

  const handleGraphClick = useCallback((clicking: boolean) => {
    setPageScrollEnabled(!clicking);
  }, []);

  const renderSelectedModal = () => {
    return (
      <View style={[{paddingBottom: 30}]}>
        {/* <Text
          text={actionButtons[selectedModalOption].text}
          preset={'header'}
        /> */}
        <View>
          <TextField
            label={'Quantity'}
            preset={'border'}
            value={quantity}
            keyboardType={'default'}
            onChangeText={text => {
              if (isNaN(Number(text))) return;
              if (selectedModalOption === 0) {
                const value = Number(text);
              }
              setQuantity(text);
            }}
          />
          <Button
            text={selectedModalOption === 0 ? 'Buy' : 'Sell'}
            preset={'bold'}
            // onPress={handleClick}

            onPress={async () => {
              await setOpenModal(false);
              setMoveToPortfolio(true);
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <View
        style={[
          GLOBAL_STYLES.flexRow,
          GLOBAL_STYLES.pagePadding,
          style.fixedActionContainer,
          GLOBAL_STYLES.spaceEven,
        ]}>
        <TouchableOpacity
          style={[style.fixedActionButton, GLOBAL_STYLES.center]}
          onPress={() => {
            setSelectedModalOption(0);
            setOpenModal(true);
          }}>
          <Text text="Buy" preset="bold" style={[style.button]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.fixedActionButton, GLOBAL_STYLES.center]}
          onPress={() => {
            setSelectedModalOption(1);
            setOpenModal(true);
          }}>
          <Text text="Sell" preset="bold" style={[style.button]} />
        </TouchableOpacity>
      </View>
      <Modal
        visible={openModal}
        transparent={true}
        animationType={'slide'}
        statusBarTranslucent>
        <ScrollView bounces={false}>
          <View style={[style.modalScrollView]}>
            <View style={[GLOBAL_STYLES.grow, style.modalBackground]} />
            <KeyboardAvoidingView
              behavior={'padding'}
              style={[
                GLOBAL_STYLES.pagePadding,
                GLOBAL_STYLES.verticalPadding,
                style.modalContainerView,
              ]}>
              <View style={[GLOBAL_STYLES.flexRow]}>
                <View style={[GLOBAL_STYLES.grow]} />
                <TouchableOpacity
                  onPress={() => {
                    setOpenModal(false);
                  }}>
                  <VectorIcon
                    source={'ion-icon'}
                    name={'close-circle'}
                    size={sizing._2rem}
                  />
                </TouchableOpacity>
              </View>
              {renderSelectedModal()}
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </Modal>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={color.palette.white}
      />
      <SafeAreaView>
        <View style={[GLOBAL_STYLES.pagePadding, {paddingBottom: spacing[1]}]}>
          <GoBack />
        </View>
        <ScrollView
          scrollEnabled={pageScrollEnabled}
          showsVerticalScrollIndicator={false}
          style={[{height: '100%'}]}>
          <View style={[GLOBAL_STYLES.pagePadding, {paddingTop: spacing[2]}]}>
            <AutoImage
              source={{
                uri: 'https://play-lh.googleusercontent.com/U2e_iBIp_jSiFXYfSVAgEBglP-NpSpXpuyzIZY2R-1r1GYE5_ULD15ammyRiSAKtDw=s96-rw',
              }}
              style={[style.image]}
            />
            <Text
              text={'Bewakoof'}
              style={{fontWeight: '500', fontSize: sizing._1rem * 1.1}}
            />
          </View>
          <View
            style={[
              GLOBAL_STYLES.flexRow,
              GLOBAL_STYLES.pagePadding,
              GLOBAL_STYLES.spaceEven,
              {paddingVertical: spacing[3]},
            ]}>
            <TouchableOpacity
              style={[GLOBAL_STYLES.center, GLOBAL_STYLES.grow]}
              onPress={() => {
                graphDisplayIndex.value = 0;
                setSelectedGraph(0);
              }}>
              <Text
                text="Market"
                preset="bold"
                style={[
                  {
                    color:
                      selectedGraph === 0 ? color.primary : color.palette.black,
                  },
                ]}
              />
            </TouchableOpacity>
            <Divider type={'vertical'} size={0.8} />
            <TouchableOpacity
              style={[GLOBAL_STYLES.center, GLOBAL_STYLES.grow]}
              onPress={() => {
                console.log('Sale');
                graphDisplayIndex.value = 1;
                setSelectedGraph(1);
              }}>
              <Text
                text="Sales"
                preset="bold"
                style={[
                  {
                    color: selectedGraph ? color.primary : color.palette.black,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
          {/* Graph */}
          <Animated.View
            style={[GLOBAL_STYLES.flexRow, graphViewAnimatedStyle]}>
            <Rainbow />
            <Rainbow />
            {/* <VictoryGraph />
            <VictoryGraph /> */}
          </Animated.View>
          {/* Duration change buttons */}
          <View
            style={[
              GLOBAL_STYLES.pagePadding,
              {paddingVertical: sizing._1rem * 2},
            ]}>
            <View style={[{marginBottom: spacing[4]}]}>
              <Text
                text="Your Portfolio"
                preset={'bold'}
                style={{
                  fontWeight: 'bold',
                }}
              />
              <View style={[GLOBAL_STYLES.flexRow, style.portfolioContainer]}>
                <View style={[style.portfolioItem]}>
                  <Text text={'Balance'} preset={'secondary'} />
                  <Text
                    text={'102.23'}
                    preset={'header'}
                    style={[style.portfolioItemHeader]}
                  />
                </View>
                <View style={[style.portfolioItem]}>
                  <Text text={'Current Value'} preset={'secondary'} />
                  <Text
                    text={getCurrencySymbol('INR') + ' 123.77'}
                    preset={'header'}
                    style={[style.portfolioItemHeader]}
                  />
                </View>
                <View style={[style.portfolioItem]}>
                  <Text text={'Average Buy Price'} preset={'secondary'} />
                  <Text
                    text={getCurrencySymbol('INR') + ' 110.23'}
                    preset={'header'}
                    style={[style.portfolioItemHeader]}
                  />
                </View>

                <View style={[style.portfolioItem]}>
                  <Text text={'Gain/Loss'} preset={'secondary'} />
                  <View style={[GLOBAL_STYLES.flexRow]}>
                    <VectorIcon
                      name={
                        'profit' === 'profit' ? 'trending-up' : 'trending-down'
                      }
                      size={sizing._1rem * 2}
                      color={
                        'profit' === 'profit' ? color.success : color.failed
                      }
                      source={'ion-icon'}
                    />
                    <Text
                      text={'23.17'}
                      preset={'header'}
                      style={[
                        GLOBAL_STYLES.center,
                        style.portfolioItemHeader,
                        {
                          color:
                            'profit' === 'profit'
                              ? color.success
                              : color.failed,
                          marginLeft: spacing[1],
                        },
                      ]}
                    />
                  </View>
                </View>

                <View style={[style.portfolioItem]}>
                  <View
                    style={[GLOBAL_STYLES.flexRow, GLOBAL_STYLES.spaceBetween]}>
                    <Text text={'Revenue Share'} preset={'secondary'} />
                    <TouchableOpacity
                      onPress={() => {
                        vaapasNavigation(navigation, SCREEN_MAP.ROYALTY_FEED);
                      }}>
                      <VectorIcon
                        source={'ant-design'}
                        name={'infocirlce'}
                        size={sizing._1rem * 1.2}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    text={'25.12'}
                    preset={'header'}
                    style={[style.portfolioItemHeader]}
                  />
                </View>
              </View>
            </View>
            <Text text="Description" preset="bold" />
            <Divider type="horizontal" scaleX={1} />
            {/* <Text
            text={`Ethereum is a decentralized open-source blockchain system that features its own cryptocurrency, Ether. ETH works as a platform for numerous other cryptocurrencies, as well as for the execution of decentralized smart contracts.
            \nEthereum was first described in a 2013 whitepaper by Vitalik Buterin. Buterin, along with other co-founders, secured funding for the project in an online public crowd sale in the summer of 2014. The project team managed to raise $18.3 million in Bitcoin, and Ethereum’s price in the Initial Coin Offering (ICO) was $0.311, with over 60 million Ether sold. Taking Ethereum’s price now, this puts the return on investment (ROI) at an annualized rate of over 270%, essentially almost quadrupling your investment every year since the summer of 2014.
            \nThe Ethereum Foundation officially launched the blockchain on July 30, 2015, under the prototype codenamed “Frontier.” Since then, there has been several network updates — “Constantinople” on Feb. 28, 2019, “Istanbul” on Dec. 8, 2019, “Muir Glacier” on Jan. 2, 2020, “Berlin” on April 14, 2021, and most recently on Aug. 5, 2021, the “London” hard fork.
            \nEthereum’s own purported goal is to become a global platform for decentralized applications, allowing users from all over the world to write and run software that is resistant to censorship, downtime and fraud.`}
            preset="default"
          /> */}
            <Text
              text={
                'Bewakoof is\nDistinctive fashion\nfor the contemporary Indian\nwith In-house capabilities in design, manufacturing, technology, data science, and marketing'
              }
            />
          </View>
          <View style={[{height: 80}]} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const {width} = Dimensions.get('window');

const style = StyleSheet.create({
  modalScrollView: {
    minHeight: '100%',
  },
  modalBackground: {opacity: 0.6, backgroundColor: 'black'},
  modalContainerView: {
    backgroundColor: color.palette.white,
    paddingBottom: 30,
    paddingTop: sizing._1rem,
    minHeight: 200,
  },
  listItemContainer: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    backgroundColor: color.palette.white,
    marginVertical: spacing[2],
    borderRadius: 6,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: spacing[2],
    borderRadius: 6,
  },
  portfolioContainer: {
    flexWrap: 'wrap',
    paddingTop: spacing[2],
    justifyContent: 'space-between',
  },
  portfolioItem: {
    minHeight: 60,
    width: '45%',
    marginHorizontal: spacing[2],
    padding: spacing[2],
    borderRadius: 4,
    marginBottom: spacing[2],
    backgroundColor: color.palette.white,
  },
  portfolioItemHeader: {},
  fixedActionContainer: {
    position: 'absolute',
    width: '100%',
    // backgroundColor: 'red',
    zIndex: 100,
    bottom: 0,
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  fixedActionButton: {
    flexGrow: 1,
    width: 150,
    // height: 40,
    paddingVertical: 10,
    backgroundColor: color.palette.primary,
    marginRight: 10,
    borderRadius: 4,
  },
  button: {
    color: color.palette.white,
    fontSize: sizing._1rem * 1.2,
  },
});

export default ExploreBusiness;
