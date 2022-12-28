import {API_URL} from '@env';

const registerUser = async inputs => {
  try {
    const resp = await fetch(`${API_URL}user-register`, {
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
const loginUser =async inputs =>{
    const resp=await fetch(`${API_URL}login-user`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(inputs),
    });
    const temp=await resp.json();
    return temp;
}


export {registerUser,loginUser};
