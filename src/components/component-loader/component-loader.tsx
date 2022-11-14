import React, {memo} from 'react';
import {ActivityIndicator, Platform, StyleSheet, View} from 'react-native';
import {palette} from '../../theme/palette';
import {sizing} from '../../theme/sizing';
import GLOBAL_STYLES from '../../theme/styles';

interface Props {
  isLoading: boolean;
}

const ComponentLoader = (props: Props) => {
  if (!props.isLoading) {
    return <></>;
  }
  return (
    <View style={[style.loader, GLOBAL_STYLES.center]}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

const style = StyleSheet.create({
  loader: {
    zIndex: 100,
    backgroundColor: palette.black,
    opacity: 0.5,
    width: '100%',
    position: 'absolute',
    flex: 1,
    height: '100%',
    borderRadius: 10,
  },
});

export default memo(ComponentLoader);
