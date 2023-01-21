import React, {useState, useEffect} from 'react';
import {API_URL} from '@env';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Modal,
  Switch,
  Dimensions,
} from 'react-native';
import Lottie from 'lottie-react-native';
import DuoToggleSwitch from 'react-native-duo-toggle-switch';
import {widthToDo, heightToDo} from './setImagePixels';
import {FONTS, COLORS, icons, SIZES, images} from '../constants';
import ProgressBar from 'react-native-animated-progress';
import {
  getImage,
  getWaterLevel,
  getLEDStatus,
  getSUMPStatus,
  getPrevLevel,
} from '../controllers/getImageController';
import {postRemoteControl} from '../controllers/RemoteControlController';
import ImageZoom from 'react-native-image-pan-zoom';
import {useDispatch, useSelector} from 'react-redux';
import {CustomSwitch} from '../componets';
import {addMode} from '../redux/modeSlice';
import socketIOClient from 'socket.io-client';
import {addIntervalMode} from '../redux/intervalSlice';
import {getData} from '../utils/localStorage';

import {checkIfKeyExist} from '../utils/customFunctions';

// const END_POINT = 'http://192.168.0.117:8000';

// let socket = socketIOClient(END_POINT);

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Home = ({navigation}) => {
  let cls_interval;
  let temp_storeRegistId;
  let temp_product_name;
  let temp_registeredId = useSelector(state => state.product);

  const [productName, setProductName] = useState('');
  const [registeredId, setRegisteredId] = useState(temp_registeredId);

  const interval = useSelector(state => state.intervalMode);

  const [streamImage, setStreamImage] = React.useState();
  const [date, setDate] = React.useState();
  const [time, setTime] = React.useState();
  const [level, setLevel] = React.useState('');
  const [phValue, setPhValue] = React.useState('');
  const [square, setSquare] = React.useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [sumpLevel, setSumpLevel] = useState(0);
  const [sumpStatus, setSumpStatus] = useState(0);
  const [switchValue, setSwitchValue] = useState(false);
  const [imageView, setImageView] = useState(false);
  let prevalue = 0;
  let overflowLevelStatus = true;
  let underFlowLevelStatus = true;

  const [resetStatus, setResetStatus] = useState(true);
  var NewLevel = parseInt(level);
  const [waterLevelData, setWaterLevelData] = React.useState('');

  //toggle
  const [isEnabled, setIsEnabled] = React.useState('');

  const credFunc = async () => {
    try {
      temp_storeRegistId = await getData('primary_product');

      if (Object.keys(temp_registeredId).length === 0) {
        return temp_storeRegistId;
      } else {
        return temp_registeredId.product_id;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const getStreamImage = async () => {
    // if (checkIfKeyExist(registeredId, 'product_id')) {
    try {
      // if (registeredId) {
      const temp = await credFunc();
      const res = await getImage(temp);
      setStreamImage(res.image);
      setDate(res.date);
      setTime(res.time);
      // }
    } catch (error) {
      console.log(error);
    }
    // }
  };

  const fetchLedStatus = async () => {
    // if (checkIfKeyExist(registeredId, 'product_id')) {
    try {
      // if (registeredId) {
      const temp = await credFunc();
      const res = await getLEDStatus(temp);

      if (res.data != null) {
        setIsEnabled(res.data.led_status == 1 ? true : false);
        if (waterLevelData.motor_notification == true) {
        }
      }
      // }
    } catch (error) {
      console.log(error);
    }
    // }
  };

  const fetchSumpStatus = async () => {
    // if (checkIfKeyExist(registeredId, 'product_id')) {
    try {
      // if (registeredId) {
      const temp = await credFunc();
      const res = await getSUMPStatus(temp);
      if (res.data != null) {
        setSumpStatus(res.data.sump_status);
      }
      // }
    } catch (error) {
      console.log(error);
    }
    // }
  };

  const getPrevWaterLevel = async () => {
    try {
      if (checkIfKeyExist(registeredId, 'product_id')) {
        const res = await getPrevLevel(registeredId.product_id);
        if (res) {
          prevalue = res.prevLevel;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const WaterLevel = async () => {
    // if (checkIfKeyExist(registeredId, 'product_id')) {
    try {
      const temp = await credFunc();

      setRegisteredId(temp);
      const res = await getWaterLevel(temp);
      if (res != undefined) {
        // if (
        //   res.data.led_status == 1 &&
        //   prevalue == res.data.water_level &&
        //   resetStatus == true
        // ) {
        //   // resetStatus = false;
        //   setResetStatus(false);
        //   setWarningModal(true);
        // }

        setSumpLevel(res.data.sump_level);
        setLevel(res.data.water_level);
        setPhValue(res.data.ph_level);

        // if (parseFloat(res.data.water_level) >= 90) {
        //   if (overflowLevelStatus) {
        //     setWarningModal(true);
        //     overflowLevelStatus = false;
        //     const formData = {led_status: 0};
        //     const response = await postRemoteControl(
        //       formData,
        //       registeredId.product_id,
        //     );
        //   }
        // }

        // if (parseFloat(res.data.water_level) <= 20) {
        //   if (underFlowLevelStatus) {
        //     underFlowLevelStatus = false;
        //     const formData = {led_status: 1};
        //     const response = await postRemoteControl(
        //       formData,
        //       registeredId.product_id,
        //     );
        //   }
        // }
      }
    } catch (error) {
      console.log(error);
    }
    // }
  };

  const [refreshing, setRefreshing] = React.useState(false);

  // const onSelectSwitch = index => {
  //   if (index == 0) {
  //     setMode(0);
  // dispatch(
  //   addMode({
  //     mode: 0,
  //   }),
  // );
  //     setTimeout(() => {
  //       navigation.navigate('Remote Control');
  //     }, 700);
  //   } else {
  //     setMode(1);
  //     dispatch(
  //       addMode({
  //         mode: 1,
  //       }),
  //     );
  //   }
  // };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getStreamImage();
    WaterLevel();
    fetchLedStatus();
    fetchSumpStatus();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  React.useMemo(() => {
    (async () => {
      temp_product_name = await getData('primary_product_name');
      setProductName(temp_product_name);
      let tc = await credFunc();
      if (tc) setRegisteredId(tc);
    })();
    // console.log('temp_registeredId--', registeredId);
    // if (interval.intervalMode === true) {
    // timer.current =  setInterval(() => {
    cls_interval = window.setInterval(() => {
      WaterLevel();
      getStreamImage();
      fetchSumpStatus();
      // getPrevWaterLevel();
      // socket.emit('join_room', 'fronte');
      fetchLedStatus();
    }, 4000);

    return () => {
      window.clearInterval(cls_interval);
    };
    // }
  }, [temp_registeredId, interval.intervalMode]);

  // useEffect(() => {
  //   await updateData(id, state, setState); // API call
  // }, []);

  function renderWarningModal() {
    return (
      <Modal animationType="fade" transparent={true} visible={warningModal}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.transparentBlack7,
          }}>
          <View
            style={{
              width: '90%',
              padding: 25,
              borderRadius: 10,
              backgroundColor: COLORS.white,
            }}>
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                marginBottom: 5,
              }}
              onPress={() => setWarningModal(false)}>
              <Image
                source={icons.cross}
                style={{height: 25, width: 25, tintColor: COLORS.black}}
              />
            </TouchableOpacity>
            <View style={{marginTop: SIZES.base}}>
              <Text
                style={{textAlign: 'center', lineHeight: 30, ...FONTS.body3}}>
                {overflowLevelStatus ? (
                  <>
                    <Text
                      style={{
                        ...FONTS.body3,
                        textAlign: 'center',
                        color: 'red',
                      }}>
                      Warning: Error code 04 {'\n'}
                    </Text>
                    <Text
                      style={{...FONTS.body3, textAlign: 'center', top: 15}}>
                      Please reset device {'\n'}or{'\n'} Contact to Toll Free
                      no:{'\n'} 000 000 000
                    </Text>
                  </>
                ) : null}
              </Text>
            </View>
            {/* <TextInput
              mode="outlined"
              label="Minimum %"
              // placeholder="Type something"
              left={<TextInput.Icon icon="file-percent-outline" />}
              onChangeText={value => {
                SetMinimumPersent(value);
              }}
              value={minimumPersent}
            />
            <TextInput
              style={{marginTop: 10}}
              mode="outlined"
              label="Maximum %"
              // placeholder="Type something"
              left={<TextInput.Icon icon="file-percent-outline" />}
              onChangeText={value => {
                SetMaximumPersent(value);
              }}
              value={maximumPersent}
            /> */}

            <TouchableOpacity
              style={{
                marginTop: 30,
                backgroundColor: COLORS.blue_600,
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 12,
                width: '20%',
                padding: 7,
              }}
              onPress={() => setWarningModal(false)}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  function renderImageView() {
    return (
      <Modal animationType="fade" transparent={true} visible={imageView}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.white,
          }}>
          {/* <TouchableOpacity
            style={{
              flex:1,
              alignItems: 'flex-end',
              justifyContent: 'center',
              marginBottom: 5,
              backgroundColor:'red'
            }}
            onPress={() => setImageView(false)}>
            <Image
              source={icons.cross}
              resizeMode={'contain'}
              style={{height: 25, width: 25, tintColor: COLORS.black}}
            />
          </TouchableOpacity> */}
          <ImageZoom
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={Dimensions.get('window').width}
            imageHeight={Dimensions.get('window').height}
            // imageHeight={'50%'}
            onClick={() => {
              setImageView(false);
            }}
            // onDoubleClick={()=>{setImageView(false)}}
          >
            <Image
              resizeMode={streamImage ? 'cover' : 'contain'}
              // resizeMode="cover"
              style={{
                // width: square == true ? '98%' : '98%',
                // height: square == true ? '50%' : '50%',
                width: square == true ? SIZES.width * 0.99 : SIZES.width * 0.99,

                height:
                  square == true ? SIZES.height * 0.33 : SIZES.height * 0.33,

                marginTop: SIZES.height * 0.3,
                alignSelf: 'center',
                borderRadius: 5,
                // borderWidth: 1,
                // borderColor: COLORS.black,
              }}
              // source={{uri: streamImage}}
              source={streamImage ? {uri: streamImage} : images.image_not_found1}
              // source={{uri: streamImage?streamImage:images.image_not_found}}
            />
          </ImageZoom>
        </View>
      </Modal>
    );
  }

  function renderWaterTank() {
    return (
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              alignItems: 'center',
              paddingHorizontal: 2,
              paddingVertical: 5,
              borderRadius: 5,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: SIZES.body1 * 2.6,
              }}>
              <View
                style={{
                  flexDirection: 'row-reverse',
                  alignSelf: 'flex-end',
                  width: '5%',
                  elevation: 5,
                  height: `${parseInt(sumpLevel)}%`,
                  backgroundColor: COLORS.blue_300,
                  paddingHorizontal: 10,
                }}></View>
              <View
                style={{
                  alignSelf: 'flex-end',
                  height: `${21 + parseInt(sumpLevel)}%`,
                }}>
                <Text style={{fontSize: 12, right: 23, color: COLORS.gray}}>
                  {' '}
                  {sumpLevel ? parseInt(sumpLevel) : '0'}%
                </Text>
              </View>
            </View>
            <Text style={{fontSize: 14, color: COLORS.gray, marginRight: 15}}>
              Sump{'\n'}Level
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: 5,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                color: COLORS.rose_600,
                zIndex: 2,
                top: heightToDo((number = 1)),
                position: 'absolute',
              }}>
              {Math.floor(level)}%
            </Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1,
              }}>
              <Image
                source={icons.tank}
                style={{
                  zIndex: 2,
                  width: widthToDo((number = '12%')),
                  height: heightToDo((number = '7.5%')),
                }}
              />
              <View
                style={{
                  bottom: !NewLevel ? 0.5 : NewLevel,
                  position: 'absolute',
                }}>
                {level > 0 ? (
                  <Lottie
                    style={{
                      width: widthToDo((number = '11.5%')),
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
                  width: widthToDo((number = '11.5%')),
                  height: !NewLevel ? 0.5 : NewLevel,
                  bottom: heightToDo((number = '0.09%')),
                  position: 'absolute',
                  borderBottomRightRadius: heightToDo((number = '1.2%')),
                  borderBottomLeftRadius: heightToDo((number = '1.2%')),
                  zIndex: 0,
                }}></View>
            </View>
            <Text style={{fontSize: 15, color: COLORS.gray}}>
              Live Water Level{'\n'}
              (OverHead Tank)
            </Text>
          </View>

          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}>
            <View
              style={{
                // padding: 4,
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: isEnabled == false ? COLORS.red : COLORS.green,
                height: 45,
                paddingTop: 5,
                // // margin:5
              }}>
              <View
                style={{
                  padding: 5,
                  alignSelf: 'center',
                  borderRadius: 5,
                  backgroundColor:
                    isEnabled == true ? COLORS.green : COLORS.red,
                }}></View>
              {/* {isEnabled  ? (
                <Text
                  style={{
                    ...FONTS.body5,
                    color: isEnabled == false ? COLORS.white : COLORS.black,
                    backgroundColor:
                      isEnabled == false ? COLORS.red : COLORS.white,
                    elevation: 5,
                    paddingHorizontal: 2,
                    paddingVertical: 3,
                  }}>
                  OFF
                </Text>
              ) : (
                ''
              )} */}
              <Text
                style={{
                  ...FONTS.body5,
                  color: isEnabled == true ? COLORS.white : COLORS.white,
                  paddingHorizontal: isEnabled == true ? 4 : 2,
                  elevation: 5,
                  backgroundColor: isEnabled == true ? 'green' : COLORS.red,
                }}>
                {isEnabled ? 'ON' : 'OFF'}
              </Text>
            </View>
            <Text style={{fontSize: 14, color: COLORS.gray}}>
              Pump{'\n'}Status
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderWaterLiveView() {
    return (
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          backgroundColor: COLORS.white,
          borderRadius: 10,
          marginTop: 15,
          ...styles.shadow,
        }}>
        <TouchableOpacity
          onPress={() => {
            setImageView(true);
          }}>
          <Image
            source={streamImage ? {uri: streamImage} : images.image_not_found1}
            resizeMode={'stretch'}
            style={{

              height: square == true ? SIZES.height*0.25 : SIZES.height*0.25,
              width: square == true ? SIZES.width*0.9 : SIZES.width*0.52,           
              // height: square == true ? 200 : 200,
              // width: square == true ? 320 : 200,           

              alignSelf: 'center',
              borderRadius: square == true ? 10 : 100,
              // borderWidth: 1,
              // borderColor: COLORS.black,
            }}
          />
        </TouchableOpacity>
        {/* <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageWidth={500}
          imageHeight={500}
          onDoubleClick={()=>{setImageView(false)}}
          >
          <Image
            style={{
              width: square == true ? 300 : 200,
              height: square == true ? 200 : 200,
              alignSelf: 'center',
              borderRadius: square == true ? 10 : 100,
              borderWidth: 1,
              borderColor: COLORS.black,
            }}
            source={{uri: streamImage}}
          />
        </ImageZoom> */}

        <Text
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: COLORS.white,
            textAlign: square == true ? 'right' : 'center',
            right: square == true ? 30 : null,
            marginTop: square == true ? -25 : -40,
          }}>
          {time}
          {square == true ? ',' : '\n'} {date}
        </Text>
        <View
          style={{
            marginTop: 25,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // paddingLeft:SIZES.body1*3
          }}>
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              color: COLORS.darkGray,
            }}>
            Live Camera
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Image
              source={icons.camera}
              resizeMode={'center'}
              style={{height: 25, width: 25}}
            />
            {/* <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                left: 10,
                color: COLORS.darkGray,
              }}>
              View
            </Text> */}
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => setSquare(false)}
              style={{right: 25, backgroundColor: 'green', padding: 5}}>
              <Image
                source={icons.circle}
                style={{height: 12, width: 12, tintColor: 'white'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSquare(true)}
              style={{right: 15, backgroundColor: 'green', padding: 5}}>
              <Image
                source={icons.square}
                style={{height: 12, width: 12, tintColor: 'white'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => getStreamImage()
              // }
              style={{alignItems: 'flex-end'}}>
              <Image
                source={icons.refresh}
                style={{height: 28, width: 28, tintColor: COLORS.red}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function renderOthers() {
    return (
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          backgroundColor: COLORS.white,
          marginVertical: 15,
          borderRadius: 10,
          ...styles.shadow,
        }}>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            fontWeight: '500',
            color: COLORS.darkGray,
          }}>
          INFO
        </Text>
        <View style={{marginTop: 10}}>
          <Text style={{fontSize: 15, color: COLORS.darkGray}}>
            Usage{' - '}Under
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              marginVertical: 10,
              borderColor: COLORS.gray3,
            }}></View>
          <Text style={{fontSize: 15, color: COLORS.darkGray}}>
            PH Value{' - '}
            {/* {Math.round(phValue)} */}
            {phValue ? parseFloat(phValue).toFixed(2) : ''}
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              marginVertical: 10,
              borderColor: COLORS.gray3,
            }}></View>
          <Text style={{fontSize: 15, color: COLORS.darkGray}}>
            Quality{' - '} {phValue >= 6 && phValue < 9 ? 'Safe' : 'Unsafe'}
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              marginVertical: 10,
              borderColor: COLORS.gray3,
            }}></View>
          <Text style={{fontSize: 15, color: COLORS.darkGray}}>
            Leakage{' - '}No
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              marginVertical: 10,
              borderColor: COLORS.gray3,
            }}></View>
          <Text style={{fontSize: 15, color: COLORS.darkGray}}>
            Need Cleaning{' - '}No
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1, margin: 8}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#344953',
            }}>
            {switchValue ? 'Manual' : ''}
          </Text>

          <Switch
          style={{position:'absolute',marginHorizontal:160}}
            value={switchValue}
            onValueChange={switchValue => setSwitchValue(switchValue)}
          />
           <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#344953',
            }}>
            {switchValue ? '' : 'Automatic'}
          </Text>
        </View> */}
        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            marginBottom: 5,
            // padding: 5,

            // backgroundColor:'red',
            alignItems: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 17,
              color: COLORS.gray,
            }}>
            {productName
              ? productName.charAt(0).toUpperCase() + productName.slice(1)
              : ''}
          </Text>

          {/* <CustomSwitch
            selectionMode={0} 
            roundCorner={true}
            option1={'Manual'}
            option2={'Automatic'}
            onSelectSwitch={onSelectSwitch}
            selectionColor={COLORS.green}
            // selectionColor={'green'}
          /> */}

          {/* <DuoToggleSwitch
            primaryText="Manual"
            secondaryText="Automatic"
            onPrimaryPress={() => {
              setMode(0);
              dispatch(
                addMode({
                  mode: 0, 
                }),
              );
              setTimeout(() => {
                navigation.navigate('Remote Control');
              }, 700);

              // postRemoteControlData(0); 
            }}
            onSecondaryPress={() => {
              setMode(1);
              dispatch(
                addMode({
                  mode: 1,
                }),
              );
              // postRemoteControlData(1);
            }}
            primaryButtonStyle={{
              backgroundColor: mode == 0 ? 'green' : 'white',
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
            }}
            secondaryButtonStyle={{
              backgroundColor: mode == 1 ? 'green' : 'white',
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
            }}
            secondaryTextStyle={{color: mode == 1 ? 'white' : 'black'}}
            primaryTextStyle={{color: mode == 0 ? 'white' : 'black'}}
          /> */}
        </View>
        {renderWaterTank()}
        {renderWaterLiveView()}
        {renderOthers()}
        {renderWarningModal()}
        {renderImageView()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.65,
    elevation: 3,
  },
});
export default Home;
