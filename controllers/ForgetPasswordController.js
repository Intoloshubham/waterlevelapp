import {API_URL} from '@env';

const send_otp_verification = async email => {
  try {
    const res = fetch(`${API_URL}forget-password`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(email),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
const verify_password_otp = async (id, inputs) => {
  try {
    const res = fetch(`${API_URL}verify-otp/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(inputs),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
const reset_password = async (user_Id, inputs) => {
  try {
    const res = fetch(`${API_URL}reset-password/${user_Id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(inputs),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export {send_otp_verification, verify_password_otp, reset_password};
