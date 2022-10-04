import React from 'react';
import {View, Text, Image} from 'react-native';

const History = () => {
  const [image, setImage] = React.useState();

  const getImage = () => {
    fetch('http://107.20.37.104:8000/api/water-level')
      .then(res => res.json())
      .then(data => setImage(data.image));
  };

  React.useEffect(() => {
    setInterval(() => {
      getImage();
    }, 5000);
  }, []);

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {/* <Image source={{uri: image}} style={{height: 350, width: 350}} /> */}
      <Text>History</Text>
    </View>
  );
};

export default History;
