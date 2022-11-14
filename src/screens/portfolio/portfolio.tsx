import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import Divider from '../../components/divider/divider';
import FocusAwareStatusBar from '../../components/focus-aware-status-bar/focus-aware-status-bar';
import VectorIcon from '../../components/icon/icon';
import PageBackground from '../../components/page-background/page-background';
import Text from '../../components/text/text';
import activeInvestments from '../../test-data/active-investments';
import {color, spacing} from '../../theme';
import {sizing} from '../../theme/sizing';
import GLOBAL_STYLES from '../../theme/styles';
import {convertToIntlCurSys, getCurrencySymbol} from '../../util/helper';
import BusinessList from '../explore/business-list';
import ActiveInvestments from './active-investments';

const Portfolio = () => {
  const navigation = useNavigation();

  const [currentValue, setCurrentValue] = useState(0);
  const [investedValue, setInvestedValue] = useState(0);
  const [portfolioGainOrLoss, setPortfolioGainOrLoss] = useState(0);

  useEffect(() => {
    const investments = activeInvestments;

    var totalInvested = 0;
    var currentTotal = 0;
    for (let i = 0; i < investments.length; i++) {
      const investment = investments[i];
      investment.orders.forEach(o => {
        totalInvested += o.price * o.quantity;
        currentTotal += investment.price * o.quantity;
      });
    }
    const profitOrLoss = Number(
      ((currentTotal * 100) / totalInvested - 100).toFixed(2),
    );

    setCurrentValue(currentTotal);
    setInvestedValue(totalInvested);
    setPortfolioGainOrLoss(profitOrLoss);
  }, []);

  return (
    <>
      {/* <FocusAwareStatusBar backgroundColor={color.palette.white} /> */}

      <PageBackground variant={'solid'} backgroundColor={color.palette.white} />
      <SafeAreaView>
        <FocusAwareStatusBar
          barStyle="dark-content"
          backgroundColor={color.palette.white}
        />
        <View style={[style.mainContainer]}>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <View
              style={[GLOBAL_STYLES.horizontalPadding, style.whiteBackground]}>
              <Text
                preset={'header'}
                text="Portfolio"
                style={[GLOBAL_STYLES.verticalPadding]}
              />
            </View>

            {/* Portfolio summary */}
            <View
              style={[
                // GLOBAL_STYLES.pagePadding,
                // GLOBAL_STYLES.verticalPadding,
                style.whiteBackground,
                style.portfolioSummaryContainer,
                GLOBAL_STYLES.flexRow,
              ]}>
              <View style={[GLOBAL_STYLES.grow, style.summarySection]}>
                <Text text={'Current value'} preset={'secondary'} />
                <Text
                  text={
                    getCurrencySymbol('INR') +
                    ' ' +
                    convertToIntlCurSys(currentValue)
                  }
                  preset={'bold'}
                />
              </View>
              <Divider type="vertical" />
              <View style={[GLOBAL_STYLES.grow, style.summarySection]}>
                <Text text={'Invested value'} preset={'secondary'} />
                <Text
                  text={
                    getCurrencySymbol('INR') +
                    ' ' +
                    convertToIntlCurSys(investedValue)
                  }
                  preset={'bold'}
                />
              </View>
              <Divider type="vertical" />

              <View style={[GLOBAL_STYLES.grow, style.summarySection]}>
                <Text text={'Gain/Loss'} preset={'secondary'} />
                <View style={[GLOBAL_STYLES.flexRow]}>
                  <VectorIcon
                    name={
                      portfolioGainOrLoss > 0 ? 'trending-up' : 'trending-down'
                    }
                    size={sizing._1rem * 1.3}
                    color={
                      portfolioGainOrLoss > 0 ? color.success : color.failed
                    }
                    source={'ion-icon'}
                  />
                  <Text
                    text={portfolioGainOrLoss.toString()}
                    preset={'bold'}
                    style={[
                      GLOBAL_STYLES.center,
                      {
                        color:
                          portfolioGainOrLoss > 0
                            ? color.success
                            : color.failed,
                        marginLeft: spacing[1],
                      },
                    ]}
                  />
                </View>
              </View>
            </View>

            {/* Active Investments */}
            <View style={[GLOBAL_STYLES.pagePadding]}>
              <Text
                text={'Active Investments'}
                preset={'bold'}
                // bold={true}
                // selectable={true}
                // selectionColor={'red'}
              />
              <ActiveInvestments navigation={navigation} />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: color.palette.offWhite,
    width: '100%',
    height: '100%',
  },
  whiteBackground: {
    backgroundColor: color.palette.white,
  },
  portfolioSummaryContainer: {
    borderRadius: 10,
    marginHorizontal: spacing[3],
    marginVertical: spacing[3],
    padding: spacing[3],
    paddingVertical: spacing[4],
    // paddingHorizontal
    // minHeight: 100,
  },
  summarySection: {
    justifyContent: 'center',
  },
});

export default Portfolio;
