import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Button,
  Switch,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {getWaterdata, getImage} from '../Controller/Api/api';

const WaterTank = () => {
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

  const getWater = async () => {
    const data = await getWaterdata();
    if (data.status === 200) {
      // console.log(data);
      setIsLoaded(false);
      setShowWaterdata(data.data);
    } else {
      console.log('data not found');
    }
  };
  const getshowimage = async () => {
    const data = await getImage();
    setShowImage(data);
  };

  useEffect(() => {
    getshowimage();
  }, [showImage]);

  // console.log(showImage)

  useEffect(() => {
    getWater();
  }, []);

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
                <View style={{alignItems: 'center', marginTop: 10}} key={index}>
                  <Image
                    // source={{uri: `${'http://107.20.37.104:8000/'}` + ele.image}}
                    source={{uri: ele.image}}
                    style={{width: 200, height: 200}}
                  />
                </View>
              );
            })
          : null}
      </ScrollView>
    </View>
  );
};

export default WaterTank;
const styles = StyleSheet.create({});
