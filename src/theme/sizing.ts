import {PixelRatio} from 'react-native';
/**
 * Global rem
 */
console.log(
  'Current Rem',
  PixelRatio.roundToNearestPixel(16 / PixelRatio.getFontScale()),
);
export const rem = PixelRatio.roundToNearestPixel(
  16 / PixelRatio.getFontScale(),
);

/**
 * NOTE TO DEVS:
 *
 * sizing should be consistent and whitespace thought of as a first class technique up
 * there with color and typefaces.
 *
 * Which type of scale you use is based on the design.
 *
 * If you've got simpler app, you may only need 6 items.  Or maybe you want a sizing scale
 * to be named:
 *
 * export const sizing = {
 *   tiny: 4,
 *   small: 8,
 *   medium: 12,
 *   large: 24,
 *   huge: 64
 * }
 *
 * Whatever you choose, try to stick with these, and not freestyle it everywhere.
 *
 * Feel free to delete this block.
 */
export const sizing = {
  _1rem: rem,

  _2rem: rem * 2,
  /**
   * half a rem
   */
  _05rem: rem / 2,
};

export const typo_sizing = {
  header: rem * 1.6,
  secondary: rem * 1,
  fieldLabel: rem * 0.8,
  base: rem,
  small: rem * 0.5,
};
