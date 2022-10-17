const getImage = async () => {
  try {
    const res = await fetch(
      `http://107.20.37.104:8000/api/water-level-image/2`,
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

const getWaterLevel = async () => {
  try {
    const res = await fetch(`http://107.20.37.104:8000/api/water-level/2`, {
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
    const res = await fetch(`http://107.20.37.104:8000/api/led-status/2`, {
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

export {getLEDStatus, getImage, getWaterLevel};
