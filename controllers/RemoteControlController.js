import {API_URL} from '@env';

const postRemoteControl = async (formData,registeredId) => {
  try {
<<<<<<< HEAD
    const res = await fetch(API_URL + 'led-status/3', {
      method: 'put',
=======
    const res = await fetch(API_URL + `led-status/${registeredId}`, {
      method: 'PUT',
>>>>>>> 4284aaddfd168f66d1d4192ce4f5fdcbbd1b6cf3
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
