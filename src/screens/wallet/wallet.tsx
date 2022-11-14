import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../../components/focus-aware-status-bar/focus-aware-status-bar';
import VectorIcon from '../../components/icon/icon';
import PageBackground from '../../components/page-background/page-background';
import Text from '../../components/text/text';
import transactions from '../../test-data/wallet';
import {color, spacing} from '../../theme';
import {palette} from '../../theme/palette';
import {sizing} from '../../theme/sizing';
import GLOBAL_STYLES from '../../theme/styles';
import {formatDate, formatToCurrency} from '../../util/helper';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {TextField} from '../../components/text-field/text-field';
import {useAuth} from '../../context/auth/auth';
import {Button} from '../../components/button/button';

// interface Props {
//   navigation: any;
// }

const TOP_SECTION_HEIGHT = 200;

interface actionButtonProps {
  icon: string;
  text: string;
}

const actionButtons: actionButtonProps[] = [
  {
    icon: 'arrowup',
    text: 'Withdraw',
  },
  {
    icon: 'arrowdown',
    text: 'Add',
  },
];

const transactionData: typeof transactions = transactions;
const snapPoints = ['40%'];
const Wallet = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const [transactionsData, setTransactionsData] = useState(transactionData);
  const {authData} = useAuth();
  const [walletAmount, setWalletAmount] = useState(authData.user.wallet.amount);
  const [amount, setAmount] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedModalOption, setSelectedModalOption] = useState(0);
  const data = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const {height} = useWindowDimensions();

  const viewHeight = height - data.bottom - data.top;

  useEffect(() => {
    if (sheetRef.current) {
      sheetRef.current.snapToIndex(0);
    }
    return () => {
      setOpenModal(false);
    };
  }, []);

  useEffect(() => {
    if (!openModal) {
      setAmount('');
    }
  }, [openModal]);

  const handleClick = useCallback(() => {
    if (selectedModalOption === 0) {
      setWalletAmount(walletAmount - Number(amount));
      setTransactionsData([
        {
          id: transactionsData.length + 0.1,
          amount: Number(amount),
          date: new Date().toString(),
          trnType: 'debit',
          status: 'success',
        },
        ...transactionsData,
      ]);
    } else {
      setWalletAmount(walletAmount + Number(amount));
      setTransactionsData([
        {
          id: transactionsData.length + 1,
          amount: Number(amount),
          date: new Date().toString(),
          trnType: 'credit',
          status: 'success',
        },
        ...transactionsData,
      ]);
    }
    setOpenModal(false);
  }, [amount, selectedModalOption, transactionsData, walletAmount]);

  // const renderSelectedModal = useMemo(() => {
  //   return (
  //     <Text text={actionButtons[selectedModalOption].text} preset={'header'} />
  //   );
  // }, [selectedModalOption]);
  const renderSelectedModal = () => {
    return (
      <View style={[{paddingBottom: 30}]}>
        {/* <Text
          text={actionButtons[selectedModalOption].text}
          preset={'header'}
        /> */}
        <View>
          <TextField
            label={'Amount'}
            preset={'border'}
            value={amount}
            keyboardType={'default'}
            onChangeText={text => {
              if (isNaN(Number(text))) return;
              if (selectedModalOption === 0) {
                const value = Number(text);
              }
              setAmount(text);
            }}
          />
          <Button
            text={actionButtons[selectedModalOption].text}
            preset={'bold'}
            onPress={handleClick}
          />
        </View>
      </View>
    );
  };

  const renderTransactions = useMemo(() => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={isFocused ? transactionsData : []}
        style={{
          // flexGrow: 1,
          marginBottom: spacing[2] * 2,
          marginTop: spacing[2],

          // bottom: spacing[4] * 8,
        }}
        // stickyHeaderIndices={[0]}
        // StickyHeaderComponent={() => {
        //   return (
        //     <View>
        //       <Text
        //         text={'Stickey'}
        //         style={[{color: '#fff'}]}
        //         preset={'bold'}
        //       />
        //     </View>
        //   );
        // }}
        ItemSeparatorComponent={() => {
          return <View style={[style.separator]} />;
        }}
        renderItem={({item, index}) => {
          return (
            <Animated.View
              key={index + '_transaction'}
              entering={FadeInDown.duration(500).delay(index * 150)}
              style={[
                style.transactionContainer,
                GLOBAL_STYLES.flexRow,
                GLOBAL_STYLES.center,
                GLOBAL_STYLES.spaceBetween,
              ]}>
              <View
                style={[
                  style.transactionSectionPadding,
                  GLOBAL_STYLES.center,
                  style.iconContainer,
                  {
                    backgroundColor: color[item.status] || color.background,
                  },
                ]}>
                <VectorIcon
                  name={
                    item.trnType === 'credit'
                      ? 'arrow-down-left'
                      : 'arrow-up-right'
                  }
                  source={'feather'}
                  // color={color[item.status] || color.background}
                  color={color.palette.white}
                />
              </View>
              <View
                style={[
                  style.amountContainer,
                  style.transactionSectionPadding,
                ]}>
                <Text
                  text={formatToCurrency(item.amount)}
                  preset="bold"
                  style={[{fontSize: sizing._1rem * 1}]}
                />
              </View>
              <View
                style={[
                  style.transactionSectionPadding,
                  GLOBAL_STYLES.alignRight,
                ]}>
                <Text
                  text={formatDate(item.date, 'ddd mm yy')}
                  preset="fieldLabel"
                  style={style.dateText}
                />
                <Text
                  text={formatDate(item.date, 'hh MM ss TT Z')}
                  preset="fieldLabel"
                  style={style.dateText}
                />
              </View>
            </Animated.View>
          );
        }}
        key={'transactions List'}
        keyExtractor={item => {
          return item.id + new Date().toString() + Math.random();
        }}
      />
    );
  }, [isFocused, transactionsData]);

  return (
    <>
      {/* <BottomSheet ref={sheetRef} snapPoints={snapPoints}>
        <View style={[GLOBAL_STYLES.pagePadding]}>
          <Text text={'Modal'} preset={'header'} />
        </View>
      </BottomSheet> */}

      <SafeAreaView>
        <FocusAwareStatusBar
          barStyle="dark-content"
          backgroundColor={color.palette.white}
        />
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
        {/* <PageBackground variant={'solid'} backgroundColor={'#0e202e'} /> */}
        <PageBackground variant={'solid'} backgroundColor={'#fff'} />
        <View
          style={[
            style.container,
            {
              height: viewHeight,
              maxHeight: viewHeight,
            },
          ]}>
          {/* Balance Half */}
          <View style={[style.topSection, GLOBAL_STYLES.horizontalPadding]}>
            <Text text="Wallet" preset={'header'} style={[]} />
            <Text
              style={[GLOBAL_STYLES.verticalMargin, style.balanceText]}
              text="Balance"
              preset={'fieldLabel'}
            />
            <Text
              style={[GLOBAL_STYLES.bold]}
              text={formatToCurrency(walletAmount)}
              preset={'header'}
            />

            <View style={[GLOBAL_STYLES.center, GLOBAL_STYLES.flexRow]}>
              <View
                style={[
                  style.topSectionButtonContainer,
                  GLOBAL_STYLES.flexRow,
                  GLOBAL_STYLES.center,
                  GLOBAL_STYLES.spaceBetween,
                ]}>
                {actionButtons.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index + '_action_button'}
                      onPress={() => {
                        setSelectedModalOption(index);
                        setOpenModal(true);
                      }}
                      style={[
                        GLOBAL_STYLES.flexRow,
                        style.actionButtonContainer,
                        GLOBAL_STYLES.center,
                        // GLOBAL_STYLES.spaceBetween,
                      ]}>
                      <VectorIcon name={item.icon} color={palette.primary} />
                      <Text
                        text={item.text}
                        preset={'fieldLabel'}
                        style={[style.actionButtonText]}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>

          {/* Transactions */}
          <View
            style={[
              style.bottomSection,
              GLOBAL_STYLES.horizontalPadding,
              GLOBAL_STYLES.verticalPadding,
              {
                height: viewHeight - TOP_SECTION_HEIGHT - spacing[2] * 2,
                maxHeight: viewHeight - TOP_SECTION_HEIGHT - spacing[2] * 2,
              },
            ]}>
            <View
              style={[
                GLOBAL_STYLES.flexRow,
                GLOBAL_STYLES.spaceBetween,
                // {maxHeight: 30},
              ]}>
              <Text text="Transactions" preset={'bold'} />
              {/* <Text text="View All" preset={'bold'} /> */}
            </View>
            {renderTransactions}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const {height} = Dimensions.get('window');

const style = StyleSheet.create({
  container: {
    width: '100%',
  },
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
  section: {},

  topSection: {
    height: TOP_SECTION_HEIGHT,
  },

  balanceText: {fontSize: sizing._1rem * 1, fontWeight: '500'},
  dateText: {fontSize: sizing._1rem * 0.8, fontWeight: '500'},

  topSectionButtonContainer: {
    width: 330,
    minWidth: 300,
    paddingVertical: sizing._1rem,
  },

  actionButtonContainer: {
    width: 150,
    maxWidth: 150,
    height: 50,
    marginEnd: spacing[2],
    backgroundColor: palette.primary_light,
    // opacity: 0.5,
    borderRadius: sizing._05rem,
  },
  actionButtonText: {
    color: palette.primary,
    fontSize: sizing._1rem * 1.1,
    fontWeight: 'bold',
    marginLeft: spacing[1],
  },

  bottomSection: {
    backgroundColor: palette.offWhite,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: spacing[2] * 0,
    // borderTopWidth: 2,
    // borderColor: palette.black,
  },

  // Transaction
  transactionSectionPadding: {
    paddingHorizontal: spacing[3],
    marginHorizontal: spacing[2],
  },
  transactionContainer: {
    width: '100%',
    backgroundColor: color.background,
    height: 90,
    padding: spacing[2],
    borderRadius: 10,
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  amountContainer: {
    alignSelf: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
    // backgroundColor: 'red',
    flexGrow: 1,
  },

  separator: {
    height: 10,
  },
});

export default Wallet;
