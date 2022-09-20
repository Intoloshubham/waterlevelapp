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
import {widthToDo, heightToDo} from '../Controller/Api/ImageResponse';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

// const SIZE = Dimensions.get('window').width;
const {height, width} = Dimensions.get('window');

const AnimationWaterapp = () => {
  const [waterImage, setwaterImage] = useState([]);
  const [waterHight, setWaterHight] = useState('');
  const [level, setLevel] = useState('');
  const [status, setStatus] = useState('');
  const [phvalue, setPhValue] = useState('');
  const [baseString, setbaseString] = useState('');

  const liveImage = async () => {
    try {
        const data = await getImage();
        if (data.status === 200) {
            // console.log(data);
            setwaterImage(data.data);
        }
    } catch (error) {
        console.log(error);
    }
    
  };

  const getBaseString = async () => {
    try {
        const data = await fetch('http://192.168.1.99:1735/uploads/water.png', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setbaseString(data);
        console.log(data)
    } catch (error) {
        console.log(error);
    }
    
  };

  useEffect(() => {
    // liveImage();
    getBaseString()
    // liveWaterData();
    
  });

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
  
  console.log(waterImage)
  return (
    <View style={{flex:1,backgroundColor:"#fff"}}>
      <ScrollView>
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

        {/* <View
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
            </View>  */}
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
            {Math.floor(level)}%
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
                width: widthToDo((number = '12%')),
                height: heightToDo((number = '7.5%')),
              }}
            />
            <View
              style={{
                // bottom: heightToDo((number = '5.5%')),
                bottom: level ? level : null,
                position: 'absolute',
              }}>
              {level > 0  ? (
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
                width: widthToDo((number = '11.5%')),
                // height: heightToDo((number = '5%')),
                // height:height/6,
                height: level ? level : null,
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

        <View
                style={{
                  alignItems: 'center',
                  // marginTop: 40,
                }}>

                <Image
                  source={{
                    // uri: `${'http://107.20.37.104:8000/'}` + ele.image,
                    // uri: `${'http://192.168.1.99:8000/'}` + ele.image,
                    // uri: `data:image/png;base64,${'http://192.168.1.99:1735/api/water-level'}`,
                    uri: `${'http://192.168.1.99:1735/uploads/water.png'}`,
                    // uri: 'data:image/png;base64,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',
                  }}
                  style={{
                    width: 160,
                    height: 160,
                    width: widthToDo(number='15%'),
                    height: heightToDo(number='8%'),
                    borderRadius: 100,
                    borderWidth: 2,
                    marginTop: heightToDo(number='2%'),
                    zIndex: 1,
                    bottom: heightToDo(number='1.5%'),
                  }}
                />
              </View>

        {waterImage.length > 0 ? (
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
                    // uri: `${'http://107.20.37.104:8000/'}` + ele.image,
                    // uri: `${'http://192.168.1.99:8000/'}` + ele.image,
                    uri: `${'http://192.168.1.99:1735/api/water-level'}`,
                  }}
                  style={{
                    // width: 160,
                    // height: 160,
                    width: widthToDo(number='15%'),
                    height: heightToDo(number='8%'),
                    borderRadius: 100,
                    borderWidth: 2,
                    marginTop: heightToDo(number='2%'),
                    zIndex: 1,
                    bottom: heightToDo(number='1.5%'),
                  }}
                />
              </View>
            );
          })
        ) : (
          <View style={{alignItems: 'center', margin: 10}}>
            {/* <Image
                style={{
                    width: 150,
                    height: 150,
                }}
                source={{
                uri: 'http://192.168.1.99:8000/uploads/1663578294520_816139897.png',
                }}
            /> */}
            <View
              style={{
                width: widthToDo(number='15%'),
                height: heightToDo(number='8%'),
                top:  heightToDo(number='0.1%'),
                // backgroundColor: 'skyblue',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
                borderWidth: 1,
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
          <Entypo name="camera" size={25} color = {'black'}/>
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
            <Text style={{fontSize: widthToDo(number='1.5%'), color: 'black', marginBottom: heightToDo(number='0.7%')}}>
              Usages{' : '}
            </Text>
            <Text style={{fontSize: widthToDo(number='1.5%'), color: 'black', marginBottom: heightToDo(number='0.7%')}}>
              PH Value{' : '}
            </Text>
            <Text style={{fontSize: widthToDo(number='1.5%'), color: 'black', marginBottom: heightToDo(number='0.7%')}}>
              Quality{' : '}
            </Text>
            <Text style={{fontSize: widthToDo(number='1.5%'), color: 'black', marginBottom: heightToDo(number='0.7%')}}>
              Leakage{' : '}
            </Text>
            <Text style={{fontSize: widthToDo(number='1.5%'), color: 'black', marginBottom: heightToDo(number='0.7%')}}>
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
              value={'' +  Math.floor(phvalue)}
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