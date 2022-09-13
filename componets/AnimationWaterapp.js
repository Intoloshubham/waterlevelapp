import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Lottie from 'lottie-react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getImage } from '../Controller/Api/api';

const SIZE = Dimensions.get('window').width;


const AnimationWaterapp = () => {
  const [waterimage, setwaterimage] = useState([]);
  const [waterhight, setWaterhight] = useState('');
 
  const liveimage = async () => {
    // try {
    //   const res = await fetch('http://107.20.37.104:8000/api/water-level', {
    //     method: 'get',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    //   const data = await res.json();
    //   // console.log(data)
    //   setwaterimage(data.data);
    //   data.data.map(e => {
    //     // water_level = e.water_level;
    //     setWaterhight(e.water_level);
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    const data = await getImage();
    if (data.status === 200) {
      // console.log(data);
      setwaterimage(data.data);
      data.data.map(e => {
      setWaterhight(e.water_level);
      });
    } else {
      console.log('data not found');
    }
  };
  useEffect(() => {
    // liveimage();
  }, [waterimage, waterhight]);

 
  const pageRefresh = () => {
    alert('app');
  };

  return (
    <View style={{flex: 1}}>
      {/* <View
        style={{
          width: Dimensions.get('window').width="100%",
          height: Dimensions.get('window').height=700,
        }}> */}
          {/* <View style={{width:wp(100),height:hp(50),backgroundColor:"red"}}>
            <Text>dbfgsdkfjhskldfjklsdfhk</Text>
          </View> */}
        <ScrollView>
          <View
            style={{
              marginTop: 10,
              alignItems: 'center',
              position: 'relative',
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
                source={require('../img/4.png')}
                style={{width: wp(35), height: hp(21), zIndex: 3}}
                // style={{width: 132, height: 162, zIndex: 3}}
              />
            </View>
            {/* animation view  */}
            <View
              style={{
                position: 'absolute',
                bottom: 100,
                left: 132,
                bottom: waterhight ? waterhight : null,
              }}>
                {waterhight?
               <Lottie
                style={{
                  width: wp(33),
                  // position: 'absolute',
                  zIndex: 1,
                  backgroundColor: '#3490dc',
                }}
                source={require('../img/demo.json')}
                autoPlay
                loop
              /> :null}
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#3490dc',
              width: wp(33),
              height: waterhight ? waterhight : null,
              // height: 0,
              position: 'absolute',
              left: 132,
              bottom: 478,
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 22,
              zIndex: 0,
              overflow: 'hidden',
            }}></View>
          <Text style={{marginTop: 10, color: 'black', textAlign: 'center'}}>
            Live Water Level
          </Text>

          {waterimage.length > 0 ? (
            waterimage.map((ele, index) => {
              return (
                <View
                  key={index}
                  style={{
                    alignItems: 'center',
                    // marginTop: 40,
                  }}>
                  <Image
                    source={{
                      uri: `${'http://107.20.37.104:8000/'}` + ele.image,
                    }}
                    style={{
                      width: 160,
                      height: 160,
                      // width: wp(24),
                      // height: 160,
                      borderRadius: 100,
                       marginTop: 40,
                      zIndex: 1,
                      bottom:29
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
                  top:3,
                  // backgroundColor: 'skyblue',
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
                borderWidth: 2,
                top: 205,
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
            <Entypo name="camera" size={25}  />
            <Text style={{color: 'black',}}>Live Cemera View</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // backgroundColor: 'red',
              // marginTop: 5,
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
                PH Value{' : '}
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
              <TextInput
                style={styles.input}
                editable={false}
                value={'under'}
              />
              <TextInput style={styles.input} editable={false} value={'5.6'} />
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
              // marginTop: 10,
              // backgroundColor:"skyblue"
            }}>
            <TouchableOpacity
              onPress={() => {
                alert('setting');
              }}>
              <AntDesign size={25} name="setting" />
              <Text
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  marginHorizontal: -8,
                }}>
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
              <TouchableOpacity onPress={() => pageRefresh()}>
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
      {/* </View> */}
    </View>
  );
};

export default AnimationWaterapp;

const styles = StyleSheet.create({
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
  },
});

// `${'http://107.20.37.104:8000/'}` +
