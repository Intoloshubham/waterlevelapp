import {API_URL} from '@env';

const postSumpStatus = async (inputs, id) => {
  try {
    const resp = await fetch(`${API_URL}sump-status/` + id, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(inputs),
    });
    const temp = await resp.json();
    return temp;
  } catch (error) {
    console.log(error);
  }
};

const getSumpStatus = async id => {
  try {
    const res = await fetch(API_URL + `sump-status/` + id, {
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

const postBoreStatus = async (inputs, id) => {
  try {
    const resp = await fetch(`${API_URL}bore-status/` + id, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(inputs),
    });
    const temp = await resp.json();
    return temp;
  } catch (error) {
    console.log(error);
  }
};

const updateMotorStatus = async (inputs, id) => {
  try {
    const resp = await fetch(`${API_URL}update-motor-status/` + id, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(inputs),
    });
    const temp = await resp.json();
    return temp;
  } catch (error) {
    console.log(error);
  }
};

const getBoreStatus = async id => {
  try {
    const res = await fetch(API_URL + `bore-status/` + id, {
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

export {postSumpStatus, getSumpStatus, postBoreStatus, getBoreStatus,updateMotorStatus};
