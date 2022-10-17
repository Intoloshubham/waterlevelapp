const postWaterLevelSettings = async formData => {
  try {
    const res = await fetch(
      `http://107.20.37.104:8000/api/water-level-setting/2`,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getWaterLevelSettings = async () => {
  try {
    const res = await fetch(
      `http://107.20.37.104:8000/api/water-level-setting/2`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postTankHeightSettings = async formData => {
  try {
    const res = await fetch(
      `http://107.20.37.104:8000/api/tank-height-setting/2`,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postWaterSourceSettings = async formData => {
  try {
    const res = await fetch(
      `http://107.20.37.104:8000/api/water-source-setting/2`,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postMotorNotification = async formData => {
  try {
    const res = await fetch(
      `http://107.20.37.104:8000/api/motor-notification-setting/2`,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {
  postWaterLevelSettings,
  getWaterLevelSettings,
  postTankHeightSettings,
  postWaterSourceSettings,
  postMotorNotification,
};
