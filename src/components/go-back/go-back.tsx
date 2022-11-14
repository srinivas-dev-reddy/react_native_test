import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import {palette} from '../../theme/palette';
import {sizing} from '../../theme/sizing';
import {goBack} from '../../util/navigation';
import VectorIcon from '../icon/icon';

const GoBack = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        goBack(navigation);
      }}>
      <VectorIcon
        source={'ion-icon'}
        name="chevron-back-circle-outline"
        // name="arrow-back-circle-outline"
        size={sizing._1rem * 2}
        color={palette.primary}
      />
    </TouchableOpacity>
  );
};
export default memo(GoBack);
