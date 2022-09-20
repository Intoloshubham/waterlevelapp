

// // const getWaterImage = async () => {
  
// //   try {
// //     const res = await fetch('https://username:password@dynupdate.no-ip.com/nic/update?hostname=mytest.example.com&myip=192.0.2.25', {
// //       method: 'get',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //     });
// //     const data = await res.json();
// //     return data;
// //   } catch (error) {
// //     console.log(error);
// //   }
// // }
  const getImage = async () => {
  
    try {
      // const res = await fetch('http://107.20.37.104:8000/api/water-level', {
      const res = await fetch('http://192.168.1.99:1735/api/water-level', {
    //   const res = await fetch('https://lambaarpit12@gmail.com:bomberman@dynupdate.no-ip.com/nic/update?hostname=mytest.example.com&myip=192.168.1.4', {
      // const res = await fetch(' http://27.57.152.51/', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
};

export {getImage,};
