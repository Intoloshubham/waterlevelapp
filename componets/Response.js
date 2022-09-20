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
import{widthToDo,heightToDo} from '../Controller/Api/ImageResponse'
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
          width: widthToDo(number='30%'),
          height: heightToDo(number='15%'),
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex:1
        }}>
        <Image source={anyimage} style={{zIndex:2}}  />
        <View
            style={{
              bottom: heightToDo(number='5.5%'),
            }}>
        <Lottie
                style={{
                //   width: 145,
                  width:widthToDo(number='13%'),
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
            width:widthToDo(number='13.5%'),
            height:heightToDo(number='5%'),
            // height:height/6,

            bottom:heightToDo(number='3.6%'),
            position:"absolute",
            borderBottomRightRadius: heightToDo(number="1%"),
            borderBottomLeftRadius: heightToDo(number="1%"),
            zIndex:0
          }}></View>
           
      </View>
      <View> 
        <Text style={styles.test}>Response screen</Text>
      </View>
    </View>
  );
};

export default Response;

const styles = StyleSheet.create({
    test:{
        fontSize:widthToDo(number='2%')
    }
});
