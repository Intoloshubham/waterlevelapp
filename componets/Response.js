import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import anyimage from '../img/4.png';
import Lottie from 'lottie-react-native';
const {height, width} = Dimensions.get('window');
const Response = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {/* <Image source={anyimage}style={{width:width,height:height}}/> */}

      <View
        style={{
          backgroundColor: '#fff',
          width: width - 600,
          height: height/2,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex:1
        }}>
        <Image source={anyimage} style={{zIndex:2}}  />
        <View
            style={{
            //   position: 'absolute',
            //   bottom: 100,
            //   left: 132,
            //   bottom: level ? level : null,
              bottom: 130,
            }}>
        <Lottie
                style={{
                //   width: 145,
                  width:width-250,
                //   position: 'absolute',
                  zIndex: 1,
                  backgroundColor: '#3490dc',
                }}
                source={require('../img/demo.json')}
                autoPlay
                loop
              />
             </View>
        <View
          style={{
            backgroundColor: '#3490dc',
            // width:145,
            width:width-247,
            // height:120,
            height:height/6,

            bottom:108,
            position:"absolute",
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 22,
            zIndex:0
          }}></View>
           
      </View>
    </View>
  );
};

export default Response;

const styles = StyleSheet.create({});
