import React, {useState} from 'react';
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
  updateMotorStatus,
} from '../controllers/PumpController';
import {useSelector} from 'react-redux';
import {getObjectData, getData} from '../utils/localStorage';

const RemoteControl = () => {
  let user_id;
  let unique_id;
  let us_cred;
  const dispatch = useDispatch();
  const [mode, setMode] = React.useState(0);
  const [isEnabled, setIsEnabled] = useState(false);

  const user = useSelector(state => state.userCreds);

  const credFunc = async () => {
    try {
      unique_id = await getData('primary_product');
      us_cred = await getObjectData('user_credentials');
      user_id = us_cred._id;

      if (Object.keys(user).length === 0) {
        // userId = us_cred._id;
        return us_cred._id;
        // return setUserId(us_cred._id);
      } else {
        // userId = creds.user_credentials._id;
        return user.user_credentials._id;
        // return setUserId(creds.user_credentials._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSwitch = val => {
    if (val) {
      setIsEnabled(val);
      setMode(1);
      dispatch(
        addMode({
          mode: 1,
        }),
      );
      // postRemoteControlData(1);
    } else {
      dispatch(
        addMode({
          mode: 0,
        }),
      );
      setMode(0);
      setIsEnabled(val);
      // postRemoteControlData(0);
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
    await credFunc();
    const formData = {
      sump_status: status,
    };
    const res = await updateMotorStatus(formData, unique_id);
    if (res.status == 200) {
      getSump();
    }
  };

  const getSump = async () => {
    await credFunc();
    const res = await getSumpStatus(unique_id);
    if (res.status === 200) {
      setSump(res.data.sump_status);
      if (res.data.sump_status) {
        setIsEnabled(true);
      }
    }
  };

  //bore pump
  const postBore = async status => {
    await credFunc();
    const formData = {
      bore_status: status,
    };
    const res = await updateMotorStatus(formData, unique_id);
    if (res.status == 200) {
      getBore();
    }
  };

  const getBore = async () => {
    await credFunc();
    const res = await getBoreStatus(unique_id);
    if (res.status === 200) {
      setBore(res.data.bore_status);
      if (res.data.bore_status) {
        setIsEnabled(true);
      }
    }
  };

  //
  const [sump, setSump] = React.useState(false);
  const [bore, setBore] = React.useState(false);
  //saurabh

  React.useEffect(() => {
    credFunc();
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
            value={isEnabled}
            onValueChange={value => {
              toggleSwitch(value);
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{marginBottom: 10}}>
      {renderManuallyOnOffMotor()}
      {isEnabled == true && renderSourceRemote()}
    </View>
  );
};

export default RemoteControl;
