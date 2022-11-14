import {Platform} from 'react-native';

export const installedFonts = {
  DMSansRegular: 'DMSans-Regular',
  DMSansMedium: 'DMSans-Medium',
  DMSansBold: 'DMSans-Bold',
  NunitoExtraBoldItalic: 'Nunito-ExtraBoldItalic',
  NunitoExtraBold: 'Nunito-ExtraBold',
  NunitoExtraLightItalic: 'Nunito-ExtraLightItalic',
  DMSansBoldItalic: 'DMSans-BoldItalic',
  NunitoLight: 'Nunito-Light',
  NunitoRegular: 'Nunito-Regular',
  NunitoSemiBold: 'Nunito-SemiBold',
  NunitoBold: 'Nunito-Bold',
  NunitoBoldItalic: 'Nunito-BoldItalic',
  NunitoBlack: 'Nunito-Black',
  NunitoExtraLight: 'Nunito-ExtraLight',
  NunitoSemiBoldItalic: 'Nunito-SemiBoldItalic',
  NunitoBlackItalic: 'Nunito-BlackItalic',
  DMSansMediumItalic: 'DMSans-MediumItalic',
  NunitoItalic: 'Nunito-Italic',
  DMSansItalic: 'DMSans-Italic',
  NunitoLightItalic: 'Nunito-LightItalic',
};

/**
 * You can find a list of available fonts on both iOS and Android here:
 * https://github.com/react-native-training/react-native-fonts
 *
 * If you're interested in adding a custom font to your project,
 * check out the readme file in ./assets/fonts/ then come back here
 * and enter your new font name. Remember the Android font name
 * is probably different than iOS.
 * More on that here:
 * https://github.com/lendup/react-native-cross-platform-text
 *
 * The various styles of fonts are defined in the <Text /> component.
 */
export const typography = {
  /**
   * The primary font.  Used in most places.
   */
  primary: Platform.select({
    ios: installedFonts.DMSansRegular,
    android: installedFonts.DMSansRegular,
  }),
  // primary: Platform.select({ios: 'Helvetica', android: 'normal'}),

  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({
    ios: installedFonts.NunitoRegular,
    android: installedFonts.NunitoRegular,
  }),
  // secondary: Platform.select({ios: 'Arial', android: 'sans-serif'}),

  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ios: 'Courier', android: 'monospace'}),

  bold: Platform.select({
    ios: installedFonts.DMSansBold,
    android: installedFonts.DMSansBold,
  }),
};
