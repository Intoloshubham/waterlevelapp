

const getWaterdata = async () => {
  
  try {
    const res = await fetch('http://192.168.1.99:8000/api/water-level', {
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
}
  const getImage = async () => {
  
    try {
      const res = await fetch('http://107.20.37.104:8000/api/water-level', {
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

export {getWaterdata,getImage};
