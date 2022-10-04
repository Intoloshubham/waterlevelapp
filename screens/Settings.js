import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import {FONTS, COLORS} from '../constants';

const Settings = () => {
  const [qualityrange, setQualityRange] = useState('10%');
  const [brightness, setBrightness] = useState('20%');
  const [contrast, setContrast] = useState('30%');
  const [saturation, setSaturation] = useState();

  return (
    <View style={{padding: 20}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.darkGray,
          }}>
          Quality{' : '}
        </Text>
        <Slider
          style={{width: 180}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="red"
          maximumTrackTintColor="#000"
          value={0.2}
          onValueChange={value => {
            setQualityRange(parseInt(value * 100) + '%');
          }}
        />
        <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
          {qualityrange}
        </Text>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          marginVertical: 15,
          borderColor: COLORS.gray3,
        }}></View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.darkGray,
          }}>
          Brightness{' : '}
        </Text>
        <Slider
          style={{width: 180}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="red"
          maximumTrackTintColor="#000"
          value={0.3}
          onValueChange={value => {
            setBrightness(parseInt(value * 100) + '%');
          }}
        />
        <Text style={{...FONTS.h3, color: COLORS.darkGray}}>{brightness}</Text>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          marginVertical: 15,
          borderColor: COLORS.gray3,
        }}></View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.darkGray,
          }}>
          Contrast{' : '}
        </Text>
        <Slider
          style={{width: 180}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="red"
          maximumTrackTintColor="#000"
          value={0.1}
          onValueChange={value => {
            setContrast(parseInt(value * 100) + '%');
          }}
        />
        <Text style={{...FONTS.h3, color: COLORS.darkGray}}>{contrast}</Text>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          marginVertical: 15,
          borderColor: COLORS.gray3,
        }}></View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.darkGray,
          }}>
          Saturation{' : '}
        </Text>
        <Slider
          style={{width: 180}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="red"
          maximumTrackTintColor="#000"
          value={0.4}
          onValueChange={value => {
            setSaturation(parseInt(value * 100) + '%');
          }}
        />
        <Text style={{...FONTS.h3, color: COLORS.darkGray}}>{saturation}</Text>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          marginVertical: 15,
          borderColor: COLORS.gray3,
        }}></View>
      <Text style={{...FONTS.h4, color: COLORS.darkGray}}>Version: 1.0.0</Text>
      <View
        style={{
          borderBottomWidth: 1,
          marginVertical: 15,
          borderColor: COLORS.gray3,
        }}></View>
      <Text
        style={{
          ...FONTS.h2,
          color: COLORS.darkGray,
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        Intolo India
      </Text>
    </View>
  );
};

export default Settings;
