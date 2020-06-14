import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, value) => {
    try {
      const obj = JSON.stringify(value);
      await AsyncStorage.setItem(key, obj);
    } catch (e) {
      // saving error
    }
  };
  
  export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? JSON.parse(value) : null;
    } catch (e) {
      // error reading value
    }
  };
  
  export const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // remove error
    }
  
    console.log('Done.');
  };