import {API_URL} from '@env';

const postNotificationStatus = async (inputs, id) => {
  try {
    const resp = await fetch(`${API_URL}notification-setting/` + id, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(inputs),
    });
    const temp = await resp.json();
    return temp;
  } catch (error) {
    console.log(error);
  }
};

export {postNotificationStatus};
