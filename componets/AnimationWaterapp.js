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
import anyimage from '../img/4.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getImage} from '../Controller/Api/api';
import database from '@react-native-firebase/database';
import {Title} from 'react-native-paper';

// const SIZE = Dimensions.get('window').width;
const {height, width} = Dimensions.get('window');

const AnimationWaterapp = () => {
  const [waterImage, setwaterImage] = useState([]);
  const [waterHight, setWaterHight] = useState('');
  const [level, setLevel] = useState('');
  const [status, setStatus] = useState('');
  const [phvalue, setPhValue] = useState('');

  const liveImage = async () => {
    const data = await getImage();
    // console.log(data);
    setwaterImage(data);
    // data.map(e => {
    //   setWaterHight(e.water_level);
    // });
  };

  useEffect(() => {
    liveImage();
    liveWaterData();
  }, []);

  const liveWaterData = () => {
    const LEVEL_ref = database().ref('/LEVEL');
    const LED_STATUS = database().ref('/LED_STATUS');
    const PH_VALUE = database().ref('/pH');
    LEVEL_ref.on('value', snapshot => {
      // console.log('LEVEL data: ', snapshot.val());
      setLevel(snapshot.val());
    });
    LED_STATUS.on('value', snapshot => {
      // console.log('STATUS : ', snapshot.val());
      setStatus(snapshot.val());
    });
    PH_VALUE.on('value', snapshot => {
      // console.log('phvalue: ', snapshot.val());
      setPhValue(snapshot.val());
    });
  };
  // console.log(phvalue)

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View
          style={{
            marginTop: 20,
            alignItems: 'center',
            // position: 'relative',
          }}>
          <Text
            style={{
              position: 'absolute',
              top: 10,
              textAlign: 'center',
              color: 'black',
              zIndex: 2,
            }}>
            {level}%
          </Text>
         
          {/* <View>
            <Image
              source={require('../img/4.png')}
              style={{width: wp(35), height: hp(21), zIndex: 3}}
              // style={{width: 132, height: 162, zIndex: 3}}
            />
          </View> */}
          {/* animation view  */}
          {/* <View
            style={{
              position: 'absolute',
              bottom: 100,
              left: 132,
              bottom: level ? level : null,
              // bottom: 50,
            }}>
            {level ? (
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
              />
             ) : null}
          </View>
        </View> */}
        {/* <View
          style={{
            backgroundColor: '#3490dc',
            width: wp(33),
            height: level ? level : null,
            // height: 50,
            position: 'absolute',
            left: 132,
            bottom: 458,
            // bottom: 278,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 22,
            zIndex: 0,
            overflow: 'hidden',
          }}></View>  */}
          

          {/* responsive water tank */}

          <View
            style={{
              // backgroundColor: 'yellow',
              width: width - 40,
              height: height / 5,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
            
            }}>
            <Image
              source={anyimage}
              style={{zIndex: 2, width: width - 260, height: height / 5,}}
            />
            
            <View
              style={{
                //   position: 'absolute',
                //   bottom: 100,
                //   left: 132,
                bottom: level ? level : null,
                // bottom: 105,
              }}>
                {level?
              <Lottie
                style={{
                  //   width: 145,
                  width: width - 275,
                  //   position: 'absolute',
                  zIndex: 1,
                  backgroundColor: '#3490dc',
                }}
                source={require('../img/demo.json')}
                autoPlay
                loop
              />:null}
            </View>
            <View
              style={{
                backgroundColor: '#3490dc',
                // width:145,
                width: width - 270,
                // height:100,
                // height:height/6,
                height: level ? level : null,
                bottom: 6,
                position: 'absolute',
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 22,
                zIndex: 0,
              }}></View>
         </View>
        </View> 

        {/* end of water tank  */}
        <Text style={{color: 'black', textAlign: 'center'}}>
          Live Water Level
        </Text>

        {waterImage != undefined ? (
          waterImage.map((ele, index) => {
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
                    // width: 160,
                    // height: 160,
                    width: wp(40),
                    height: hp(21.2),
                    borderRadius: 100,
                    borderWidth: 2,
                    marginTop: 40,
                    zIndex: 1,
                    bottom: 29,
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
                top: 3,
                // backgroundColor: 'skyblue',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
                borderWidth: 2,
              }}></View>
          </View>
        )}
        {/* <View style={{alignItems: 'center', position: 'absolute'}}>
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
          </View> */}
        <View
          style={{
            // flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <Entypo name="camera" size={25} />
          <Text style={{color: 'black'}}>Live Cemera View</Text>
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
            <TextInput style={styles.input} editable={false} value={'under'} />

            {/* <Text style={{fontSize:16,fontWeight:"bold"}}>{phvalue}</Text> */}
            <TextInput
              style={styles.input}
              editable={false}
              value={'' + phvalue}
            />
            {/* {phvalue > 5  && phvalue < 7 ? <Text>{"safe"}</Text> :<Text>{"unsafe"}</Text>} */}
            {phvalue >= 5 && phvalue < 8 ? (
              <TextInput style={styles.input} editable={false} value={'safe'} />
            ) : (
              <TextInput
                style={styles.input}
                editable={false}
                value={'unsafe'}
              />
            )}

            {/* <TextInput style={styles.input} editable={false} value={'safe'} />
            <TextInput style={styles.input} editable={false} value={'unsafe'} /> */}

            <TextInput style={styles.input} editable={false} value={'no'} />
            <TextInput style={styles.input} editable={false} value={'no'} />
          </View>
        </View>
      </ScrollView>
      {/* <View>
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
        </View> */}
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
