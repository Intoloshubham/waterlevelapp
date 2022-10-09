import React from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import Lottie from 'lottie-react-native';
import {widthToDo, heightToDo} from './setImagePixels';
import {FONTS, COLORS, icons} from '../constants';
import {getImage, getWaterLevel} from '../controllers/GetImageController';

const Home = () => {
  const [streamImage, setStreamImage] = React.useState();
  const [level, setLevel] = React.useState('');
  const [phValue, setPhValue] = React.useState('');
  const [square, setSquare] = React.useState(false);

  var NewLevel = parseInt(level);

  const getStreamImage = async () => {
    const res = await getImage();
    setStreamImage(res.image);
  };

  const WaterLevel = async () => {
    const res = await getWaterLevel();
    setLevel(res.data.water_level);
    setPhValue(res.data.ph_level);
  };

  React.useEffect(() => {
    setInterval(() => {
      getStreamImage();
      WaterLevel();
    }, 4000);
  }, []);

  function renderWaterTank() {
    return (
      <View
        style={{
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 12,
            color: COLORS.rose_600,
            zIndex: 2,
            top: heightToDo((number = 1)),
            position: 'absolute',
          }}>
          {Math.floor(level)}%
        </Text>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
          }}>
          <Image
            source={icons.tank}
            style={{
              zIndex: 2,
              width: widthToDo((number = '12%')),
              height: heightToDo((number = '7.5%')),
            }}
          />
          <View
            style={{
              bottom: !NewLevel ? 0.5 : NewLevel,
              position: 'absolute',
            }}>
            {level > 0 ? (
              <Lottie
                style={{
                  width: widthToDo((number = '11.5%')),
                  zIndex: 1,
                  backgroundColor: '#3490dc',
                }}
                source={require('../img/demo.json')}
                autoPlay
                loop
              />
            ) : null}
          </View>
          <View
            style={{
              backgroundColor: '#3490dc',
              width: widthToDo((number = '11.5%')),
              height: !NewLevel ? 0.5 : NewLevel,
              bottom: heightToDo((number = '0.09%')),
              position: 'absolute',
              borderBottomRightRadius: heightToDo((number = '1.2%')),
              borderBottomLeftRadius: heightToDo((number = '1.2%')),
              zIndex: 0,
            }}></View>
        </View>
        <Text style={{...FONTS.h3, color: COLORS.darkGray, marginVertical: 6}}>
          Live Water Level
        </Text>
      </View>
    );
  }

  function renderWaterLiveView() {
    return (
      <View
        style={{
          marginVertical: 15,
          backgroundColor: COLORS.white,
          elevation: 5,
          padding: 15,
        }}>
        <Image
          source={{uri: streamImage}}
          style={{
            height: square == true ? 200 : 200,
            width: square == true ? 300 : 200,
            alignSelf: 'center',
            borderRadius: square == true ? 10 : 100,
          }}
        />

        <View
          style={{
            marginTop: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...FONTS.h3,
                textAlign: 'center',
                color: COLORS.darkGray,
              }}>
              Live Camera
            </Text>
            <Image
              source={icons.camera}
              style={{height: 25, width: 25, left: 5}}
            />
            <Text
              style={{
                ...FONTS.h3,
                textAlign: 'center',
                left: 10,
                color: COLORS.darkGray,
              }}>
              View
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => setSquare(false)}
              style={{right: 25, backgroundColor: COLORS.green, padding: 5}}>
              <Image
                source={icons.circle}
                style={{height: 12, width: 12, tintColor: 'white'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSquare(true)}
              style={{right: 15, backgroundColor: COLORS.green, padding: 5}}>
              <Image
                source={icons.square}
                style={{height: 12, width: 12, tintColor: 'white'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => getStreamImage()}
              style={{alignItems: 'flex-end'}}>
              <Image
                source={icons.refresh}
                style={{height: 28, width: 28, tintColor: COLORS.rose_600}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function renderOthers() {
    return (
      <View
        style={{
          padding: 15,
          backgroundColor: COLORS.white,
          elevation: 5,
          marginTop: 15,
          marginBottom: 50,
        }}>
        {/* <Text style={{...FONTS.h2, color: COLORS.darkGray}}>Details</Text> */}
        <View style={{}}>
          <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
            Usage{' - '}Under
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              marginVertical: 10,
              borderColor: COLORS.gray3,
            }}></View>
          <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
            PH Value{' - '}
            {phValue}
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              marginVertical: 10,
              borderColor: COLORS.gray3,
            }}></View>
          <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
            Quality{' - '} {phValue >= 6 && phValue < 8 ? 'Safe' : 'Unsafe'}
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              marginVertical: 10,
              borderColor: COLORS.gray3,
            }}></View>
          <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
            Leakage{' - '}No
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              marginVertical: 10,
              borderColor: COLORS.gray3,
            }}></View>
          <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
            Need Cleaning{' - '}No
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1, margin: 12}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderWaterTank()}

        {renderWaterLiveView()}
        {renderOthers()}
      </ScrollView>
    </View>
  );
};

export default Home;
