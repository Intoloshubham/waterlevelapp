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
} from 'react-native';
import {FONTS, COLORS, icons, SIZES, images} from '../constants';
import {
  getWaterLevelSettings,
  postWaterLevelSettings,
  postTankHeightSettings,
  postWaterSourceSettings,
  postMotorNotification,
} from '../controllers/SettingsController';
import DropDownPicker from 'react-native-dropdown-picker';
import {TextInput} from 'react-native-paper';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Settings = () => {
  //Modal
  const [persentModal, setPersentModal] = useState(false);
  const [tankHeightModal, setTankHeightModal] = useState(false);
  const [minimumPersent, SetMinimumPersent] = useState('');
  const [maximumPersent, SetMaximumPersent] = useState('');

  //
  const [waterLevelData, setWaterLevelData] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [tankHeight, setTankHeight] = React.useState('');

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

  //===========================

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
          <Text style={{fontSize: 18, color: COLORS.white, fontWeight: '500'}}>
            Water Level Height
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
                Minimum level{' - '}
                {waterLevelData.start_level == ''
                  ? '0'
                  : waterLevelData.start_level}
                %
              </Text>
              <Text style={{fontSize: 15, color: COLORS.white}}>
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
              width: '90%',
              padding: 30,
              borderRadius: 10,
              backgroundColor: COLORS.white,
            }}>
            <TextInput
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

  function renderTankHeight() {
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
          <Text style={{fontSize: 18, fontWeight: '500', color: COLORS.white}}>
            Tank Height
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              // marginTop: 5,
            }}>
            <View>
              {!waterLevelData.tank_height ? (
                <Text style={{fontSize: 15, color: COLORS.white}}>Default</Text>
              ) : null}
              {waterLevelData.tank_height ? (
                <Text style={{fontSize: 15, color: COLORS.white}}>
                  Manually - {waterLevelData.tank_height}%
                </Text>
              ) : null}
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
                      width: '60%',
                      height: 35,
                    }}
                    mode="outlined"
                    label="Tank height"
                    onChangeText={value => {
                      setTankHeight(value);
                    }}
                  />
                  <View style={{width: '30%'}}>
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
          backgroundColor: COLORS.cyan_600,
          paddingHorizontal: 15,
          paddingVertical: 10,
          marginTop: 10,
          borderRadius: 10,
          elevation: 5,
        }}>
        <View>
          <Text style={{fontSize: 18, fontWeight: '500', color: COLORS.white}}>
            Water Source
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
              <Text style={{fontSize: 15, color: COLORS.white, left: 10}}>
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
              <Text style={{fontSize: 15, color: COLORS.white, left: 10}}>
                Source-2 (Sump Pump)
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  function renderOtherSettings() {
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
        <Text style={{fontSize: 18, fontWeight: '500', color: COLORS.white}}>
          Other Settings
        </Text>
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
        <View
          style={{
            // marginTop: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 15, color: COLORS.white}}>
            Notification Turn On / Off
          </Text>
          <Switch
            style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
            trackColor={{false: COLORS.gray, true: COLORS.success_400}}
            thumbColor={isEnabledNotification ? COLORS.white : COLORS.white}
            ios_backgroundColor="#3e3e3e"
            onValueChange={value => {
              setIsEnabledNotification(value);
              postMotorNotificationSetting(value);
            }}
            value={isEnabledNotification}
          />

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
        </View>
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
        <Text style={{fontSize: 18, fontWeight: '500', color: COLORS.white}}>
          Oprational Layout
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
            <Text style={{fontSize: 15, color: COLORS.white, left: 10}}>
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
            <Text style={{fontSize: 15, color: COLORS.white, left: 10}}>
              OHT + Source 1 + Source 2
            </Text>
          </View>
        </View>
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
      {renderSwitchOnOffSettings()}
      {renderTankHeight()}
      {renderWaterSource()}
      {renderOtherSettings()}
      {renderPersentModal()}
      {renderTankHeightModal()}
      {renderOprationalLayout()}
      {isSourceOne && renderSourceOne()}
      {isSourceTwo && renderSourceTwo()}
      {renderVersion()}
    </ScrollView>
  );
};

export default Settings;
