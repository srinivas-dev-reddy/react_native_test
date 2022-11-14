import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import GoBack from '../../components/go-back/go-back';
import royaltyFeed from '../../test-data/royalty-feed';
import {color} from '../../theme';
import {sizing} from '../../theme/sizing';
import GLOBAL_STYLES from '../../theme/styles';
import {formatter, formatDate} from '../../util/helper';

const RoyaltyFeed = () => {
  return (
    <>
      <SafeAreaView>
        <View style={[GLOBAL_STYLES.pagePadding]}>
          <GoBack />
          {royaltyFeed.royaltyFeed.map((d, i) => {
            return (
              <View
                key={i}
                style={[
                  GLOBAL_STYLES.flexRow,
                  GLOBAL_STYLES.spaceBetween,
                  {paddingVertical: 10},
                ]}>
                <View
                  style={[
                    GLOBAL_STYLES.flexRow,
                    {flex: 1, alignItems: 'center'},
                  ]}>
                  <View style={[GLOBAL_STYLES.flexRow]}>
                    <Text
                      style={[
                        //   GLOBAL_STYLES.medium,
                        // GLOBAL_STYLES.flex,
                        GLOBAL_STYLES.center,
                        {
                          color: color.palette.black,
                          marginLeft: 3,
                          fontSize: sizing._1rem * 0.8,
                          textAlignVertical: 'center',
                          alignContent: 'center',
                        },
                      ]}>
                      {`Credited`}{' '}
                      <Text style={[{color: color.palette.primary}]}>
                        {formatter.format(d.amount)}
                      </Text>{' '}
                      {`to your wallet`}
                    </Text>
                  </View>
                </View>
                <View style={[{alignItems: 'flex-end', alignSelf: 'center'}]}>
                  <Text
                    style={[
                      GLOBAL_STYLES.bold,
                      {
                        fontSize: sizing._1rem * 0.6,
                        color: color.palette.black,
                      },
                    ]}>
                    {formatDate(new Date(d.createdAt), 'HH:MM, dS mmmm yy')}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </SafeAreaView>
    </>
  );
};

export default RoyaltyFeed;
