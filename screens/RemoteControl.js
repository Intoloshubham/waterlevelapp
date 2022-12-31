import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Switch} from 'react-native';
import {FONTS, COLORS} from '../constants';
// import DuoToggleSwitch from 'react-native-duo-toggle-switch';
import {postRemoteControl} from '../controllers/RemoteControlController';
import {getLEDStatus} from '../controllers/getImageController';
import {API_URL} from '@env';
import {useSelector} from 'react-redux';
import PushNotification, {Importance}  from "react-native-push-notification";

PushNotification.configure({

  onRegister: function (token) {
    console.log('TOKEN:', token);
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
  requestPermissions: true

});

const RemoteControl = () => {
  const modeValue = useSelector(state => state.mode);
  console.log("🚀 ~ file: RemoteControl.js:44 ~ RemoteControl ~ modeValue", modeValue)
  const [isEnabled, setIsEnabled] = useState(false);
  // let randomNum=Math.random().toString();

  // const toggleSwitch = (val) =>
  //   {
  //     // console.log(val)
  //     setChecked(val)
  //     sCK(!val)
  //   }
  const toggleSwitch = val => {
    // setIsEnabled(val);
    console.log(modeValue.mode)
    // randomNum=Math.random().toString();
    if (modeValue.mode == 0) {
      setIsEnabled(val);
      if (val) {
        console.log('true')
        testPush('Motor is switched ON!','Motor Status');
        postRemoteControlData(1);     
      } else {
        testPush('Motor is switched OFF!','Motor Status');
        postRemoteControlData(0);       
      }
    } else {
      // setIsEnabled(val);
      testPush('Motor is switched ON!','Motor Status');
      postRemoteControlData(1);
    }
  };

  useEffect(() => { 
    let randomNum=Math.random().toString();
    PushNotification.createChannel(
      {
        channelId: '1',
        // channelId: randomNum,
        // channelId: Math.random().toString(),
        channelName: "My channel",
        channelDescription: "A channel to categorise your notifications", 
        playSound: true,
        soundName: "default",
        importance: Importance.HIGH,
        vibrate: true,
      },
      // (created) => console.log(`createChannel returned '${created}'`) 
    );
   
    if (modeValue.mode == 1) {
      setIsEnabled(true);
      testPush('Motor is switched ON!','Motor Status');
      postRemoteControlData(1);      
    }
    // else{
    //   if (isEnabled) {

    //   } else {
    //     testPush('Motor is switched OFF!','Motor Status');
    //     postRemoteControlData(0);       
    //   }
    
    // }

  }, [modeValue.mode]);

 const testPush = (msg1,msg2)=>{ 
     PushNotification.localNotification({      
      channelId: '1', 
      // channelId: randomNum, 
      // channelId: Math.random().toString(), 
      title: `${msg2}`, 
      message: `${msg1}`
    });
  }

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

  function renderManuallyOnOffMotor() {
    return (
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 10,
          elevation: 5,
          backgroundColor: COLORS.darkGray
        }}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize: 18, fontWeight: '500', color: COLORS.white}}>
            Manually Motor On/Off
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#767577'}}
            thumbColor={ isEnabled ? COLORS.blue_300 : COLORS.red}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={modeValue.mode == 0 ? isEnabled : true}
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

  return <View style={{margin: 10}}>{renderManuallyOnOffMotor()}</View>;
};

export default RemoteControl;
