import {API_URL} from '@env';

const feedWaterUse = async (inputs) => {
  try {
    const temp=await fetch(`${API_URL}water-uses`,{
        method:'POST',
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify(inputs)
    });
    const resp=await temp.json();
    return resp;
  } catch (error) {
    console.log(error);
  }
};

const getWaterUse = async ()=>{
  try {
    const temp=await fetch(`${API_URL}water-uses`);
    const resp=await temp.json();
    return resp;
  } catch (error) {
    console.log(error)
  }
}

const getWaterUsageDetail = async ()=>{
  try {
    const temp=await fetch(`${API_URL}cal-water-usage`);
    const resp=await temp.json();
    return resp;
  } catch (error) {
    console.log(error)
  }
}

const totalUsage = async (unique_id)=>{
  try {
    const temp=await fetch(`${API_URL}total-usage/${unique_id}`);
    const resp=await temp.json();
    return resp;
  } catch (error) {
    console.log(error)
  }
}

export {feedWaterUse,getWaterUse,getWaterUsageDetail,totalUsage};