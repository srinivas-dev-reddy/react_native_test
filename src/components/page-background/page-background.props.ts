import {ViewStyle} from 'react-native';
import {color} from '../../theme';

const BASE_STYLE: ViewStyle = {
  height: '100%',
  width: '100%',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

interface PageBackgroundSolidProps {
  backgroundColor: string;
  variant: 'solid';
}

interface PageBackgroundGradientProps {
  colors: string[];
  variant: 'gradient';
}

export type PageViewProps =
  | PageBackgroundSolidProps
  | PageBackgroundGradientProps;

export const pageViewProps: Record<string, PageViewProps> = {
  solid: {
    ...BASE_STYLE,
    backgroundColor: color.palette.white,
  } as PageBackgroundSolidProps,

  gradient: {
    ...BASE_STYLE,
    colors: [''],
  } as PageBackgroundGradientProps,
};

export type PageBackgroundPresets = keyof typeof pageViewProps;
