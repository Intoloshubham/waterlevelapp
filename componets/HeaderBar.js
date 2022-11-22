import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, SIZES, FONTS, icons} from '../constants';

const HeaderBar = ({title}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
      }}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          style={{alignItems: 'center', alignItems: 'flex-start'}}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            style={{width: 28, height: 28, tintColor: COLORS.true_gray_800}}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.true_gray_800,
            marginLeft: SIZES.radius,
            textTransform: 'capitalize',
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default HeaderBar;
