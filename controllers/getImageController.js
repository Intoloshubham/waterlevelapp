import {API_URL} from '@env';
import { useSelector } from 'react-redux';
// const registeredId=useSelector((state)=>state.product);
// console.log("🚀 ~ file: getImageController.js:4 ~ registeredId", registeredId)

const getImage = async (registeredId) => {
  try {
    const res = await fetch(API_URL + `water-level-image/${registeredId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getWaterLevel = async (registeredId) => {
  try {
    const res = await fetch(API_URL + `water-level/${registeredId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getPrevLevel = async (registeredId) => {
  try {
    const res = await fetch(API_URL + `prev-water-level/${registeredId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getLEDStatus = async (registeredId) => {
  try {
    const res = await fetch(API_URL + `led-status/${registeredId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getSUMPStatus = async (registeredId) => {
  try {
    const res = await fetch(API_URL + `sump-status/${registeredId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {getLEDStatus, getImage, getWaterLevel,getPrevLevel,getSUMPStatus};
