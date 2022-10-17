import React from 'react';
import {
  View,
  Text,
  Switch,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {FONTS, COLORS, images} from '../constants';

const RemoteControl = () => {
  const [isSourceOne, setIsSourceOne] = React.useState(false);
  const [isSourceTwo, setIsSourceTwo] = React.useState(false);

  function renderOprationalLayout() {
    return (
      <View
        style={{
          padding: 20,
          borderRadius: 10,
          elevation: 5,
          backgroundColor: COLORS.darkGray,
        }}>
        <Text style={{...FONTS.h2, color: COLORS.white}}>
          Oprational Layout
        </Text>
        <View style={{marginTop: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Switch
              style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
              trackColor={{false: COLORS.lightGray1, true: COLORS.success_400}}
              thumbColor={isSourceOne ? COLORS.white : COLORS.white}
              onValueChange={value => {
                setIsSourceOne(value);
                setIsSourceTwo(false);
              }}
              value={isSourceOne}
            />
            <Text style={{...FONTS.h3, color: COLORS.white, left: 10}}>
              OHT + Source 1
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Switch
              style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
              trackColor={{false: COLORS.lightGray1, true: COLORS.success_400}}
              thumbColor={isSourceTwo ? COLORS.white : COLORS.white}
              onValueChange={value => {
                setIsSourceTwo(value);
                setIsSourceOne(false);
              }}
              value={isSourceTwo}
            />
            <Text style={{...FONTS.h3, color: COLORS.white, left: 10}}>
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
    <ScrollView style={{margin: 20}}>
      {renderOprationalLayout()}
      {isSourceOne && renderSourceOne()}
      {isSourceTwo && renderSourceTwo()}
    </ScrollView>
  );
};

export default RemoteControl;
