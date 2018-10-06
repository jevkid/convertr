import { AsyncStorage } from 'react-native';

export async function getItem(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return null;
    }
   } catch (error) {
    console.log(error.message);
   }

}

export async function setItem(key, value){
  try {   
    await AsyncStorage.setItem(key, JSON.stringify(value));    
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function clearCache(){
  try {   
    await AsyncStorage.clear();    
  } catch (error) {
    console.log(error.message);
    return null;
  }
}