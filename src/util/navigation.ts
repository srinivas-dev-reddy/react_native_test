import {StatusBarStyle} from 'react-native';

export const SCREEN_MAP = {
  LOGIN: 'LOGIN',
  CONFIRM_OTP: 'CONFIRM_OTP',
  HOME_SCREEN: 'HOME_SCREEN',
  EXPLORE: 'EXPLORE',
  EXPLORE_BUSINESS: 'EXPLORE_BUSINESS',
  WALLET: 'WALLET',
  PORTFOLIO: 'PORTFOLIO',
  PROFILE: 'PROFILE',
  ROYALTY_FEED: 'ROYALTY_FEED',
};

export type SCREEN_KEYS = keyof typeof SCREEN_MAP;

export const SCREEN_STATUS_BAR_STYLE: Record<SCREEN_KEYS, StatusBarStyle> = {
  LOGIN: 'dark-content',
  CONFIRM_OTP: 'dark-content',
  EXPLORE: 'dark-content',
  HOME_SCREEN: 'dark-content',
  EXPLORE_BUSINESS: 'dark-content',
  WALLET: 'light-content',
  PORTFOLIO: 'dark-content',
  PROFILE: 'dark-content',
  ROYALTY_FEED: 'default',
};

function navigateScreen(navigation: any, to = '', params = {}) {
  if (navigation && to) {
    navigation.navigate(to, params);
  }
}

export const vaapasNavigation = navigateScreen;

function navigateBack(navigation: any) {
  if (navigation) {
    navigation.goBack();
  }
}

export const goBack = navigateBack;
