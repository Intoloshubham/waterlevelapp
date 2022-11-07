import React from 'react';
import {View, Text} from 'react-native';
import {FONTS, COLORS} from '../constants';
import DuoToggleSwitch from 'react-native-duo-toggle-switch';
import {postRemoteControl} from '../controllers/RemoteControlController';
import {getLEDStatus} from '../controllers/GetImageController';

const RemoteControl = () => {
  const [ck, sCK] = React.useState('');

  const postRemoteControlData = async status => {
    const formData = {led_status: status};
    const response = await postRemoteControl(formData);
    if (response.status === 200) {
      alert(response.message);
      fetchLedStatus();
    }
  };

  const fetchLedStatus = async () => {
    const res = await getLEDStatus();
    if (res.status === 200) {
      sCK(res.data.led_status);
    }
  };

  React.useEffect(() => {
    fetchLedStatus();
  });

  function renderManuallyOnOffMotor() {
    return (
      <View
        style={{
          marginTop: 20,
          backgroundColor: COLORS.darkGray,
          padding: 20,
          borderRadius: 10,
          elevation: 5,
        }}>
        <View>
          <Text style={{...FONTS.h2, color: COLORS.white}}>
            Manually Motor On/Off
          </Text>
          <DuoToggleSwitch
            style={{}}
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
          />
        </View>
      </View>
    );
  }

  return <View style={{margin: 20}}>{renderManuallyOnOffMotor()}</View>;
};

export default RemoteControl;
