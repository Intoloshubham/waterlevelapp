import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Lottie from 'lottie-react-native';
import anyimage from '../img/4.png';
import Video from 'react-native-video';
import {getImage} from '../Controller/Api/api';
import database from '@react-native-firebase/database';
import {widthToDo, heightToDo} from '../Controller/Api/ImageResponse';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
    setwaterImage(data.data);
    // data.data.map(e => {
    //   setWaterHight(e.water_level);
    // });
  };

  useEffect(() => {
    liveImage();
    liveWaterData();
  }, [waterImage]);

  // var image_url = 'http://27.57.152.51/';
  // console.log(image_url);

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

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
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
              top: heightToDo((number = '1%')),
              textAlign: 'center',
              color: 'black',
              zIndex: 2,
            }}>
            {Math.floor(level > 0 ? level : null)}%
          </Text>
          <View
            style={{
              // backgroundColor: 'yellow',
              // width: widthToDo((number = '30%')),
              // height: heightToDo((number = '15%')),
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
            }}>
            <Image
              source={anyimage}
              style={{
                zIndex: 2,
                width: widthToDo((number = '12.5%')),
                height: heightToDo((number = '7.5%')),
              }}
            />
            <View
              style={{
                // bottom: heightToDo((number = '5.5%')),
                bottom: level ? level : null,
                position: 'absolute',
                // bottom:100,
              }}>
              {level > 0 ? (
                <Lottie
                  style={{
                    //   width: 145,
                    width: widthToDo((number = '11.5%')),
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
            <View
              style={{
                backgroundColor: '#3490dc',
                // width:145,
                width: widthToDo((number = '11.7%')),
                // height: heightToDo((number = '5%')),
                // height:100,
                height: level > 0 ? level : null,
                bottom: heightToDo((number = '0.09%')),
                position: 'absolute',
                borderBottomRightRadius: heightToDo((number = '1.2%')),
                borderBottomLeftRadius: heightToDo((number = '1.2%')),
                zIndex: 0,
              }}></View>
          </View>
        </View>

        {/* end of water tank  */}
        <Text style={{color: 'black', textAlign: 'center'}}>
          Live Water Level
        </Text>

        {/* old code   */}
        {waterImage.length > 0 ? (
          waterImage.map((ele, index) => {
            // {console.log(ele.image)}
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
              alignItems: 'flex-end',
              padding: 5,
              // marginLeft: 25,
            }}>
            <Text style={{fontSize: 16, color: 'black', margin: 5}}>
              Usages{' : '}
            </Text>
            <Text style={{fontSize: 16, color: 'black', margin: 5}}>
              PH Value{' : '}
            </Text>
            <Text style={{fontSize: 16, color: 'black', margin: 5}}>
              Quality{' : '}
            </Text>
            <Text style={{fontSize: 16, color: 'black', margin: 6}}>
              Leakage{' : '}
            </Text>
            <Text style={{fontSize: 16, color: 'black', margin: 6}}>
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
              // value={parseFloat(exFloat.toFixed(2))}
            />

            {phvalue >= 5 && phvalue < 8 ? (
              <TextInput style={styles.input} editable={false} value={'safe'} />
            ) : (
              <TextInput
                style={styles.input}
                editable={false}
                value={'unsafe'}
              />
            )}

            <TextInput style={styles.input} editable={false} value={'no'} />
            <TextInput style={styles.input} editable={false} value={'no'} />
          </View>
        </View>
        {/* <View> */}
          {/* <Image
            style={{width: 100, height: 100,backgroundColor:"yellow"}}
            source={{
              uri:"image_url",
            }}
          /> */}
          {/* <Video
          source={{ uri: 'http://27.57.152.51/' }}
          rate={1.0}
          volume={1.0}
          muted={false}
          resizeMode="cover"
          repeat
          style={{ width: 300, height: 200,backgroundColor:"gray"}}
        />
        </View> */}
      </ScrollView>
    </View>
  );
};

export default AnimationWaterapp;

const styles = StyleSheet.create({
  // input: {
  //   height:heightToDo(number='1.2%'),
  //   width: widthToDo(number='10%'),
  //   margin: widthToDo(number='0.5%'),
  //   borderWidth:widthToDo(number='0.1%'),
  //   padding: widthToDo(number='0.1%'),
  //   paddingLeft: widthToDo(number='0.8%'),
  //   borderRadius: widthToDo(number='0.5%'),
  //   backgroundColor: '#F5EDDC',
  //   color: 'black',
  //   fontSize: widthToDo(number='1.8%'),
  // },
  input: {
    height: 25,
    width: 100,
    margin: 4,
    borderWidth: 1,
    // elevation: 10,
    padding: -6,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#F5EDDC',
    // shadowOpacity: 5,
    // shadowRadius: 10,
    color: 'black',
    fontSize: 15,
  },
});

// `${'http://107.20.37.104:8000/'}` +
