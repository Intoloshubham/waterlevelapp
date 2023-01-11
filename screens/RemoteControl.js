import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Switch} from 'react-native';
import {FONTS, COLORS, SIZES} from '../constants';
// import DuoToggleSwitch from 'react-native-duo-toggle-switch';
import {postRemoteControl} from '../controllers/RemoteControlController';
import {getLEDStatus} from '../controllers/getImageController';
import {API_URL} from '@env';
import {useSelector,useDispatch} from 'react-redux';
import {addMode} from '../redux/modeSlice.js';
import PushNotification, {Importance} from 'react-native-push-notification';

PushNotification.configure({
  onRegister: function (token) {
    // console.log('TOKEN:', token);
  },

  // onNotification: function (notification) {
  //   console.log('NOTIFICATION:', notification);
  //   notification.finish(PushNotificationIOS.FetchResult.NoData);
  // },

  // onAction: function (notification) {
  //   console.log('ACTION:', notification.action);
  //   console.log('NOTIFICATION:', notification);
  // },

  // onRegistrationError: function (err) {
  //   console.error(err.message, err);
  // },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: true,
});

const RemoteControl = () => {
  const dispatch = useDispatch();
  const [mode, setMode] = React.useState('');
  // const modeValue = useSelector(state => state.mode);
  // console.log(
  //   '🚀 ~ file: RemoteControl.js:44 ~ RemoteControl ~ modeValue',
  //   modeValue,
  // );
  const [isEnabled, setIsEnabled] = useState(false);
  // let randomNum=Math.random().toString();

  // const toggleSwitch = (val) =>
  //   {
  //     // console.log(val)
  //     setChecked(val)
  //     sCK(!val)
  //   }

  // const onSelectSwitch = index => {
  //   if (index == 0) {
  //     setMode(0);
  //     dispatch(
  //       addMode({
  //         mode: 0,
  //       }),
  //     );
   
  //   } else {
  //     setMode(1);
  //     dispatch(
  //       addMode({
  //         mode: 1,
  //       }),
  //     );
  //   }
  // };



  const toggleSwitch = val => {
    // setIsEnabled(val);
    // console.log('val--',val);
    // console.log(modeValue.mode);
    // randomNum=Math.random().toString();
    if (val) {
      setIsEnabled(val);
      setMode(1);
      dispatch(
        addMode({
          mode: 1,
        }),
      );
      postRemoteControlData(1);
      // if (val) {
      //   // console.log('true');
      //   // testPush('Motor is switched ON!', 'Motor Status');
      //   // postRemoteControlData(1);
      // } else {
      //   // testPush('Motor is switched OFF!', 'Motor Status');
      //   // postRemoteControlData(0);
      // }
    } else {
      dispatch(
        addMode({
          mode: 0,
        }),
      );
      setMode(0);
      setIsEnabled(val);
      // testPush('Motor is switched ON!', 'Motor Status');
      postRemoteControlData(0);
    }
  };

  // useEffect(() => {
    // let randomNum = Math.random().toString();
    // PushNotification.createChannel(
    //   {
    //     channelId: '1',
    //     // channelId: randomNum,
    //     // channelId: Math.random().toString(),
    //     channelName: 'My channel',
    //     channelDescription: 'A channel to categorise your notifications',
    //     playSound: true,
    //     soundName: 'default',
    //     importance: Importance.HIGH,
    //     vibrate: true,
    //   },
    //   // (created) => console.log(`createChannel returned '${created}'`)
    // );

    // if (modeValue.mode == 1) {
    //   setIsEnabled(true);
    //   testPush('Motor is switched ON!', 'Motor Status');
    //   postRemoteControlData(1);
    // }

  // }, [modeValue.mode]);

  const testPush = (msg1, msg2) => {
    PushNotification.localNotification({
      channelId: '1',
      // channelId: randomNum,
      // channelId: Math.random().toString(),
      title: `${msg2}`,
      message: `${msg1}`,
    });
  };

  const postRemoteControlData = async status => {
    const formData = {led_status: status};
    const response = await postRemoteControl(formData);
    if (response.status === 200) {
      // alert(response.message);
      fetchLedStatus();
    }
  };

  const fetchLedStatus = async () => {
    const res = await getLEDStatus();
    if (res.status === 200) {
      // sCK(res.data.led_status);
      // setIsEnabled(res.data.led_status);
    }
  };

  React.useEffect(() => {
    fetchLedStatus();
  });

  function renderSourceRemote() {
    return (
      <View>
        <View
          style={{
            marginVertical: SIZES.base ,
            backgroundColor: COLORS.cyan_600,
            elevation: 5,
            borderRadius: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: SIZES.base,
              alignItems: 'center',           
               marginHorizontal: SIZES.base 
              // marginHorizontal: SIZES.base * 2,
        
            }}>
            <Text style={{...FONTS.h2,fontWeight:'600', color: COLORS.white}}>
              Sump Pump {'{ Source-I }'}
            </Text>
            <View
              style={{
                backgroundColor: COLORS.cyan_600,
                padding: 10,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: isEnabled == false ? COLORS.white : COLORS.black,
                  backgroundColor:
                  isEnabled == false ? COLORS.red : COLORS.white,
                  ...FONTS.body5,
                  elevation: 5,
                  paddingHorizontal: 5,
                  paddingVertical: 3
                }}>
                OFF
              </Text>
              <Text
                style={{
                  color: isEnabled == true ? COLORS.white : COLORS.black,
                  backgroundColor: isEnabled == true ? 'green' : COLORS.white,
                  ...FONTS.body5,
                  elevation: 5,
                  paddingHorizontal: 6,
                  paddingVertical: 3,
                }}>
                ON
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: COLORS.cyan_600,
            elevation: 2,
            borderRadius: 5,
            paddingHorizontal: SIZES.base,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: SIZES.base 
            }}>
            <Text
              style={{
                ...FONTS.h2,fontWeight:'600', color: COLORS.white
              }}>
              Bore Pump {'{ Source-II }'}
            </Text>
            <View
              style={{
                padding: 10,
                flexDirection: 'row',
              }}>
              <Text
                style={{               
                  color: isEnabled == false ? COLORS.white : COLORS.black,
                  
                  backgroundColor:
                    isEnabled == false ? COLORS.red : COLORS.white,
                    ...FONTS.body5,
                    elevation: 5,
                    paddingHorizontal: 5,
                    paddingVertical: 3
                }}>
                OFF
              </Text>
              <Text
                style={{

                  color: isEnabled == true ? COLORS.white : COLORS.black,
                  backgroundColor: isEnabled == true ? 'green' : COLORS.white,
                  ...FONTS.body5,
                  elevation: 5,               
                  paddingHorizontal: 6,
                  paddingVertical: 3
                }}>
                ON
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  function renderManuallyOnOffMotor() {
    return (
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 5,
          elevation: 5,
          backgroundColor: COLORS.cyan_600,
          
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'  , marginHorizontal: SIZES.base }}>
          <Text style={{...FONTS.h2,fontWeight:'600', color: COLORS.white}}>
            Manually Motor ON/OFF
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#767577'}}
            thumbColor={isEnabled ? COLORS.blue_300 : COLORS.red}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={mode == 0 ? isEnabled : true}
          />
          {/* <DuoToggleSwitch
            primaryText="OFF"
            secondaryText="ON"
            onPrimaryPress={() => {
              postRemoteControlData(0);
            }}
            onSecondaryPress={() => {
              postRemoteControlData(1);
            }}
            primaryButtonStyle={{backgroundColor: ck == 0 ? 'red' : 'white'}}
            secondaryButtonStyle={{
              backgroundColor: ck == 1 ? 'green' : 'white',
            }}
            secondaryTextStyle={{color: ck == 1 ? 'white' : 'black'}}
            primaryTextStyle={{color: ck == 0 ? 'white' : 'black'}}
          /> */}
        </View>
      </View>
    );
  }

  return (
    <View style={{marginBottom:10}}>
      {renderManuallyOnOffMotor()}
      {renderSourceRemote()}
    </View>
  );
};

export default RemoteControl;
