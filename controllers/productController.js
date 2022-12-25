import {API_URL} from '@env';

const addProduct = async (inputs) => {
    try {
      const resp =await fetch(`${API_URL}add-product`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(inputs),
      });
      const temp=await resp.json();
      return temp;
    } catch (error) {
      console.log(error);
    }
  };



  export {addProduct};
  