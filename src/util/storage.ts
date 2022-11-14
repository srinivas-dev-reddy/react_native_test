import AsyncStorage from '@react-native-async-storage/async-storage';

const _storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    throw new Error('Storing data failed');
  }
};

export const storeData = _storeData;

const _getData = async (key: string) => {
  try {
    const value: any = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  } catch (e) {
    // error reading value
    return '';
  }
};

export const getStoredData = _getData;
