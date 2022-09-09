import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import {Title} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Svg, {Path, Circle} from 'react-native-svg';
import Lottie from 'lottie-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Animated from 'react-native-reanimated';
const Stack = createNativeStackNavigator();
const SIZE = Dimensions.get('window').width;
// const AnimatedPath = Animated.createAnimatedComponent(Path)

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const AnimationWaterapp = () => {
  const [waterimage, setwaterimage] = useState([]);
  const [waterhight, setWaterhight] = useState('');
  const [animathight, setAnimathight] = useState('');

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    console.log('first');
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
      data.data.map(e => {
         water_level = e.water_level
         setWaterhight(water_level);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(animathight)

  

  // console.log(waterhight)

  // const animationhight=()=>{
  //   var toplevel = 80;
  //   var level = 0;
  //   var final_level = 0;
  //   var waterhightdata = 150;
  //   var abs = waterhight
  //   if(abs <= waterhightdata){
  //     level = waterhightdata - waterhight 
  //     final_level = 0;
  //     final_level = toplevel + level;
  //   }
  //   setAnimathight(final_level);
  //   // console.log(final_level);
  // }
 
    
  useEffect(() => {
    liveimage();
  }, [waterimage, waterhight,animathight]);
   
    
  return (
    <View style={styles.container}>
      {/* <View
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
      </View> */}

      <ScrollView>
        <View
          style={{
            marginTop: 10,
            alignItems: 'center',
            position: 'relative',
            // flexDirection:"row",
            justifyContent:"center",
            alignItems:"center"
          }}>
           
          <Text
            style={{
              position: 'absolute',
              top: 20,
              textAlign: 'center',
              color: 'black',
              zIndex: 2,
            }}>
            {waterhight}%
          </Text>
         
         <View>
          <Image
            source={require('./img/4.png')}
            style={{width: 135, height: 162, zIndex: 3}}
          />
         </View>
          {/* animation view  */}
          <View
            style={{
              position: 'absolute',
              bottom:100,
              left: 132,
              bottom:waterhight?waterhight:null,
            }}>
            <Lottie
              style={{
                width: 130,
                // position: 'absolute',
                zIndex: 1,
              }}
              source={require('./img/demo.json')}
              autoPlay
              loop
              />
              </View>
          </View>
          <View
            style={{
              backgroundColor: '#3490dc',
              width: 130,
              height: waterhight ? waterhight : null,
              // height: 0,
              position: "absolute",
              left:132,
              bottom: 452,
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 22,
              zIndex: 0,
              overflow:"hidden"
            }}></View>
          <Text style={{marginTop: 5, color: 'black',textAlign:"center",}}>Live Water Level</Text>
        

        {waterimage.length > 0 ? (
          waterimage.map((ele, index) => {
            return (
              <View
                key={index}
                style={{
                  alignItems: 'center',
                  marginTop: 40,
                }}>
                <Image
                  source={{uri: `${'http://107.20.37.104:8000/'}` + ele.image}}
                  style={{
                    width: 160,
                    height: 160,
                    borderRadius: 100,
                    zIndex: 1,
                  }}
                />
              </View>
            );
          })
        ) : (
          <View style={{alignItems: 'center', margin: 10}}>
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
        <View style={{alignItems: 'center', position: 'absolute'}}>
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
              top: 229,
              left: 112,
              right: 10,
              zIndex: 0,
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
          <Text style={{color: 'black'}}>Live Cemera View</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'red',
            marginTop: 5,
          }}>
          <View
            style={{
              flex: 1,
              // backgroundColor: 'yellow',
              alignItems: 'flex-start',
              padding: 5,
              marginLeft: 25,
            }}>
            {/* <Text style={{fontSize: 16, color: 'black', marginBottom: 15}}>
              Led_Status{' : '}
            </Text> */}
            <Text style={{fontSize: 16, color: 'black', marginBottom: 15}}>
              Usages{' : '}
            </Text>
            <Text style={{fontSize: 16, color: 'black', marginBottom: 15}}>
              Quality{' : '}
            </Text>
            <Text style={{fontSize: 16, color: 'black', marginBottom: 15}}>
              Leakage{' : '}
            </Text>
            <Text style={{fontSize: 16, color: 'black', marginBottom: 15}}>
              Need Cleaning{' : '}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              // backgroundColor: 'red',
              alignItems: 'flex-start',
              padding: 5,
            }}>
            {/* <TextInput style={styles.input} editable={false} value={ele.led_status} /> */}
            <TextInput style={styles.input} editable={false} value={'under'} />
            <TextInput style={styles.input} editable={false} value={'safe'} />
            <TextInput style={styles.input} editable={false} value={'no'} />
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
              borderWidth: 0.2,
              borderRadius: 50,
            }}>
            <TouchableOpacity
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              <Ionicons size={20} name="refresh" style={{left: 20}} />
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

export default AnimationWaterapp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    // flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 25,
    width: 100,
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
    fontSize: 15,
    // marginLeft: 50,
    // flex:1,
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
