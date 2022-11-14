import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import {AutoImage} from '../../components/auto-image/auto-image';
import VectorIcon from '../../components/icon/icon';
import Text from '../../components/text/text';
import activeInvestments, {
  ActiveInvestMentItemProp,
} from '../../test-data/active-investments';
import businesses from '../../test-data/all-businesses';
import {color, spacing} from '../../theme';
import {sizing} from '../../theme/sizing';
import GLOBAL_STYLES from '../../theme/styles';
import {SCREEN_MAP, vaapasNavigation} from '../../util/navigation';

const ActiveInvestmentsItem = (
  item: ActiveInvestMentItemProp,
  index: number,
  onClick?: () => void,
) => {
  const totalInvested = item.orders.reduce((p, c) => {
    return p + c.price * c.quantity;
  }, 0);

  const currentTotal = item.orders.reduce((p, c) => {
    return p + item.price * c.quantity;
  }, 0);

  const totalQuantity = item.orders.reduce((p, c) => {
    return p + c.quantity;
  }, 0);

  const averageInvested = (totalInvested / totalQuantity).toFixed(2);

  const profitOrLoss = Number(
    ((currentTotal * 100) / totalInvested - 100).toFixed(2),
  );

  return (
    <Animated.View
      key={index + '_business_list'}
      entering={FadeInDown.duration(500).delay(index * 150)}
      // exiting={FadeInUp.duration(500).delay(index * 200)}
    >
      <Pressable
        onPress={onClick}
        style={[
          style.listItemContainer,
          GLOBAL_STYLES.flexRow,
          GLOBAL_STYLES.shadow,
        ]}>
        <View>
          <AutoImage
            source={{uri: item.businessLogoUrl}}
            style={[style.image]}
          />
        </View>
        <View style={[GLOBAL_STYLES.grow]}>
          <Text text={item.name} style={[GLOBAL_STYLES.bold]} />
          <Text text={item.businessAlias} preset={'secondary'} />
          <Text
            text={item.currencySymbol + ' ' + averageInvested}
            style={[GLOBAL_STYLES.bold]}
          />
        </View>
        <View style={[GLOBAL_STYLES.alignRight, GLOBAL_STYLES.spaceBetween]}>
          <Text
            text={item.currencySymbol + ' ' + item.price}
            style={[GLOBAL_STYLES.bold]}
          />

          <View style={[GLOBAL_STYLES.flexRow]}>
            <VectorIcon
              name={profitOrLoss > 0 ? 'trending-up' : 'trending-down'}
              size={sizing._1rem * 1.3}
              color={profitOrLoss > 0 ? color.success : color.failed}
              source={'ion-icon'}
            />
            <Text
              text={String(profitOrLoss)}
              preset={'bold'}
              style={[
                GLOBAL_STYLES.center,
                {
                  color: profitOrLoss > 0 ? color.success : color.failed,
                  marginLeft: spacing[1],
                },
              ]}
            />
          </View>
          <Text text={totalQuantity.toFixed(0)} preset={'fieldLabel'} />
        </View>
      </Pressable>
    </Animated.View>
  );
};

interface Props {
  navigation: any;
  length?: number;
}

const ActiveInvestments = (props: Props) => {
  const isFocused = useIsFocused();
  return (
    <View style={[GLOBAL_STYLES.verticalPadding]}>
      <View>
        {(isFocused
          ? props.length
            ? activeInvestments.slice(0, props.length)
            : activeInvestments
          : []
        ).map((item, index) => {
          return ActiveInvestmentsItem(item, index, () => {
            vaapasNavigation(props.navigation, SCREEN_MAP.EXPLORE_BUSINESS, {});
          });
        })}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
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
});

export default ActiveInvestments;
