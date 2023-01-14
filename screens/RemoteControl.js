import React, {useState, useRef} from 'react';
import {View, Text, Switch} from 'react-native';
import {FONTS, COLORS, SIZES} from '../constants';
import {postRemoteControl} from '../controllers/RemoteControlController';
import {getLEDStatus} from '../controllers/getImageController';
import {useDispatch} from 'react-redux';
import {addMode} from '../redux/modeSlice.js';
import {
  getBoreStatus,
  getSumpStatus,
  postBoreStatus,
  postSumpStatus,
} from '../controllers/PumpController';
import {useSelector} from 'react-redux';

const RemoteControl = () => {
  const dispatch = useDispatch();
  const [mode, setMode] = React.useState(0);
  const [isEnabled, setIsEnabled] = useState(false);

  const user = useSelector(state => state.userCreds);
  const user_id = user.user_credentials._id;

  const toggleSwitch = val => {
    if (val) {
      setIsEnabled(val);
      setMode(1);
      dispatch(
        addMode({
          mode: 1,
        }),
      );
      postRemoteControlData(1);
    } else {
      dispatch(
        addMode({
          mode: 0,
        }),
      );
      setMode(0);
      setIsEnabled(val);
      postRemoteControlData(0);
    }
  };

  const postRemoteControlData = async status => {
    const formData = {led_status: status};
    const response = await postRemoteControl(formData);
    if (response.status === 200) {
      fetchLedStatus();
    }
  };

  const fetchLedStatus = async () => {
    const res = await getLEDStatus();
    if (res.status === 200) {
      setMode(res.data.led_status);
    }
  };

  //saurabh
  //sump pump
  const postSump = async status => {
    const formData = {
      sump_status: status,
    };
    const res = await postSumpStatus(formData, user_id);
    if (res.status == 200) {
      getSump();
    }
  };

  const getSump = async () => {
    const res = await getSumpStatus(user_id);
    if (res.data.sump_status === 1) {
      setSump(true);
    }
  };

  //bore pump
  const postBore = async status => {
    const formData = {
      bore_status: status,
    };
    const res = await postBoreStatus(formData, user_id);
    if (res.status == 200) {
      getBore();
    }
  };

  const getBore = async () => {
    const res = await getBoreStatus(user_id);
    if (res.data.bore_status === 1) {
      setBore(true);
    }
  };

  //
  const [sump, setSump] = React.useState(false);
  const [bore, setBore] = React.useState(false);
  //saurabh

  React.useEffect(() => {
    fetchLedStatus();
    getSump();
    getBore();
  }, []);

  function renderSourceRemote() {
    return (
      <View>
        <View
          style={{
            marginVertical: SIZES.base,
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
              marginHorizontal: SIZES.base,
            }}>
            <Text style={{...FONTS.h2, fontWeight: '600', color: COLORS.white}}>
              Sump Pump {'{ Source-I }'}
            </Text>
            <View
              style={{
                backgroundColor: COLORS.cyan_600,
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Switch
                trackColor={{false: COLORS.gray, true: COLORS.success_400}}
                thumbColor={sump ? COLORS.white : COLORS.white}
                ios_backgroundColor="#3e3e3e"
                onValueChange={value => {
                  setSump(value);
                  postSump(value);
                }}
                value={sump}
              />
              <Text style={{...FONTS.h5, color: COLORS.white, left: 1}}>
                {sump == true ? 'ON' : 'OFF'}
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
              marginHorizontal: SIZES.base,
            }}>
            <Text
              style={{
                ...FONTS.h2,
                fontWeight: '600',
                color: COLORS.white,
              }}>
              Bore Pump {'{ Source-II }'}
            </Text>
            <View
              style={{
                backgroundColor: COLORS.cyan_600,
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Switch
                trackColor={{false: COLORS.gray, true: COLORS.success_400}}
                thumbColor={bore ? COLORS.white : COLORS.white}
                ios_backgroundColor="#3e3e3e"
                onValueChange={value => {
                  setBore(value);
                  postBore(value);
                }}
                value={bore}
              />
              <Text style={{...FONTS.h5, color: COLORS.white, left: 1}}>
                {bore == true ? 'ON' : 'OFF'}
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: SIZES.base,
          }}>
          <Text style={{...FONTS.h2, fontWeight: '600', color: COLORS.white}}>
            Manually Motor ON/OFF
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#767577'}}
            thumbColor={isEnabled ? COLORS.blue_300 : COLORS.red}
            ios_backgroundColor="#3e3e3e"
            value={mode == 1 ? isEnabled : true}
            onValueChange={value => toggleSwitch(value)}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{marginBottom: 10}}>
      {renderManuallyOnOffMotor()}
      {mode == 1 && renderSourceRemote()}
    </View>
  );
};

export default RemoteControl;
