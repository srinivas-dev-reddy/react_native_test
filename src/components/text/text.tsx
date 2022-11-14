import React from 'react';
import {
  TextProps,
  Text as ReactNativeText,
  StyleProp,
  TextStyle,
} from 'react-native';
import {presets, TextPresets} from './text-presets';

interface CustomTextProperty extends TextProps {
  text?: string;
  /**
   * One of the different types of text presets.
   */
  preset?: TextPresets;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  bold?: boolean;
}

const Text = (props: CustomTextProperty) => {
  // grab the props
  const {
    preset = 'default',
    text,
    children,
    style: styleOverride,
    bold,
    ...rest
  } = props;

  const style = presets[preset] || presets.default;
  if (bold) {
    style.fontWeight = 'bold';
  }
  const styles = [style, styleOverride];
  const content = text || children;
  return (
    <ReactNativeText {...rest} style={styles}>
      {content}
    </ReactNativeText>
  );
};

export default Text;
