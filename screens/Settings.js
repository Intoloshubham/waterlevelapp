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
  TextInput,
  ImageBackground,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {FONTS, COLORS, icons, SIZES, images} from '../constants';
import {Fumi} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
  getWaterLevelSettings,
  postWaterLevelSettings,
  postTankHeightSettings,
  postWaterSourceSettings,
  postMotorNotification,
} from '../controllers/SettingsController';
import DropDownPicker from 'react-native-dropdown-picker';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Settings = () => {
  const [qualityrange, setQualityRange] = useState('10%');
  const [brightness, setBrightness] = useState('20%');
  const [contrast, setContrast] = useState('30%');
  const [saturation, setSaturation] = useState('45%');

  //Modal
  const [persentModal, setPersentModal] = useState(false);
  const [tankHeightModal, setTankHeightModal] = useState(false);
  const [minimumPersent, SetMinimumPersent] = useState('');
  const [maximumPersent, SetMaximumPersent] = useState('');

  //
  const [waterLevelData, setWaterLevelData] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [tankHeight, setTankHeight] = React.useState('');

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

  const postWaterLevelHeightSettings = async () => {
    const formData = {start_level: minimumPersent, stop_level: maximumPersent};
    const response = await postWaterLevelSettings(formData);
    if (response.status == 200) {
      alert(response.message);
      setPersentModal(false);
      fetchWaterLevelHeightSettings();
    } else {
      alert(response.message);
    }
  };

  const fetchWaterLevelHeightSettings = async () => {
    const response = await getWaterLevelSettings();
    if (response.status === 200) {
      setWaterLevelData(response.data);
      setIsEnabledSource1(response.data.water_source_1);
      setIsEnabledSource2(response.data.water_source_2);
      setIsEnabledNotification(response.data.motor_notification);
    }
    if (response.data.motor_notification == true) {
    }
  };

  const postWaterTankHeightSettings = async () => {
    const formData = {
      tank_height_type: isEnabledManually,
      tank_height: isEnabledManually === false ? 0 : tankHeight,
      tank_height_unit: isEnabledManually === false ? 0 : value,
    };
    const response = await postTankHeightSettings(formData);
    if (response.status === 200) {
      setTankHeightModal(false);
      setValue('');
      setTankHeight('');
      setIsEnabledManually('');
      fetchWaterLevelHeightSettings();
    }
  };

  const postWaterSourceSetting = async () => {
    const formData = {
      water_source_1: isEnabledSource1,
      water_source_2: isEnabledSource2,
    };
    const response = await postWaterSourceSettings(formData);
  };

  {
    isEnabledSource1 == true || isEnabledSource2 == true
      ? postWaterSourceSetting()
      : null;
  }

  const postMotorNotificationSetting = async value => {
    const formData = {
      motor_notification: value,
    };
    const response = await postMotorNotification(formData);
  };

  React.useEffect(() => {
    fetchWaterLevelHeightSettings();
  }, []);

  function renderSwitchOnOffSettings() {
    return (
      <View
        style={{
          backgroundColor: COLORS.blue_600,
          padding: 20,
          borderRadius: 10,
          elevation: 5,
        }}>
        <View style={{}}>
          <Text style={{...FONTS.h2, color: COLORS.white}}>
            Water Level Height
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15,
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{...FONTS.h3, color: COLORS.white, marginBottom: 3}}>
                Minimum level{' - '}
                {waterLevelData.start_level == ''
                  ? '0'
                  : waterLevelData.start_level}
                %
              </Text>
              <Text style={{...FONTS.h3, color: COLORS.white}}>
                Maximum level{' - '}
                {waterLevelData.stop_level == ''
                  ? '0'
                  : waterLevelData.stop_level}
                %
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.white,
                paddingHorizontal: 10,
                paddingVertical: 4,
              }}
              onPress={() => setPersentModal(true)}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.blue_600,
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
              width: '90%',
              padding: 30,
              borderRadius: 10,
              backgroundColor: COLORS.white,
            }}>
            <Fumi
              style={{
                backgroundColor: COLORS.darkGray,
                marginBottom: 15,
                borderRadius: 5,
              }}
              label={'Minimum %'}
              iconClass={FontAwesomeIcon}
              iconName={'percent'}
              iconColor={COLORS.white}
              iconSize={15}
              iconWidth={30}
              inputPadding={15}
              labelStyle={{color: COLORS.white}}
              inputStyle={{color: COLORS.success_300}}
              onChangeText={value => {
                SetMinimumPersent(value);
              }}
              value={minimumPersent}
            />
            <Fumi
              style={{
                backgroundColor: COLORS.darkGray,
                borderRadius: 5,
              }}
              label={'Maximum %'}
              iconClass={FontAwesomeIcon}
              iconName={'percent'}
              iconColor={COLORS.white}
              iconSize={15}
              iconWidth={30}
              inputPadding={15}
              labelStyle={{color: COLORS.white}}
              inputStyle={{color: COLORS.success_300}}
              onChangeText={value => {
                SetMaximumPersent(value);
              }}
              value={maximumPersent}
            />

            <TouchableOpacity
              style={{
                marginTop: 30,
                backgroundColor: COLORS.blue_600,
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

  function renderOtherSettings() {
    return (
      <View
        style={{
          backgroundColor: COLORS.success_600,
          padding: 20,
          marginTop: 30,
          borderRadius: 10,
          elevation: 5,
        }}>
        <Text style={{...FONTS.h2, color: COLORS.white}}>Other Settings</Text>
        <View style={{flexDirection: 'row', marginTop: 15}}>
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
          }}></View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>
            Notification Turn ON / OFF
          </Text>
          <Switch
            style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
            trackColor={{false: COLORS.darkGray, true: COLORS.rose_600}}
            thumbColor={isEnabledNotification ? COLORS.white : COLORS.white}
            ios_backgroundColor="#3e3e3e"
            onValueChange={value => {
              setIsEnabledNotification(value);
              postMotorNotificationSetting(value);
            }}
            value={isEnabledNotification}
          />
        </View>
      </View>
    );
  }

  function renderTankHeight() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          backgroundColor: COLORS.darkGray,
          padding: 20,
          borderRadius: 10,
          elevation: 5,
        }}>
        <View>
          <Text style={{...FONTS.h2, color: COLORS.white}}>Tank Height</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15,
              justifyContent: 'space-between',
            }}>
            <View>
              {!waterLevelData.tank_height ? (
                <Text
                  style={{...FONTS.h3, color: COLORS.white, marginBottom: 3}}>
                  Default
                </Text>
              ) : null}
              {waterLevelData.tank_height ? (
                <Text style={{...FONTS.h3, color: COLORS.white}}>
                  Manually - {waterLevelData.tank_height}%
                </Text>
              ) : null}
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.white,
                paddingHorizontal: 10,
                paddingVertical: 4,
              }}
              onPress={() => setTankHeightModal(true)}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.amber_500,
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
              width: '90%',
              padding: 30,
              borderRadius: 10,
              backgroundColor: COLORS.white,
            }}>
            <View
              style={{
                marginTop: 15,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                  Default
                </Text>
                <Switch
                  trackColor={{false: COLORS.darkGray, true: COLORS.blue_700}}
                  thumbColor={isEnabledManually ? COLORS.white : COLORS.white}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitchManually}
                  value={isEnabledManually}
                />
                <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                  Manually
                </Text>
              </View>
              {isEnabledManually ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    marginBottom: 20,
                  }}>
                  <TextInput
                    style={{
                      borderBottomColor: COLORS.darkGray,
                      borderBottomWidth: 2,
                      color: COLORS.darkGray,
                      ...FONTS.h4,
                      width: '50%',
                    }}
                    placeholder="Tank height %"
                    placeholderTextColor={COLORS.darkGray}
                    selectionColor={COLORS.darkGray}
                    keyboardType="number-pad"
                    onChangeText={value => {
                      setTankHeight(value);
                    }}
                  />
                  <View style={{width: '40%'}}>
                    <DropDownPicker
                      style={{
                        borderWidth: null,
                        borderRadius: null,
                        backgroundColor: COLORS.lightGray1,
                        minHeight: 20,
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
                    />
                  </View>
                </View>
              ) : null}
            </View>
            <TouchableOpacity
              style={{
                marginTop: 30,
                backgroundColor: COLORS.blue_600,
                alignItems: 'center',
                padding: 10,
              }}
              onPress={() => postWaterTankHeightSettings()}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  function renderWaterSource() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          backgroundColor: COLORS.amber_500,
          padding: 20,
          borderRadius: 10,
          elevation: 5,
        }}>
        <View>
          <Text style={{...FONTS.h2, color: COLORS.white}}>Water Source</Text>
          <View
            style={{
              marginTop: 15,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Switch
                style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
                trackColor={{false: COLORS.darkGray, true: COLORS.blue_700}}
                thumbColor={isEnabledSource1 ? COLORS.white : COLORS.white}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchSource1}
                value={isEnabledSource1}
              />
              <Text style={{...FONTS.h3, color: COLORS.white, left: 10}}>
                Source-1
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Switch
                style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
                trackColor={{false: COLORS.darkGray, true: COLORS.blue_700}}
                thumbColor={isEnabledSource2 ? COLORS.white : COLORS.white}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchSource2}
                value={isEnabledSource2}
              />
              <Text style={{...FONTS.h3, color: COLORS.white, left: 10}}>
                Source-2
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  function renderVersion() {
    return (
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.gray,
            fontWeight: 'bold',
            borderBottomWidth: 0.5,
            borderBottomColor: COLORS.darkGray2,
          }}>
          intenics.in
        </Text>
        <Text style={{...FONTS.h6, color: COLORS.darkGray}}>
          Version - 1.0.0
        </Text>
      </View>
    );
  }
  
  return (
    <ScrollView
      style={{margin: 20}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}>
      {renderSwitchOnOffSettings()}
      {renderTankHeight()}
      {renderWaterSource()}
      {renderOtherSettings()}
      {renderPersentModal()}
      {renderTankHeightModal()}
      {renderVersion()}
    </ScrollView>
  );
};

export default Settings;
