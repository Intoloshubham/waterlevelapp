const postRemoteControl = async formData => {
  try {
    const res = await fetch(
      `http://107.20.37.104:8000/api/led-status/1`,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {postRemoteControl};
