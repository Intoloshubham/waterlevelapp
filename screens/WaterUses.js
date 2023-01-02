import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';

const WaterUses = () => {
  function usesDashboard() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{...FONTS.body2}}>Dashboard</Text>
        <View
          style={{
            height: '25%',
            width: '95%',
            borderRadius: SIZES.base,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.base,
            elevation: 1,
            marginTop: SIZES.base,
            backgroundColor: COLORS.white,
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginTop: SIZES.body1,
            }}>
            <Text style={{...FONTS.body3, color: COLORS.darkGray}}>
              PIE CHART
            </Text>
            <View
              style={{
                borderWidth: 1,
                elevation:15,
                borderColor:COLORS.transparent,
                borderRadius: 100,
                backgroundColor: 'green',
                padding: 15,
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 100,
                  elevation:15,
                borderColor:COLORS.transparent,
                  backgroundColor: 'white',
                  padding: 35,
                }}></View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              marginVertical: SIZES.base,
              paddingBottom: SIZES.body1 * 4,
              paddingTop: SIZES.base,
              marginTop: SIZES.body1
            }}>
            <View
              style={{
                // flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: SIZES.base,
                marginRight: SIZES.body1 * 2,
              }}>
              <View
                style={{
                  padding: 6,
                  height: '5%',
                  backgroundColor: COLORS.cyan_400,
                  borderRadius: SIZES.body1 * 5,
                }}></View>
              <View style={{width: '80%'}}>
                <Text
                  style={{
                    textAlign: 'left',
                    ...FONTS.body4,
                    color: COLORS.darkGray,
                  }}>
                  30% in washroom
                </Text>
              </View>
            </View>
            <View
              style={{
                // flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: SIZES.base,
                marginRight: SIZES.body1 * 2,
              }}>
              <View
                style={{
                  padding: 6,
                  height: '5%',
                  backgroundColor: COLORS.cyan_400,
                  borderRadius: SIZES.body1 * 5,
                }}></View>
              <View style={{width: '80%'}}>
                <Text
                  style={{
                    textAlign: 'left',
                    ...FONTS.body4,
                    color: COLORS.darkGray,
                  }}>
                  40% in other
                </Text>
              </View>
            </View>
          </View>          
        </View>
        <View style={{marginTop:SIZES.base}}>
            <TouchableOpacity style={{
                backgroundColor:COLORS.blue_500,
                borderRadius:SIZES.base,
                elevation:2,
                paddingHorizontal:SIZES.body1*4.4,
                paddingVertical:SIZES.base,

            }}>
                <Text style={{...FONTS.body2,color:COLORS.white,textAlign:'center'}}>Add Water Uses </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                backgroundColor:COLORS.white2,
                marginTop:SIZES.base,
                elevation:2,
                borderRadius:SIZES.base,
                paddingHorizontal:SIZES.body1*4.4,
                paddingVertical:SIZES.base,

            }}>
                <Text style={{...FONTS.body2,color:COLORS.darkGray,textAlign:'center'}}>View Details</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, marginTop: SIZES.body1}}>{usesDashboard()}</View>
    </View>
  );
};

export default WaterUses;
