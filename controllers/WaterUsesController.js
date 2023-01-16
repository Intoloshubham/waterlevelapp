import {API_URL} from '@env';

const feedWaterUse = async (inputs) => {
  try {
    const temp=await fetch(`${API_URL}`,{
        method:'PUT',
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify(inputs)
    });
    const resp=await temp.json();
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export {feedWaterUse};