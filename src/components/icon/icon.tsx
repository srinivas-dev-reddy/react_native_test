import React from 'react';
import {default as FontAwesomeIcon} from 'react-native-vector-icons/FontAwesome5';
import {FontAwesome5IconProps} from 'react-native-vector-icons/FontAwesome5';

import {default as AntDesignIcon} from 'react-native-vector-icons/AntDesign';
import {default as IonIcon} from 'react-native-vector-icons/Ionicons';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';
import {default as MaterialCommunityIcon} from 'react-native-vector-icons/MaterialCommunityIcons';
import {default as DefaultIcon} from 'react-native-vector-icons/AntDesign';
import {IconProps} from 'react-native-vector-icons/Icon';
import {sizing} from '../../theme/sizing';
import {ShadowPropTypesIOS, View, ViewStyle} from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {palette} from '../../theme/palette';

export type fontSources =
  | 'font-awesome5'
  | 'ant-design'
  | 'ion-icon'
  | 'feather'
  | 'material-community';

interface FA5Props extends FontAwesome5IconProps {
  source: 'font-awesome5';
}

interface AntProps extends IconProps {
  source: 'ant-design';
}

interface IonIconProps extends IconProps {
  source: 'ion-icon';
}
interface FeatherIconProps extends IconProps {
  source: 'ion-icon';
}
interface MaterialCommunityIconProps extends IconProps {
  source: 'material-community';
}

type Props =
  | FA5Props
  | AntProps
  | IonIconProps
  | IconProps
  | FeatherIconProps
  | MaterialCommunityIconProps;

const DefaultIconProps = {
  size: sizing._2rem * 0.75,
};

const VectorIcon = (
  props: Props & {source?: fontSources; toAnimate?: boolean; focused?: boolean},
) => {
  const getIcon = () => {
    if (props.source === 'font-awesome5') {
      return <FontAwesomeIcon {...DefaultIconProps} {...props} />;
    }

    if (props.source === 'ant-design') {
      return <AntDesignIcon {...DefaultIconProps} {...props} />;
    }

    if (props.source === 'ion-icon') {
      return <IonIcon {...DefaultIconProps} {...props} />;
    }

    if (props.source === 'feather') {
      return <FeatherIcon {...DefaultIconProps} {...props} />;
    }

    if (props.source === 'material-community') {
      return <MaterialCommunityIcon {...DefaultIconProps} {...props} />;
    }
    return <DefaultIcon {...DefaultIconProps} {...props} />;
  };

  const focusedStyle = {
    shadowColor: palette.lightGrey,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 1,
  };
  const ds: ViewStyle = {
    opacity: 0.5,
    position: 'absolute',
    zIndex: -1,
    // transform: [{translateX: 5}, {translateY: 5}],
  };

  const topAnimatedStyle = useAnimatedStyle(() => {
    // return focused ? focusedStyle : {...focusedStyle, ...{shadowOpacity: 0}};
    if (!focused) {
      return {};
    }
    return {
      transform: [
        {
          scale: withTiming(1.2, {duration: 20000}),
        },
      ],
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    // return focused ? focusedStyle : {...focusedStyle, ...{shadowOpacity: 0}};
    if (!focused) {
      return {};
    }
    return {
      transform: [
        {
          scale: withTiming(1.2, {
            duration: 2000,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
        },
        {
          translateX: withTiming(5),
        },
        {
          translateY: withTiming(5),
        },
      ],
    };
  });

  const {toAnimate, focused} = props;
  if (toAnimate) {
    return (
      <View>
        <Animated.View style={[{zIndex: 15}, topAnimatedStyle]}>
          {getIcon()}
        </Animated.View>
        <Animated.View
          // entering={focused ? FadeInDown.duration(500) : undefined}
          style={[ds, animatedStyle]}>
          {getIcon()}
        </Animated.View>
      </View>
    );
  }

  return getIcon();
};

export default VectorIcon;
