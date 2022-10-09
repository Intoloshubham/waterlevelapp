import React, {useState, useEffect} from 'react';
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
import  Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Lottie from 'lottie-react-native';
import anyimage from '../img/4.png';
import Video from 'react-native-video';
import {getImage} from '../Controller/Api/api';
import database from '@react-native-firebase/database';
import {Title} from 'react-native-paper';
import {widthToDo, heightToDo} from '../Controller/Api/ImageResponse';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// const SIZE = Dimensions.get('window').width;
const {height, width} = Dimensions.get('window');

// import { VLCPlayer, VlCPlayerView } from 'react-native-vlc-media-player';
// import Orientation from 'react-native-orientation';

const AnimationWaterapp = () => {
  const [waterImage, setwaterImage] = useState([]);
  const [waterHight, setWaterHight] = useState('');
  const [level, setLevel] = useState('');
  const [status, setStatus] = useState('');
  const [phvalue, setPhValue] = useState('');
  const [waterimagedata, setwaterimagedata] = useState()




  const liveImage = async () => {
    const data = await getImage();
    // console.log(data);
    setwaterImage(data);
    // data.data.map(e => {
    //   setWaterHight(e.water_level);
    // });
  };

  // const live = async () => {
  //   const data = await fetch('http://107.20.37.104:8000/uploads/water.png')
  //   console.log(data)
  //   console.log(data.bodyBlob)

  //   setwaterimagedata(data.url)
    
  // };

  // useEffect(() => {
  //   // live();
  //   liveImage();
  //   liveWaterData();
  // },[waterImage]);


//  console.log(waterimagedata)



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
    <View style={{flex:1,backgroundColor:"#fff"}}>
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

        {/* old code   */}
           {/* <View style={{justifyContent:"center",alignItems:"center",position:"relative"}}>
            {waterimagedata != undefined?
              <Image
                style={{
                    width: 150,
                    height: 150,
                    backgroundColor:"yellow",
                    borderRadius:100,
                }}
                source={{
                uri:waterimagedata,
                }}
            />
            
            :<View style={{
              width: 150,
              height: 150,
             borderWidth:2,
              borderRadius:100,
            }}>
              </View>}
              </View> */}
            <View style={{position:"absolute",top:250,left:280}}>
            <TouchableOpacity style={{marginLeft:25,}}onPress={()=>liveImage()}>
          <Fontisto name='spinner-refresh' size={24} color='blue'/>
          </TouchableOpacity>
            </View>

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
                    // uri: `${'http://192.168.1.99:8000/'}` + ele.image,
                    uri:  ele.image 
                  }}
                  style={{
                    // width: 160,
                    // height: 160,
                    width: wp(40),
                    height: hp(21.2),
                    borderRadius: 100,
                    borderWidth: 2,
                    marginTop: heightToDo(number='2%'),
                    zIndex: 1,
                    bottom: 29,
                    // backgroundColor:"red"
                  }}
                />
              </View>
            );
          })
        ) : (
          <View style={{alignItems: 'center', margin: 10}}>
           
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
         
          <Entypo  name="camera" size={25} color = {'black'}/>
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
        {/* <View>
          <Image source={{uri:waterimagedata}}
          style={{width:200,height:200}}
          />

        </View> */}
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

{/* <VlCPlayerView
          autoplay={false}
          url="http://192.168.0.131/"
          Orientation={Orientation}
          ggUrl=""
          showGG={true}
          showTitle={true}
          title="Big Buck Bunny"
          showBack={true}
          onLeftPress={()=>{}}
       /> */}

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

// data:image/png;base64
