/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {color} from '../../theme';

interface Props {
  scaleX?: number;
  scaleY?: number;
  size?: number;
  type?: 'vertical' | 'horizontal';
}

const Divider = (props: Props) => {
  const size = props.size || 0.3;
  return (
    <View
      style={[
        {
          height: props.type === 'vertical' ? undefined : size,
          width: props.type === 'vertical' ? size : undefined,

          marginVertical: props.type === 'vertical' ? undefined : 10,
          marginHorizontal: props.type === 'vertical' ? 10 : undefined,
          backgroundColor: color.palette.black,
          transform: [
            {
              scaleX: props.type === 'vertical' ? 1 : props.scaleX || 0.95,
            },
            {
              scaleY: props.type === 'vertical' ? props.scaleY || 0.95 : 1,
            },
          ],
        },
      ]}
    />
  );
};

export default Divider;
