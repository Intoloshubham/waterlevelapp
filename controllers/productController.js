import {API_URL} from '@env';

const addProduct = async inputs => {
  try {
    const resp = await fetch(`${API_URL}add-product`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(inputs),
    });
    const temp = await resp.json();
    return temp;
  } catch (error) {
    console.log(error);
  }
};
const getProduct = async (user_id) => {
  try {
    const resp = await fetch(`${API_URL}get-product/${user_id}`, {method: 'GET'});
    const temp = await resp.json();
    return temp;
  } catch (error) { 
    console.log(error);
  }
};
const updateProduct = async (inputs, id) => {
  try {
    const resp = await fetch(`${API_URL}product/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(inputs)
    });
    const temp = await resp.json();
    return temp;
  } catch (error) {
    console.log(error);
  }
};
const makeProductPrimary =async (id)=>{
  try {
    const resp=await fetch(`${API_URL}primary/${id}`,{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      // body:JSON.stringify()
    });
    const temp=await resp.json();
    return temp;
  } catch (error) {
    console.log(error);
  }
}

export {addProduct, getProduct, updateProduct,makeProductPrimary};
