import {API_URL} from '@env';

const getImage = async () => {
  try {
    const res = await fetch(API_URL + 'water-level-image/2', {
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

const getWaterLevel = async () => {
  try {
    const res = await fetch(API_URL + 'water-level/2', {
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

const getPrevLevel = async () => {
  try {
    const res = await fetch(API_URL + 'prev-water-level/2', {
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

const getLEDStatus = async () => {
  try {
    const res = await fetch(API_URL + 'led-status/2', {
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
const getSUMPStatus = async () => {
  try {
    const res = await fetch(API_URL + 'sump-status/2', {
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
