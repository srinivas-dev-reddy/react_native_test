import React from 'react';
import {StyleSheet, View} from 'react-native';

import Graph from './graph';
// import Footer from './components/Footer';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'white',
    justifyContent: 'space-between',
  },
});

interface Props {
  handleGraphClick?: (clicking: boolean) => void;
}

const Rainbow = ({handleGraphClick}: Props) => {
  return (
    <View style={styles.container}>
      <Graph handleGraphClick={handleGraphClick} />
    </View>
  );
};

export default Rainbow;
