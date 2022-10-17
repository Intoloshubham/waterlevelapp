const postWaterLevelSettings = async formData => {
  try {
    const res = await fetch(
      `http://107.20.37.104:8000/api/water-level-setting/1`,
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
      `http://107.20.37.104:8000/api/water-level-setting/1`,
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

export {postWaterLevelSettings, getWaterLevelSettings};
