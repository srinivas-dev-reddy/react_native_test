import {typo_sizing} from './sizing';
import {StyleSheet, Dimensions, Platform} from 'react-native';
import {color} from './color';
import {palette} from './palette';
import {spacing} from './spacing';

const {height: windowHeight, width: windowWidth} = Dimensions.get('window');

/**
 * Some basic global styles
 */
const GLOBAL_STYLES = StyleSheet.create({
  fitScreen: {
    width: '100%',
    height: '100%',
  },
  fitWindow: {
    width: windowWidth,
    height: windowHeight,
    flex: 1,
  },
  fillScreen: {
    minWidth: '100%',
    minHeight: '100%',
  },

  bold: {
    fontWeight: 'bold',
  },

  flex: {
    display: 'flex',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  center: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  spaceEven: {
    justifyContent: 'space-evenly',
  },
  grow: {
    flexGrow: 1,
  },

  pagePadding: {
    paddingHorizontal: spacing[4],
  },
  horizontalPadding: {
    paddingHorizontal: spacing[3],
  },
  verticalPadding: {
    paddingVertical: spacing[2],
  },

  verticalMargin: {
    marginVertical: spacing[3],
  },
  horizontalMargin: {
    marginHorizontal: spacing[3],
  },

  upperCase: {
    textTransform: 'uppercase',
  },

  alignRight: {
    alignContent: 'flex-end',
    alignItems: 'flex-end',
  },
  alignLeft: {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },

  shadow:
    Platform.OS === 'ios'
      ? {
          shadowColor: palette.lightGrey,
          shadowOffset: {width: -2, height: 4},
          shadowOpacity: 0.2,
          shadowRadius: 5,
        }
      : {
          shadowColor: palette.lightGrey,
          // shadowOffset: {width: -2, height: 4},
          // shadowOpacity: 0.2,
          // shadowRadius: 3,
          elevation: 5,
        },

  whiteFont: {
    color: color.palette.white,
  },

  headerSize: {
    fontSize: typo_sizing.header,
  },
  secondarySize: {
    fontSize: typo_sizing.secondary,
  },
  labelSize: {
    fontSize: typo_sizing.fieldLabel,
  },
  baseSize: {
    fontSize: typo_sizing.base,
  },
  smallSize: {
    fontSize: typo_sizing.small,
  },
});

export default GLOBAL_STYLES;
