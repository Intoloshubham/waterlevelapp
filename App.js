import React, {useState, useEffect} from 'react';
import {View, Button, Switch, Image, ScrollView} from 'react-native';
import {Card, Title} from 'react-native-paper';

const App = () => {
  const [count, setCount] = useState(50);
  const [newcount, setNewCount] = useState(count);
  const [isEnabled, setIsEnabled] = useState(false);
  const [showwaterdata, setShowWaterdata] = useState([]);
  const [showImage, setShowImage] = useState([]);

  const [isLoaded, setIsLoaded] = useState(true);
  const toggleSwitch = () => {
    if (isEnabled) {
      // alert("whie")
      setNewCount(count);
    } else {
      setNewCount(count);
      // alert("yellw")
    }
    // console.log(count)
    setIsEnabled(previousState => !previousState);
  };

  const addWater = () => {
    setCount(count + 10);
  };

  const subWater = () => {
    setCount(count - 10);
  };

  const getshowimage = async () => {
    try {
      const res = await fetch('http://107.20.37.104:8000/api/water-level', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      // console.log(data)
      setShowImage(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getshowimage();
  }, [showImage]);

  return (
    <View style={{flex: 1}}>
      <View style={{borderWidth: 1, margin: 10}}>
        <Card>
          <Card.Content>
            <Title style={{textAlign: 'center'}}>Water Tracker</Title>
          </Card.Content>
        </Card>
      </View>
      <View style={{margin: 10}}>
        <Card style={{borderWidth: 1}}>
          <Card.Content>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {isEnabled ? <Title>switchon</Title> : <Title>switchoff</Title>}
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </Card.Content>
        </Card>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 50,
          margin: 10,
        }}>
        <View>
          <Title>Cups</Title>
        </View>
        <View
          style={{
            height: 200,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 2,
            width: 200,
            justifyContent: 'flex-end',
            marginLeft: 30,
            position: 'relative',
          }}>
          <View
            style={{
              // marginTop: 80,
              backgroundColor: 'skyblue',
              height: isEnabled
                ? count
                : newcount && isEnabled
                ? newcount
                : count,
              alignItems: 'center',
            }}>
            <Title
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {count + '%'}
            </Title>
          </View>
        </View>
        <View>
          <Title>{count + '%'}</Title>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {isEnabled ? (
          <Button title="+" onPress={() => addWater()} />
        ) : (
          <Button title="-" onPress={() => subWater()} />
        )}
      </View>
      <ScrollView>
        {showImage != undefined
          ? showImage.map((ele, index) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: 10,
                    backgroundColor: 'yellow',
                  }}
                  key={index}>
                  <Image
                    source={{
                      uri: `${'http://107.20.37.104:8000/'}` + ele.image,
                    }}
                    style={{width: 300, height: 250}}
                  />
                </View>
              );
            })
          : null}
      </ScrollView>
    </View>
  );
};

export default App;
