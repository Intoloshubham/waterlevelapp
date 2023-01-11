import AsyncStorage from '@react-native-async-storage/async-storage';
const storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key,value);
    } catch (e) {
      console.log(e);
    }
  }


  const storeObjectData =async (key,object) =>{
    try {
      await AsyncStorage.setItem(key,JSON.stringify(object))
    } catch (error) {
      console.log(error)
    }
  }

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        return value;
      }
    } catch(e) {
      console.log(e);
    }
  }

  const getObjectData =async (key) =>{
    try {
      const value=await AsyncStorage.getItem(key)
      return JSON.parse(value);
    } catch (error) {
      console.log(error)
    }
  }
  const removeData = async (key) => {
    try {
      const value = await AsyncStorage.removeItem(key);
      if(value !== null) {
        return value;
      }
    } catch(e) {
      console.log(e);
    }
  }



  export {storeData,getData,removeData,storeObjectData,getObjectData};