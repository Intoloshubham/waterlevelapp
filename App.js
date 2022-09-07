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
  // const [count, setcount] = useState(10)

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
          // color="#fff"
          name="ios-water"
          size={30}
        />
      </View>

      <ScrollView>
        <View
          style={{
            marginTop: 10,
            alignItems: 'center',
            // position: 'relative',
          }}>
          <Title style={{position: 'absolute', top: 15, textAlign: 'center'}}>
            {'80%'}
          </Title>
          <Image
            source={require('./img/4.png')}
            style={{width: 160, height: 190, zIndex: 1}}
          />
          <View
            style={{
              backgroundColor: 'skyblue',
              width: 153,
              height: 133,
              position: 'absolute',
              bottom: 27,
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 32,
              // left:10,
              zIndex: 0,
            }}></View>
          <Text style={{fontWeight: 'bold', marginTop: 5}}>
            Live Water Level
          </Text>
        </View>

        {waterimage.length > 0 ? (
          waterimage.map((ele, index) => {
            return (
              <View
                key={index}
                style={{
                  alignItems: 'center',
                  margin: 10,
                }}>
                <Image
                  source={{uri: `${'http://107.20.37.104:8000/'}` + ele.image}}
                  style={{
                    width: 160,
                    height: 160,
                    borderRadius: 100,
                    zIndex:1
                  }}
                />
              </View>
            );
          })
        ) : (
          <View style={{alignItems: 'center',margin: 10,}}>
            <View
              style={{
                width: 160,
                height: 160,
                backgroundColor: 'skyblue',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
                borderWidth: 2,

              }}></View>
          </View>
        )}
        <View style={{alignItems: 'center',position:"absolute"}}>
            <View
              style={{
                width: 170,
                height: 170,
                // backgroundColor: 'skyblue',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
                borderWidth: 0.3,
                top:229,
                left:112,
                right:10,
                zIndex:0

              }}></View>
          </View>
        <View
          style={{
            // flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <Entypo name="camera" size={25} style={{marginTop: 10}} />
          <Text style={{marginLeft: 10}}>Live Cemera View</Text>
        </View>
        <View style={{margin: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 16}}>Usages</Text>
            <TextInput style={styles.input} editable={false} value={'under'} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 16}}>Quality</Text>
            <TextInput style={styles.input} editable={false} value={'safe'} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 16}}>Leakage</Text>
            <TextInput style={styles.input} editable={false} value={'no'} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
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
            marginTop: 10,
            // backgroundColor:"skyblue"
          }}>
          <TouchableOpacity
            onPress={() => {
              alert('setting');
            }}>
            <AntDesign size={25} name="setting" />
            <Text
              style={{fontSize: 16, textAlign: 'center', marginHorizontal: -8}}>
              Setting
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: 60,
              height: 60,
              borderWidth: 1,
              borderRadius: 50,
            }}>
            <TouchableOpacity
              onPress={() => {
                alert('refresh');
              }}>
              <Ionicons size={20} name="refresh" style={{left:20}} />
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'center',
                  // marginHorizontal: -,
                }}>
                Refresh
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              alert('history');
            }}>
            <Octicons size={25} name="history" />
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
    width: 230,
    margin: 5,
    borderWidth: 0.2,
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
    // borderWidth: 1,
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

// `${'http://107.20.37.104:8000/'}` +
