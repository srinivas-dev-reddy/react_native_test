import * as React from 'react';
import {
  Platform,
  StatusBar,
  StatusBarProps,
  StyleSheet,
  View,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

function FocusAwareStatusBar(props: StatusBarProps) {
  const isFocused = useIsFocused();

  return isFocused ? (
    <>
      {Platform.OS === 'android' ? (
        <View style={style.statusBarHeight} />
      ) : null}
      <StatusBar animated showHideTransition={'fade'} translucent {...props} />
    </>
  ) : null;
}

const style = StyleSheet.create({
  statusBarHeight: {
    height: (StatusBar.currentHeight || 0) + 10,
  },
});

export default FocusAwareStatusBar;
