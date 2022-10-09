import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {FONTS, COLORS, icons} from '../constants';
import {Fumi} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
  getWaterLevelSettings,
  postWaterLevelSettings,
} from '../controllers/SettingsController';

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
  const [minimumPersent, SetMinimumPersent] = useState('');
  const [maximumPersent, SetMaximumPersent] = useState('');

  //
  const [waterLevelData, setWaterLevelData] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    fetchWaterLevelHeightSettings();
    wait(1000).then(() => setRefreshing(false));
  }, []);

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
    }
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
        }}>
        <Text style={{...FONTS.h2, color: COLORS.white}}>Other Settings</Text>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <View style={{flex: 1}}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.white,
              }}>
              Quality{' - '}
            </Text>
            <View style={{marginVertical: 10}}></View>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.white,
              }}>
              Brightness{' : '}
            </Text>
            <View style={{marginVertical: 10}}></View>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.white,
              }}>
              Contrast{' - '}
            </Text>
            <View style={{marginVertical: 10}}></View>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.white,
              }}>
              Saturation{' - '}
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
          Intolo India
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
      }>
      {renderSwitchOnOffSettings()}
      {renderOtherSettings()}
      {renderPersentModal()}
      {renderVersion()}
    </ScrollView>
  );
};

export default Settings;
