import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  RefreshControl,
  Image,
  Switch,
  ImageBackground,
  Pressable,
  BackHandler,
} from 'react-native';
import {FONTS, COLORS, icons, SIZES, images} from '../constants';
import CheckBox from '@react-native-community/checkbox';
import {
  getWaterLevelSettings,
  postWaterLevelSettings,
  postTankHeightSettings,
  postWaterSourceSettings,
  postMotorNotification,
  UserlogOut,
} from '../controllers/SettingsController';
import {getWaterLevel} from '../controllers/getImageController.js';
import DropDownPicker from 'react-native-dropdown-picker';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useSelector} from 'react-redux';
import {CustomToast} from '../componets';
import {Login} from './userCredentials';
import RemoteControl from './RemoteControl.js';
import {
  clearStorage,
  getData,
  getObjectData,
  removeData,
  storeObjectData,
} from '../utils/localStorage.js';
import Notification from './Notification';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Settings = ({navigation}) => {
  // const Auth = React.createContext(null);
  // const navigation = useNavigation();
  // const { setToken } = React.useContext(Auth)
  let lg_tkn;
  let us_cred;

  const credFunc = async () => {
    try {
      lg_tkn = await getData('login_token');
      us_cred = await getObjectData('user_credentials');
      return {lg_tkn, us_cred};
    } catch (error) {
      console.log(error);
    }
  };

  const registeredId = useSelector(state => state.product);
  const creds = useSelector(state => state.userCreds);

  //Modal
  const [persentModal, setPersentModal] = useState(false);
  const [tankHeightModal, setTankHeightModal] = useState(false);
  const [minimumPersent, SetMinimumPersent] = useState('');
  const [maximumPersent, SetMaximumPersent] = useState('');

  //toast
  const [submitToast, setSubmitToast] = React.useState(false);
  const [mssg, setMssg] = useState('');
  const [statusCode, setStatusCode] = useState('');

  const [waterLevelData, setWaterLevelData] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [tankHeight, setTankHeight] = React.useState('');

  const [autoHeight, setAutoHeight] = useState(0);

  const [unit, setUnit] = useState('');

  // oprational
  const [isSourceOne, setIsSourceOne] = React.useState(false);
  const [isSourceTwo, setIsSourceTwo] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    fetchWaterLevelHeightSettings();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  //toggle
  const [isEnabledNotification, setIsEnabledNotification] = useState(false);

  //toggle
  const [isEnabledManually, setIsEnabledManually] = useState(false);
  const toggleSwitchManually = () => {
    setIsEnabledManually(previousState => !previousState);
  };
  //leakage
  const [leakageToggle, setLeakageToggle] = useState(false);

  const [waterLevel, setWaterLevel] = useState(0);
  const [timeInt, setTimeInt] = useState(0);
  //original tank height
  const [tempTankHeight, setTempTankHeight] = useState(100);

  //toggle water source
  const [isEnabledSource1, setIsEnabledSource1] = useState(false);
  const [isEnabledSource2, setIsEnabledSource2] = useState(false);

  const toggleSwitchSource1 = () => {
    setIsEnabledSource1(previousState => !previousState);
    setIsEnabledSource2(false);
  };

  //toggle
  const toggleSwitchSource2 = () => {
    setIsEnabledSource2(previousState => !previousState);
    setIsEnabledSource1(false);
  };

  //dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [items, setItems] = useState([
    {label: 'CM', value: '1'},
    {label: 'Meter', value: '2'},
  ]);

  const __getWaterLevel = async () => {
    if (registeredId.hasOwnProperty('product_id')) {
      if (registeredId.product_id) {
        const res = await getWaterLevel(registeredId.product_id);
        if (res.data != null) {
          return setWaterLevel(res.data.water_level);
        }
      }
    }
  };

  const postWaterLevelHeightSettings = async () => {
    if (registeredId.hasOwnProperty('product_id')) {
      const formData = {
        start_level: minimumPersent,
        stop_level: maximumPersent,
      };
      const response = await postWaterLevelSettings(
        formData,
        registeredId.product_id,
      );
      if (response.status == 200) {
        alert(response.message);
        setPersentModal(false);
        fetchWaterLevelHeightSettings();
      } else {
        alert(response.message);
      }
    }
  };

  const fetchWaterLevelHeightSettings = async () => {
    if (registeredId.hasOwnProperty('product_id')) {
      const response = await getWaterLevelSettings(registeredId.product_id);    

      if (response.status === 200 && response.data != null) {
        setWaterLevelData(response.data);
        setIsEnabledSource1(response.data.water_source_1);
        setIsEnabledSource2(response.data.water_source_2);
        setIsEnabledNotification(response.data.motor_notification);
        setTempTankHeight(response.data.tank_height)
       return response.data.tank_height;
      }
    }
  };

  const postWaterTankHeightSettings = async () => {
    if (registeredId.hasOwnProperty('product_id')) {
      const formData = {
        tank_height_type: isEnabledManually,
        tank_height: isEnabledManually === false ? 0 : tankHeight,
        tank_height_unit: isEnabledManually === false ? 0 : value,
      };

      const response = await postTankHeightSettings(
        formData,
        registeredId.product_id,
      );

      if (response.status === 200) {
        
        setValue('');
        setTankHeight('');
        const temp=await fetchWaterLevelHeightSettings();
        setIsEnabledManually(false);
        __getWaterLevel();
        let Oh = temp * (1 - waterLevel/100);                         
        setAutoHeight(Oh);
      }
    }
  };

  const postWaterSourceSetting = async () => {
    if (registeredId.hasOwnProperty('product_id')) {
      const formData = {
        water_source_1: isEnabledSource1,
        water_source_2: isEnabledSource2,
      };
      const response = await postWaterSourceSettings(
        formData,
        registeredId.product_id,
      );
    }
  };

  {
    isEnabledSource1 == true || isEnabledSource2 == true
      ? postWaterSourceSetting()
      : null;
  }

  const postMotorNotificationSetting = async value => {
    if (registeredId.hasOwnProperty('product_id')) {
      const formData = {
        motor_notification: value,
      };
      const response = await postMotorNotification(
        formData,
        registeredId.product_id,
      );
    }
  };

  const logout = async () => {
    try {
      await credFunc();

      const body = {
        refresh_token:
          Object.keys(creds).length === 0 ? lg_tkn : creds.refresh_token,
      };
      const temp = await UserlogOut(body);

      if (temp.status == 200) {
        setStatusCode(temp.status);
        setMssg(temp.data);
        setSubmitToast(true);

        setTimeout(() => {
          setSubmitToast(false);
        }, 600);

        removeData('login_token');
        removeData('user_credential_body');

        storeObjectData('login_token_status', false);
        setTimeout(() => {
          navigation.navigate('Login');
        }, 400);
      }
    } catch (error) {
      console.log(error);
    }
  };

  setTimeout(() => {
    setTimeInt(timeInt + 1);
  }, 4000);

  React.useMemo(() => {
    __getWaterLevel();
    credFunc();
    fetchWaterLevelHeightSettings();
  }, [timeInt]);

  function renderSwitchOnOffSettings() {
    return (
      <View
        style={{
          backgroundColor: COLORS.cyan_600,
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 10,
          elevation: 3,
        }}>
        <View>
          <Text style={{...FONTS.h2, fontWeight: '600', color: COLORS.white}}>
            Set ON/OFF Tank
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <View>
              <Text style={{fontSize: 15, color: COLORS.white}}>
                OHT ON{' - '}
                {waterLevelData.start_level == ''
                  ? '0'
                  : waterLevelData.start_level}
                %
              </Text>
              <Text style={{fontSize: 15, color: COLORS.white}}>
                OHT OFF{' - '}
                {waterLevelData.stop_level == ''
                  ? '0'
                  : waterLevelData.stop_level}
                %
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.white,
                paddingHorizontal: 15,
                paddingVertical: 5,
              }}
              onPress={() => setPersentModal(true)}>
              <Text
                style={{
                  fontSize: 15,
                  color: COLORS.blue_900,
                  fontWeight: 'bold',
                }}>
                Set
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function renderPersentModal() {
    return (
      <Modal animationType="fade" transparent={true} visible={persentModal}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.transparentBlack7,
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
            }}
            onPress={() => setPersentModal(false)}>
            <Image
              source={icons.cross}
              style={{height: 35, width: 35, tintColor: COLORS.amber_300}}
            />
          </TouchableOpacity>
          <View
            style={{
              width: '93%',
              padding: 30,
              borderRadius: 10,
              backgroundColor: COLORS.white,
            }}>
            <TextInput
              mode="outlined"
              label="Minimum %"
              left={<TextInput.Icon icon="file-percent-outline" />}
              onChangeText={value => {
                SetMinimumPersent(value);
              }}
              value={minimumPersent}
            />
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: '600',
                marginTop: 5,
                color: COLORS.darkGray,
                textAlign: 'center',
              }}>
              Note:- Not advisable to set less than 20 %
            </Text>
            <TextInput
              style={{marginTop: 10}}
              mode="outlined"
              label="Maximum %"
              left={<TextInput.Icon icon="file-percent-outline" />}
              onChangeText={value => {
                SetMaximumPersent(value);
              }}
              value={maximumPersent}
            />
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: '600',
                marginTop: 5,
                color: COLORS.darkGray,
                textAlign: 'center',
              }}>
              Note:- Not advisable to set more than 80 %
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 30,
                borderRadius: SIZES.base * 0.5,

                backgroundColor: COLORS.cyan_600,
                alignItems: 'center',
                padding: 10,
              }}
              onPress={() => postWaterLevelHeightSettings()}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  function renderTankHeight() {
    return (
      <View
        style={{
          backgroundColor: COLORS.cyan_600,
          // paddingHorizontal: 15,
          paddingVertical: 10,
          marginTop: 10,
          marginBottom: 10,
          borderRadius: 10,
          elevation: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: SIZES.base * 2,
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{...FONTS.h2, fontWeight: '600', color: COLORS.white}}>
              Overhead Water Tank Height
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              paddingHorizontal: 15,

              paddingVertical: 5,
            }}
            onPress={() => setTankHeightModal(true)}>
            <Text
              style={{
                fontSize: 15,
                color: COLORS.blue_900,
                fontWeight: 'bold',
              }}>
              Set
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderTankHeightModal() {
    return (
      <Modal animationType="fade" transparent={true} visible={tankHeightModal}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.transparentBlack7,
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
            }}
            onPress={() => setTankHeightModal(false)}>
            <Image
              source={icons.cross}
              style={{height: 35, width: 35, tintColor: COLORS.amber_300}}
            />
          </TouchableOpacity>
          <View
            style={{
              height: '50%',
              width: '90%',
              padding: 30,
              borderRadius: 10,
              backgroundColor: COLORS.white,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                alignItems: 'flex-start',
              }}>
              <Pressable
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={() => {
                  setIsEnabledManually(true);
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: isEnabledManually
                      ? COLORS.blue
                      : COLORS.gray,
                    padding: 8,
                    borderRadius: 2,
                    width: '3%',
                    height: '3%',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setIsEnabledManually(true);
                  }}></TouchableOpacity>
                <View style={{width: '90%'}}>
                  <Text
                    style={{
                      ...FONTS.body3,
                      color: COLORS.darkGray,
                      textAlign: 'left',
                    }}>
                    Feed data Manually
                  </Text>
                </View>
              </Pressable>
              <Pressable
                style={{
                  flexDirection: 'row',
                  marginTop: SIZES.base * 2,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={() => {
                  setIsEnabledManually(false);
                  __getWaterLevel();

                  let tcs = tempTankHeight * (1 - waterLevel/100);
                  setAutoHeight(tcs);
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: isEnabledManually
                      ? COLORS.gray
                      : COLORS.blue,
                    padding: 8,
                    borderRadius: 2,
                    width: '3%',
                    height: '3%',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setIsEnabledManually(false);
                    __getWaterLevel();
                    fetchWaterLevelHeightSettings();      
                    let tc = tempTankHeight * (1 - waterLevel/100);                 
                    setAutoHeight(tc);
                  }}></TouchableOpacity>
                <View style={{width: '90%'}}>
                  <Text
                    style={{
                      ...FONTS.body3,
                      color: COLORS.darkGray,
                      textAlign: 'left',
                    }}>
                    Automatic with empty tank Condition
                  </Text>
                </View>
              </Pressable>
            </View>
            <View style={{flex: 1, marginTop: SIZES.base * 3}}>
              {isEnabledManually ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    marginTop: 10,
                    marginBottom: 20,
                  }}>
                  <TextInput
                    style={{
                      width: '60%',
                      height: 35,
                    }}
                    mode="outlined"
                    label="Tank height"
                    onChangeText={value => {
                      unit == 'CM'
                        ? setTankHeight(value)
                        : setTankHeight(value * 100);
                    }}
                  />
                  <View style={{width: '30%', marginTop: 5}}>
                    <DropDownPicker
                      style={{
                        borderWidth: null,
                        borderRadius: null,
                        backgroundColor: COLORS.lightGray1,
                        minHeight: 35,
                      }}
                      dropDownContainerStyle={{
                        borderWidth: null,
                        borderRadius: null,
                        backgroundColor: COLORS.lightGray2,
                      }}
                      placeholder="Unit"
                      open={open}
                      value={value}
                      items={items}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setItems}
                      zIndex={1000}
                      listMode="SCROLLVIEW"
                      onSelectItem={value => {
                        setUnit(value.label);
                      }}
                    />
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                      marginTop: SIZES.base * 2,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          ...FONTS.body3,
                          color: COLORS.darkGray,
                          textAlign: 'center',
                        }}>
                        Please make sure that tank is empty {'\n'} if empty
                      </Text>
                    </View>
                    <View
                      style={{
                        borderWidth: 0.2,
                        alignSelf: 'center',
                        elevation: 2,
                        borderColor: COLORS.white,
                        padding: SIZES.base * 0.5,
                      }}>
                      <Text
                        style={{
                          ...FONTS.body3,
                          color: COLORS.darkGray,
                          textAlign: 'center',
                        }}>
                        Height Calculated{'\n'} {parseFloat(autoHeight).toFixed(2)} cm                     
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={{
                          ...FONTS.body3,
                          color: COLORS.darkGray,
                          textAlign: 'center',
                        }}>
                        Press reset button for 2 seconds
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      width: '100%',
                    }}>
                    <TouchableOpacity
                      style={{
                        alignSelf: 'center',
                        borderWidth: 1,
                        borderColor: COLORS.transparent,
                        elevation: 5,
                        marginTop: SIZES.body1 * 0.5,
                        padding: SIZES.base * 0.5,
                        paddingHorizontal: SIZES.body1,
                        borderRadius: SIZES.base * 0.5,
                        backgroundColor: COLORS.cyan_600,
                      }}
                      delayLongPress={'2000'}
                      onLongPress={() => alert('df')}>
                      <Text
                        style={{
                          ...FONTS.body3,
                          color: COLORS.white,
                          textAlign: 'center',
                        }}>
                        Reset
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        alignSelf: 'center',
                        borderWidth: 1,
                        borderColor: COLORS.transparent,
                        elevation: 5,
                        marginTop: SIZES.body1 * 0.5,
                        padding: SIZES.base * 0.5,
                        paddingHorizontal: SIZES.body1,
                        borderRadius: SIZES.base * 0.5,
                        backgroundColor: COLORS.cyan_600,
                      }}
                      onPress={() => postWaterTankHeightSettings()}>
                      <Text style={{...FONTS.h3, color: COLORS.white}}>
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* <TextInput
                    style={{
                      width: '40%',
                      height: 25,
                      // position: 'absolute',
                      top: SIZES.body1 * 1.7,
                      alignSelf:'center'
                    }}
                    value={autoHeight.toString()}
                    editable={false}
                    mode="outlined" 
                    label="Tank height"
                    // onChangeText={value => {
                    //   setTankHeight(value);
                    // }}
                  /> */}
                </View>
              )}
            </View>
           {isEnabledManually? <TouchableOpacity
              style={{
                marginTop: 10,
                // backgroundColor: COLORS.blue_600,
                backgroundColor: COLORS.cyan_600,
                borderRadius: SIZES.body4 * 0.5,
                alignItems: 'center',
                padding: 5,
              }}
              onPress={() => postWaterTankHeightSettings()}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>Submit</Text>
            </TouchableOpacity>:null}
          </View>
        </View>
      </Modal>
    );
  }

  function renderWaterSource() {
    return (
      <View
        style={{
          backgroundColor: COLORS.cyan_600,
          paddingHorizontal: 15,
          paddingVertical: 10,
          marginTop: 10,
          borderRadius: 10,
          elevation: 5,
        }}>
        <View>
          <Text style={{...FONTS.h2, fontWeight: '600', color: COLORS.white}}>
            Water Source Preference
          </Text>

          <View style={{marginTop: 5}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Switch
                style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
                trackColor={{false: COLORS.gray, true: COLORS.success_400}}
                thumbColor={isEnabledSource1 ? COLORS.white : COLORS.white}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchSource1}
                value={isEnabledSource1}
              />
              <Text style={{...FONTS.body3, color: COLORS.white, left: 10}}>
                Source-1 (Bore Pump)
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Switch
                style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
                trackColor={{false: COLORS.gray, true: COLORS.success_400}}
                thumbColor={isEnabledSource2 ? COLORS.white : COLORS.white}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchSource2}
                value={isEnabledSource2}
              />
              <Text style={{...FONTS.body3, color: COLORS.white, left: 10}}>
                Source-2 (Sump Pump)
              </Text>
            </View>
            <Text style={{...FONTS.body3, color: COLORS.white}}>
              <Text style={{...FONTS.body3, fontWeight: '600'}}>Note: </Text>
              Water will be taken first from this source if this source is not
              available then second source will be started automatically.
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderOtherSettings() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.cyan_600,
          paddingHorizontal: 15,
          paddingVertical: 20,
          marginTop: 10,
          borderRadius: 10,
          elevation: 5,
        }}>
        <Text style={{...FONTS.h2, fontWeight: '600', color: COLORS.white}}>
          Notification Turn On / Off
        </Text>

        {/* <View
          style={{
            flex: 1,
            marginTop: SIZES.base,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                padding: 6,
                margin: 5,
                borderWidth: 1,
                borderColor: COLORS.white2,
              }}></View>
            <Text style={{...FONTS.body3, color: COLORS.white}}>Uses</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                padding: 6,
                margin: 5,
                borderWidth: 1,
                borderColor: COLORS.white2,
              }}></View>
            <Text style={{...FONTS.body3, color: COLORS.white}}>Leakage</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                padding: 6,
                margin: 5,
                borderWidth: 1,
                borderColor: COLORS.white2,
              }}></View>
            <Text style={{...FONTS.body3, color: COLORS.white}}>Quality</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                padding: 6,
                margin: 5,
                borderWidth: 1,
                borderColor: COLORS.white2,
              }}></View>
            <Text style={{...FONTS.body3, color: COLORS.white}}>
              Need Cleaning
            </Text>
          </TouchableOpacity>
        </View> */}
        {/* <View style={{flexDirection: 'row', marginTop: 15}}>
          <View style={{flex: 1}}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.white,
              }}>
              Quality
            </Text>
            <View style={{marginVertical: 10}}></View>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.white,
              }}>
              Brightness
            </Text>
            <View style={{marginVertical: 10}}></View>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.white,
              }}>
              Contrast
            </Text>
            <View style={{marginVertical: 10}}></View>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.white,
              }}>
              Saturation
            </Text>
          </View>
          <View style={{flex: 1.5}}>
            <Slider
              style={{width: 150}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="white"
              maximumTrackTintColor={COLORS.lightGray1}
              value={0.2}
              onValueChange={value => {
                setQualityRange(parseInt(value * 100) + '%');
              }}
              thumbTintColor={'white'}
            />
            <View style={{marginTop: 25}}></View>
            <Slider
              style={{width: 150}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="white"
              maximumTrackTintColor={COLORS.lightGray1}
              value={0.3}
              onValueChange={value => {
                setBrightness(parseInt(value * 100) + '%');
              }}
              thumbTintColor={'white'}
            />
            <View style={{marginTop: 25}}></View>
            <Slider
              style={{width: 150}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="white"
              maximumTrackTintColor={COLORS.lightGray1}
              value={0.1}
              onValueChange={value => {
                setContrast(parseInt(value * 100) + '%');
              }}
              thumbTintColor={'white'}
            />
            <View style={{marginTop: 25}}></View>
            <Slider
              style={{width: 150}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="white"
              maximumTrackTintColor={COLORS.lightGray1}
              value={0.4}
              onValueChange={value => {
                setSaturation(parseInt(value * 100) + '%');
              }}
              thumbTintColor={'white'}
            />
          </View>
          <View style={{flex: 0.5, alignItems: 'flex-end'}}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>
              {qualityrange}
            </Text>
            <View style={{marginVertical: 10}}></View>
            <Text style={{...FONTS.h3, color: COLORS.white}}>{brightness}</Text>
            <View style={{marginVertical: 10}}></View>
            <Text style={{...FONTS.h3, color: COLORS.white}}>{contrast}</Text>
            <View style={{marginVertical: 10}}></View>
            <Text style={{...FONTS.h3, color: COLORS.white}}>{saturation}</Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 0.5,
            borderColor: COLORS.gray3,
            marginVertical: SIZES.padding,
          }}></View> */}
        {/* <View
          style={{
            // marginTop: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}> */}
        {/* <Text style={{fontSize: 15, color: COLORS.white}}>
            Notification Turn On / Off
          </Text> */}
        {/* <Switch
            style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
            trackColor={{false: COLORS.gray, true: COLORS.success_400}}
            thumbColor={isEnabledNotification ? COLORS.white : COLORS.white}
            ios_backgroundColor="#3e3e3e"
            onValueChange={value => {
              setIsEnabledNotification(value);
              postMotorNotificationSetting(value);
            }}
            value={isEnabledNotification}
          /> */}

        {/* <DuoToggleSwitch
            style={{
              maxHeight: 25,
              maxWidth: 80,
            }}
            primaryText="OFF"
            secondaryText="ON"
            onPrimaryPress={() => console.log('off')}
            onSecondaryPress={() => console.log('on')}
            primaryButtonStyle={{
              maxHeight: 25,
              maxWidth: 40,
            }}
            secondaryButtonStyle={{
              maxHeight: 25,
              maxWidth: 40,
            }}
            primaryTextStyle={{borderRadius: null}}
          /> */}
        {/* <ToggleSwitch
            text={{
              on: 'ON',
              off: 'OFF',
              activeTextColor: 'white',
              inactiveTextColor: 'white',
            }}
            textStyle={{fontWeight: 'bold'}}
            color={{
              indicator: 'white',
              active: COLORS.amber_500,
              inactive: COLORS.darkGray,
              activeBorder: COLORS.white,
              inactiveBorder: COLORS.white,
            }}
            active={isEnabledNotification}
            disabled={false}
            width={43}
            radius={13}
            onValueChange={val => {
              console.log(val);
              // setIsEnabledNotification(value);
              postMotorNotificationSetting(value);
            }}
          /> */}
        {/* </View> */}
      </View>
    );
  }

  function renderLeakage() {
    return (
      <View
        style={{
          backgroundColor: COLORS.cyan_600,
          paddingHorizontal: 15,
          paddingVertical: 10,
          marginTop: 10,
          borderRadius: 10,
          elevation: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...FONTS.h2, fontWeight: '600', color: COLORS.white}}>
            Leakage Testing
          </Text>
          <Switch
            style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
            trackColor={{false: COLORS.gray, true: COLORS.success_400}}
            thumbColor={leakageToggle ? COLORS.white : COLORS.white}
            ios_backgroundColor="#3e3e3e"
            onValueChange={value => {
              // setIsEnabledNotification(value);
              setLeakageToggle(value);
              // postMotorNotificationSetting(value);
            }}
            value={leakageToggle}
          />
        </View>
        <Text style={{...FONTS.body3, color: COLORS.white}}>
          <Text style={{...FONTS.body3, fontWeight: '600'}}>Note :</Text> Please
          make sure that water from the entire water distribution system will
          not be in use for next 30 minute.
        </Text>
      </View>
    );
  }
  function renderVersion() {
    return (
      <View style={{alignItems: 'center', marginTop: 120}}>
        <Text
          style={{
            fontSize: 22,
            color: COLORS.gray,
            fontWeight: 'bold',
          }}>
          Intenics
        </Text>
        <Text style={{fontSize: 12, color: COLORS.darkGray}}>
          Version 1.0.0
        </Text>
      </View>
    );
  }

  function renderOprationalLayout() {
    return (
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          marginTop: 10,
          borderRadius: 10,
          elevation: 5,
          backgroundColor: COLORS.cyan_600,
        }}>
        <Text style={{...FONTS.h2, fontWeight: '600', color: COLORS.white}}>
          Operational Layout
        </Text>
        <View style={{marginTop: 5}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Switch
              style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
              trackColor={{false: COLORS.gray, true: COLORS.success_400}}
              thumbColor={isSourceOne ? COLORS.white : COLORS.white}
              onValueChange={value => {
                setIsSourceOne(value);
                setIsSourceTwo(false);
              }}
              value={isSourceOne}
            />
            <Text style={{...FONTS.body3, color: COLORS.white, left: 10}}>
              OHT + Source 1
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Switch
              style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
              trackColor={{false: COLORS.gray, true: COLORS.success_400}}
              thumbColor={isSourceTwo ? COLORS.white : COLORS.white}
              onValueChange={value => {
                setIsSourceTwo(value);
                setIsSourceOne(false);
              }}
              value={isSourceTwo}
            />
            <Text style={{...FONTS.body3, color: COLORS.white, left: 10}}>
              OHT + Source 1 + Source 2
            </Text>
          </View>
        </View>
      </View>
    );
  }
  function logoutLayout() {
    return (
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          marginTop: 10,
          borderRadius: 10,
          elevation: 5,
          backgroundColor: COLORS.cyan_600,
        }}>
        <TouchableOpacity
          style={{marginTop: 5}}
          onPress={() => {
            logout();
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginRight: SIZES.height * 0.32,
            }}>
            <AntDesign name="logout" size={20} color={COLORS.white} />
            <Text
              style={{
                ...FONTS.h2,
                fontWeight: '600',
                color: COLORS.white,
                left: 10,
              }}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function renderSourceOne() {
    return (
      <View
        style={{
          marginTop: 15,
          borderWidth: 1,
          borderColor: COLORS.darkGray,
          padding: 10,
          borderRadius: 10,
        }}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.white,
            padding: 3,
            backgroundColor: COLORS.blue,
            textAlign: 'center',
            marginHorizontal: 10,
          }}>
          OHT (Overhead tank) + Source-1 (eg: Bore)
        </Text>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <ImageBackground
            source={images.OHT_Source1}
            style={{
              height: 350,
              width: 350,
              marginTop: 15,
            }}></ImageBackground>
        </View>
      </View>
    );
  }

  function renderSourceTwo() {
    return (
      <View
        style={{
          marginTop: 15,
          borderWidth: 1,
          borderColor: COLORS.darkGray,
          padding: 10,
          borderRadius: 10,
        }}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.white,
            padding: 3,
            backgroundColor: COLORS.blue,
            textAlign: 'center',
            marginHorizontal: 10,
          }}>
          OHT (Overhead tank) + Source-1 (eg: Bore) + Source-2 (eg: Underground
          water tank)
        </Text>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <ImageBackground
            source={images.OHT_Source1_Source2}
            style={{
              height: 350,
              width: 350,
              marginTop: 15,
            }}></ImageBackground>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={{margin: 10}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}>
      {renderTankHeight()}
      <RemoteControl />
      {renderSwitchOnOffSettings()}
      {renderWaterSource()}
      {renderLeakage()}
      {/* {renderOtherSettings()} */}
      {/* //saurabh */}
      <Notification />
      {/* //saurabh */}
      {renderPersentModal()}
      {renderTankHeightModal()}
      {renderOprationalLayout()}
      {logoutLayout()}
      {isSourceOne && renderSourceOne()}
      {isSourceTwo && renderSourceTwo()}
      {renderVersion()}
      <CustomToast
        isVisible={submitToast}
        onClose={() => setSubmitToast(false)}
        color={statusCode == 200 ? COLORS.green : COLORS.red}
        title={statusCode == 200 ? 'Logout' : 'Something Went Wrong'}
        message={mssg}
      />
    </ScrollView>
  );
};

export default Settings;
