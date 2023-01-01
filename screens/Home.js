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
  Dimensions 
} from 'react-native';
import Lottie from 'lottie-react-native';
import DuoToggleSwitch from 'react-native-duo-toggle-switch';
import {widthToDo, heightToDo} from './setImagePixels';
import {FONTS, COLORS, icons, SIZES} from '../constants';
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
import {addMode} from '../redux/modeSlice';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Home = () => {
  const dispatch = useDispatch();
  const registeredId = useSelector(state => state.product);
  const [mode, setMode] = React.useState('');
  const [streamImage, setStreamImage] = React.useState();
  const [date, setDate] = React.useState();
  const [time, setTime] = React.useState();
  const [level, setLevel] = React.useState('');
  const [phValue, setPhValue] = React.useState('');
  const [square, setSquare] = React.useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [sumpStatus, setSumpStatus] = useState(0);
  const [switchValue, setSwitchValue] = useState(false);

  let prevalue = 0;
  // const [waterLevelStatus, setWaterLevelStatus] = useState(true);
  let overflowLevelStatus = true;
  let underFlowLevelStatus = true;
  // let resetStatus = true;
  const [resetStatus, setResetStatus] = useState(true);
  var NewLevel = parseInt(level);
  const [waterLevelData, setWaterLevelData] = React.useState('');

  //toggle
  const [isEnabled, setIsEnabled] = React.useState('');

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [timeInterval, setTimeInterval] = useState(0);

  const getStreamImage = async () => {
    if (registeredId.hasOwnProperty('product_id')) {
      try {
        if (registeredId.product_id) {
          const res = await getImage(registeredId.product_id);
          setStreamImage(res.image);
          setDate(res.date);
          setTime(res.time);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchLedStatus = async () => {
    if (registeredId.hasOwnProperty('product_id')) {
      try {
        if (registeredId.product_id) {
          const res = await getLEDStatus(registeredId.product_id);
          if (res.data != null) {
            setIsEnabled(res.data.led_status == 1 ? true : false);
            if (waterLevelData.motor_notification == true) {
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchSumpStatus = async () => {
    if (registeredId.hasOwnProperty('product_id')) {
      try {
        if (registeredId.product_id) {
          const res = await getSUMPStatus(registeredId.product_id);
          if (res.data != null) {
            setSumpStatus(res.data.sump_status);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getPrevWaterLevel = async () => {
    try {
      if (registeredId.hasOwnProperty('product_id')) {
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
    if (registeredId.hasOwnProperty('product_id')) {
      try {
        if (registeredId.product_id) {
          const res = await getWaterLevel(registeredId.product_id);
          if (res.data != null) {
            if (
              res.data.led_status == 1 &&
              prevalue == res.data.water_level &&
              resetStatus == true
            ) {
              // resetStatus = false;
              setResetStatus(false);
              setWarningModal(true);
            }

            setLevel(res.data.water_level);
            setPhValue(res.data.ph_level);

            if (parseFloat(res.data.water_level) >= 90) {
              if (overflowLevelStatus) {
                setWarningModal(true);
                overflowLevelStatus = false;
                const formData = {led_status: 0};
                const response = await postRemoteControl(
                  formData,
                  registeredId.product_id,
                );
              }
            }

            if (parseFloat(res.data.water_level) <= 20) {
              if (underFlowLevelStatus) {
                underFlowLevelStatus = false;
                const formData = {led_status: 1};
                const response = await postRemoteControl(
                  formData,
                  registeredId.product_id,
                );
              }
            }
          }
          // console.log("🚀 ~ file: Home.js:123 ~ WaterLevel ~ res", res)
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getStreamImage();
    WaterLevel();
    fetchLedStatus();
    fetchSumpStatus();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  let timer1 = setTimeout(() => {
    setTimeInterval(timeInterval + 1);
  }, 4000);

  React.useEffect(() => {
    console.log('object--', timeInterval);
    getStreamImage();
    // WaterLevel();
    fetchSumpStatus();
    // const interval = setInterval(() => {
    WaterLevel();
    // getPrevWaterLevel();
    fetchLedStatus();
    // }, 4000);

    // return () => clearInterval(interval);
    return () => {
      clearTimeout(timer1);
    };
  }, [timeInterval]);

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

  function renderWaterTank() {
    return (
      <View>
        <View
          style={{
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
          <Text
            style={{fontSize: 15, color: COLORS.darkGray, marginVertical: 5}}>
            Live Water Level{'\n'}
            (OverHead Tank)
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              // flexDirection: 'row',
              // justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: COLORS.white,
              paddingHorizontal: 8,
              paddingVertical: 5,
              elevation: 2,
              borderRadius: 5,
            }}>
            <View
              style={{
                // flexDirection: 'row',
                flex: 1,
                backgroundColor: COLORS.white,
                // left: 5,
                // padding: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: COLORS.blue_300,
                  padding: 15,
                }}></View>
              {/* <Text
                style={{
                  fontSize: 14,
                  color: sumpStatus == 0 ? COLORS.white : COLORS.black,
                  backgroundColor: sumpStatus == 0 ? COLORS.red : COLORS.white,
                  // paddingHorizontal: 5,
                  paddingHorizontal: 5,
                  paddingVertical: 3,
                  borderWidth: 0.5,
                }}>
                OFF
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: sumpStatus == 1 ? COLORS.white : COLORS.black,
                  paddingHorizontal: 5,
                  paddingVertical: 3,
                  backgroundColor: sumpStatus == 1 ? 'green' : COLORS.white,
                  borderWidth: 0.5,
                }}>
                ON
              </Text> */}
            </View>
            <Text style={{fontSize: 15, color: COLORS.darkGray}}>
              Sump Level
            </Text>
          </View>
          <View
            style={{
              // flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.white,
              paddingHorizontal: 10,

              paddingVertical: 5,
              elevation: 2,
              borderRadius: 5,
            }}>
            <View
              style={{
                // flexDirection: 'row',
                backgroundColor: COLORS.white,
                // left: 5,
                padding: 15,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: isEnabled == false ? COLORS.white : COLORS.black,
                  backgroundColor:
                    isEnabled == false ? COLORS.red : COLORS.white,
                  // paddingHorizontal: 5,
                  paddingHorizontal: 5,
                  paddingVertical: 3,
                  borderWidth: 0.5,
                }}>
                OFF
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: isEnabled == true ? COLORS.white : COLORS.black,
                  paddingHorizontal: 5,
                  paddingVertical: 3,
                  backgroundColor: isEnabled == true ? 'green' : COLORS.white,
                  borderWidth: 0.5,
                }}>
                ON
              </Text>
            </View>
            <Text style={{fontSize: 15, color: COLORS.darkGray}}>
              Pump Status
            </Text>
          </View>
        </View>
        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
            Pump Status{' '}
          </Text>
          <Switch
            trackColor={{false: COLORS.darkGray, true: COLORS.green}}
            thumbColor={isEnabled ? COLORS.white : COLORS.white}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            disabled={true}
          />
          {isEnabled === true ? (
            <Text
              style={{...FONTS.h4, color: COLORS.darkGray, fontWeight: 'bold'}}>
              ON
            </Text>
          ) : (
            <Text
              style={{...FONTS.h4, color: COLORS.darkGray, fontWeight: 'bold'}}>
              OFF
            </Text>
          )}
        </View> */}
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
        {/* <Image
          source={{uri: streamImage}}
          style={{
            height: square == true ? 200 : 200,
            width: square == true ? 300 : 200,
            alignSelf: 'center',
            borderRadius: square == true ? 10 : 100,
            borderWidth: 1,
            borderColor: COLORS.black,
          }}
        /> */}
        <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageWidth={200}
          imageHeight={200}>
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
        </ImageZoom>

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
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                color: COLORS.darkGray,
              }}>
              Live Camera
            </Text>
            <Image
              source={icons.camera}
              style={{height: 25, width: 25, left: 5}}
            />
            <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                left: 10,
                color: COLORS.darkGray,
              }}>
              View
            </Text>
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
        <Text style={{fontSize: 18, fontWeight: '500', color: COLORS.darkGray}}>
          Water & Tank Climate
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
            {phValue}
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
    <View style={{flex: 1, margin: 10}}>
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
            alignItems: 'center',
          }}>
          {/* <Text style={{fontSize: 18,textAlign:'center', fontWeight: '500', color: COLORS.gray}}>
            Mode 
          </Text> */}
          <DuoToggleSwitch
            primaryText="Manual"
            secondaryText="Automatic"
            onPrimaryPress={() => {
              setMode(0);
              dispatch(
                addMode({
                  mode: 0,
                }),
              );
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
            }}
            secondaryButtonStyle={{
              backgroundColor: mode == 1 ? 'green' : 'white',
            }}
            secondaryTextStyle={{color: mode == 1 ? 'white' : 'black'}}
            primaryTextStyle={{color: mode == 0 ? 'white' : 'black'}}
          />
        </View>
        {renderWaterTank()}
        {renderWaterLiveView()}
        {renderOthers()}
        {renderWarningModal()}
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
