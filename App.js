import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated
} from 'react-native';
import {Title} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Svg, { Path,Circle } from 'react-native-svg';
// import Animated from 'react-native-reanimated';

const SIZE = Dimensions.get('window').width;
// const AnimatedPath = Animated.createAnimatedComponent(Path)

const App = () => {
  const [waterimage, setwaterimage] = useState([]);

  const liveimage = async () => {
    try {
      const res = await fetch('http://107.20.37.104:8000/api/water-level', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      // console.log(data)
      setwaterimage(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    liveimage();
  }, [waterimage]);

  return (
    <View style={{flex: 1, backgroundColor: '#FA9494'}}>
      <View
        style={{
          width: '100%',
          height: 50,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Title style={{fontWeight:"bold"}}>Water info </Title>
        <Ionicons
          // name="md-water-outline"
          color="skyblue"
          name="ios-water"
          size={35}
        />
      </View>
      <ScrollView>
        <View
          style={{
            margin: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems:"center",
            width:"100%",
            // backgroundColor:"green"
          }}>
          <Image
            source={require('./img/1.png')}
            style={{width: 200, height: 200}}
          />
          <View style={{width: '45%'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: "space-evenly",
                alignItems: 'center',
              }}>
              <TextInput style={styles.input} />
              <Text>user</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: "space-evenly",
                alignItems: 'center',
              }}>
              <TextInput style={styles.input} />
              <Text>user</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: "space-evenly",
                alignItems: 'center',
              }}>
              <TextInput style={styles.input} />
              <Text>user</Text>
            </View>
          </View>
        </View>
        <View style={{margin: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Title>Need Cleaning</Title>
            <TextInput style={styles.input} value={'yes'} />
            <View>
              <Text>Yes</Text>
              <Text>Not now</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: 150,
            height: 150,
            backgroundColor: 'skyblue',
            justifyContent: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
            borderRadius: 500,
            marginTop: 10,
            borderWidth:2
          }}>
          <Title style={{alignSelf: 'center'}}>{'100%'}</Title>
        </View>
        <View style={{margin: 10}}>
          {waterimage != undefined
            ? waterimage.map((ele, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      // alignItems:"center"
                    }}>
                    <Image
                      source={{
                        uri: `${'http://107.20.37.104:8000/'}` + ele.image,
                        
                      }}
                      alt='not found image'
                      style={{width: 200, height: 200,borderRadius:10,backgroundColor:"red"}}
                    />
                    <Title>Ledstatus</Title>
                    <TextInput
                      style={styles.input1}
                      value={ele.led_status.toString()}
                      editable={false}
                    />
                  </View>
                );
              })
            : null}
        </View>
      </ScrollView>
      <View style={{backgroundColor: '#fff'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              alert('setting');
            }}>
            <AntDesign size={25} name="setting" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              alert('history');
            }}>
            <Octicons size={20} name="history" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  input: {
    height: 30,
    width: 70,
    margin: 5,
    borderWidth: 1,
    elevation: 10,
    padding: -6,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#F5EDDC',
    shadowOpacity: 5,
    shadowRadius: 10,
  },
  input1: {
    height: 30,
    width: 50,
    margin: 5,
    borderWidth: 1,
    elevation: 10,
    padding: -6,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#F5EDDC',
    shadowOpacity: 5,
    shadowRadius: 10,
    color: 'black',
    fontSize: 20,
  },
});
