import {API_URL} from '@env';

const postRemoteControl = async formData => {
  try {
    const res = await fetch(API_URL + 'led-status/1', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {postRemoteControl};
