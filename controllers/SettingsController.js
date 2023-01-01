import {API_URL} from '@env';

const postWaterLevelSettings = async (formData,registeredId) => {
  try {
    const res = await fetch(API_URL + `update-water-level-setting/${registeredId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getWaterLevelSettings = async (registeredId) => {
  try {
    const res = await fetch(API_URL + `water-level-setting/${registeredId}`, {
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

const postTankHeightSettings = async (formData,registeredId) => {
  try {
    const res = await fetch(API_URL + `tank-height-setting/${registeredId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postWaterSourceSettings = async (formData,registeredId) => {
  try {
    const res = await fetch(API_URL + `water-source-setting/${registeredId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postMotorNotification = async (formData,registeredId) => {
  try {
    const res = await fetch(API_URL + `motor-notification-setting/${registeredId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const UserlogOut = async inputs =>{
  try {
    const resp=await fetch(`${API_URL}logout-user`,{
      method:'DELETE',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(inputs)
    });
    const temp=await resp.json();
    return temp;    
  } catch (error) {
    console.log(error);
  }
}

export {
  postWaterLevelSettings,
  getWaterLevelSettings,
  postTankHeightSettings,
  postWaterSourceSettings,
  postMotorNotification,
  UserlogOut
};
