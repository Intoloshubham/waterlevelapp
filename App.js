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
  Animated,
} from 'react-native';
import {Title} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Svg, {Path, Circle} from 'react-native-svg';
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
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          height: 40,
          backgroundColor: 'skyblue',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Title style={{fontWeight: 'bold'}}>Water info </Title>
        <Ionicons
          // name="md-water-outline"
          // color="skyblue"
          name="ios-water"
          size={30}
        />
      </View>

      <ScrollView>
        <View
          style={{
            marginBottom: 10,
            alignItems: 'center',
            // position: 'relative',
            
           
          }}>
          <Title>{'80%'}</Title>
          <Image
            source={require('./img/4.png')}
            style={{width: 200, height: 240,zIndex:1}}
          />
          <View
            style={{
              backgroundColor: 'skyblue',
              width: 190,
              height: 181,
              position: 'absolute',
              // marginTop: 90,
              marginVertical:90,
              borderBottomRightRadius:36,
              borderBottomLeftRadius:35,
              overflow:'hidden',
              zIndex:0
            }}></View>
          <Text style={{fontWeight: 'bold', marginBottom: 5}}>
            Live Water Level
          </Text>
        </View>
        <View style={{marginBottom: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <Entypo name="camera" size={25} />
            <Text style={{marginLeft: 10}}>Cemera View</Text>
          </View>
          {waterimage != undefined
            ? waterimage.map((ele, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      // flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{
                        uri: `${'http://107.20.37.104:8000/'}` + ele.image,
                      }}
                      style={{
                        width: 200,
                        height: 200,
                        elevation: 10,
                        backgroundColor: 'skyblue',
                        borderRadius: 100,
                        // tintColor:'white'
                      }}
                    />
                  </View>
                );
              })
            : null}
        </View>
        <View style={{margin: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16}}>Usages</Text>
            <TextInput style={styles.input} editable={false} value={'under'} />
            <Text style={{fontSize: 16}}>Quality</Text>
            <TextInput style={styles.input} editable={false} value={'safe'} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16}}>Leakage</Text>
            <TextInput style={styles.input} editable={false} value={'no'} />
            <Text style={{fontSize: 16}}>Need Cleaning</Text>
            <TextInput style={styles.input} editable={false} value={'no'} />
          </View>
        </View>
      </ScrollView>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 10,
            // backgroundColor:"skyblue"
          }}>
          <TouchableOpacity
            onPress={() => {
              alert('setting');
            }}>
            <AntDesign size={30} name="setting" />
            <Text
              style={{fontSize: 16, textAlign: 'center', marginHorizontal: -6}}>
              Setting
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              alert('refresh');
            }}>
            <Ionicons size={30} name="refresh" />
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                marginHorizontal: -10,
              }}>
              Refresh
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              alert('history');
            }}>
            <Octicons size={30} name="history" />
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                marginHorizontal: -10,
              }}>
              History
            </Text>
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
    // borderWidth: 1,
    // elevation: 10,
    padding: -6,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#F5EDDC',
    shadowOpacity: 5,
    shadowRadius: 10,

    color: 'black',
    fontSize: 15,
    marginLeft: 20,
  },
  input1: {
    height: 25,
    width: 30,
    // margin: 5,
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
    marginLeft: 20,
  },
});
