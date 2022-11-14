import React, {memo} from 'react';
import {useWindowDimensions, View, ViewStyle} from 'react-native';
import Svg, {Defs, LinearGradient, Path, Rect, Stop} from 'react-native-svg';
import {PageViewProps} from './page-background.props';

const BG_GRADIENT: ViewStyle = {
  height: '100%',
  width: '100%',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

const LC = (props: {
  colors: {
    color: string;
  }[];
}) => {
  const {width, height} = useWindowDimensions();
  return (
    <Svg
      height={height}
      width={width}
      viewBox={`0 0 ${width} ${height}`}
      style={[BG_GRADIENT]}>
      <Defs>
        <LinearGradient id="path" x1="0" y1="0" x2="1" y2="1">
          {props.colors.map((c, i) => {
            return (
              <Stop
                key={i + '_color'}
                offset={((1 / props.colors.length) * i).toString()}
                stopColor={c.color}
                stopOpacity="1"
              />
            );
          })}
        </LinearGradient>
      </Defs>
      <Rect width={width} height={height} fill={'url(#path)'} />
      {/* <Path
        fill="url(#path)"
        d={'M0 M'}
        // d
        // d="M0,96L48,133.3C96,171,192,245,288,229.3C384,213,480,107,576,74.7C672,43,768,85,864,133.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      /> */}
    </Svg>
  );
};

const PageBackground = (props: PageViewProps) => {
  if (props.variant === 'solid') {
    return (
      <LC
        colors={[
          {color: props.backgroundColor},
          {color: props.backgroundColor},
        ]}
      />
    );
  } else if (props.variant === 'gradient') {
    return (
      <LC
        colors={props.colors.map(c => {
          return {color: c};
        })}
      />
    );
  }
  return <></>;
};

export default memo(PageBackground);
