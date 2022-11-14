import dateFormat from 'dateformat';
import {Alert, Linking, Platform} from 'react-native';

const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
type currency = 'INR';
const currencySymbol = {
  INR: '₹',
};
const getCurrencySymbol = (currency: currency) => {
  return currencySymbol[currency];
};

const formatToCurrency = (number: number) => {
  return formatter.format(number);
};

const formatDate = (date: string | Date, format = 'dS mmmm, yyyy') => {
  return dateFormat(date, format);
};

const removeTimeDataFromDate = (d: Date) => {
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
};

// const debounce = () => {};

const convertToIntlCurSys = (number: number, precision = 2) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(number)) >= 1.0e7
    ? (Math.abs(Number(number)) / 1.0e7).toFixed(precision) + 'Cr'
    : // Six Zeroes for Millions
    Math.abs(Number(number)) >= 1.0e5
    ? (Math.abs(Number(number)) / 1.0e5).toFixed(precision) + 'L'
    : // Three Zeroes for Thousands
    Math.abs(Number(number)) >= 1.0e3
    ? (Math.abs(Number(number)) / 1.0e3).toFixed(precision) + 'K'
    : Math.abs(Number(number)) + '';
};

const daysDiffBetweenDates = (date1: Date, date2: Date) => {
  const diffTime = Math.abs(Number(date2) - Number(date1));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Compare versions
 * @param v1 Version 1 string
 * @param v2 Version 2 string
 * @returns true if v1 > v2
 */
const compareVersions = (v1: string, v2: string) => {
  const version1 = v1.split('.').map(i => Number(i));
  const version2 = v2.split('.').map(i => Number(i));
  console.log(version1, version2);
  if (version1[0] > version2[0]) {
    return true;
  }
  if (version1[0] < version2[0]) {
    return false;
  }
  if (version1[1] > version2[1]) {
    return true;
  }
  if (version1[1] < version2[1]) {
    return false;
  }
  if (version1[2] > version2[2]) {
    return true;
  }
  if (version1[2] < version2[2]) {
    return false;
  }
  return false;
};

const routeToStore = () => {
  if (Platform.OS === 'android') {
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=com.caset.android',
    );
  } else {
    Alert.alert('Not available for ios');
  }
};

export {
  formatter,
  formatToCurrency,
  formatDate,
  convertToIntlCurSys,
  daysDiffBetweenDates,
  removeTimeDataFromDate,
  compareVersions,
  routeToStore,
  getCurrencySymbol,
};
