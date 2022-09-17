// import React, {useEffect, useState} from 'react';
// import {StyleSheet, Text, View, TextInput} from 'react-native';
// import Slider from '@react-native-community/slider';
// import {heightToDo, widthToDo} from '../Controller/Api/ImageResponse';

// const Settings = () => {
//   const [qualityrange, setQualityRange] = useState('10%');
//   const [brightness, setBrightness] = useState('20%');
//   const [contrast, setContrast] = useState('30%');
//   const [saturation, setSaturation] = useState();

//   const [silding, setSilding] = useState('Inactive');
//   return (
//     <View style={{flex: 1}}>
//       <View
//         style={{
//           flexDirection: 'row',
//           // backgroundColor: 'red',
//           // marginTop: 5,
//         }}>
//         <View
//           style={{
//             flex: 1,
//             // backgroundColor: 'yellow',
//             alignItems: 'flex-start',
//             padding: widthToDo((number = '0.5%')),
//             // marginLeft: 25,
//           }}>
//           <Text
//             style={{
//               fontSize: widthToDo((number = '1.5%')),
//               color: 'black',
//               marginBottom: heightToDo((number = '1%')),
//               marginTop: heightToDo((number = '0.5%')),
//             }}>
//             Quality{' : '}
//           </Text>
//           <Text
//             style={{
//               fontSize: widthToDo((number = '1.5%')),
//               color: 'black',
//               marginBottom: heightToDo((number = '1%')),
//               marginTop: heightToDo((number = '0.5%')),
//             }}>
//             Brightness{' : '}
//           </Text>
//           <Text
//             style={{
//               fontSize: widthToDo((number = '1.5%')),
//               color: 'black',
//               marginBottom: heightToDo((number = '1%')),
//               marginTop: heightToDo((number = '0.5%')),
//             }}>
//             Contrast{' : '}
//           </Text>
//           <Text
//             style={{
//               fontSize: widthToDo((number = '1.5%')),
//               color: 'black',
//               marginBottom: heightToDo((number = '1%')),
//               marginTop: heightToDo((number = '0.5%')),
//             }}>
//             Saturation{' : '}
//           </Text>
//         </View>
//         <View
//           style={{
//             flex: 1,
//             // backgroundColor: 'red',
//             // alignItems: 'flex-start',
//             padding: widthToDo((number = '1.2%')),
//           }}>
//           <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
//             <Text style={{fontWeight: 'bold'}}>{qualityrange}</Text>
//             {/* <Text style={{fontWeight:"bold"}}>{silding}</Text> */}
//           </View>
//           <Slider
//             style={{width: widthToDo(number = '18%'),marginTop:widthToDo(number='0.1%')}}
//             minimumValue={0}
//             maximumValue={1}
//             minimumTrackTintColor="red"
//             maximumTrackTintColor="#000"
//             value={0.2}
//             onValueChange={value => {
//               setQualityRange(parseInt(value * 100) + '%');
//             }}
//             // onSlidingStart={()=>setSilding('sliding')}
//             // onSlidingComplete={()=>setSilding('Inactive')}
//           />
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-around',
//               marginTop: 10,
//             }}>
//             <Text style={{fontWeight: 'bold'}}>{brightness}</Text>
//             {/* <Text style={{fontWeight:"bold"}}>{silding}</Text> */}
//           </View>
//           <Slider
//             style={{width: widthToDo(number = '18%'),marginTop:widthToDo(number='0.1%')}}
//             minimumValue={0}
//             maximumValue={1}
//             minimumTrackTintColor="red"
//             maximumTrackTintColor="#000"
//             value={0.3}
//             onValueChange={value => {
//               setBrightness(parseInt(value * 100) + '%');
//             }}
//             // onSlidingStart={()=>setSilding('sliding')}
//             // onSlidingComplete={()=>setSilding('Inactive')}
//           />
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-around',
//               marginTop: 10,
//             }}>
//             <Text style={{fontWeight: 'bold'}}>{contrast}</Text>
//             {/* <Text style={{fontWeight:"bold"}}>{silding}</Text> */}
//           </View>
//           <Slider
//             style={{width: widthToDo(number = '18%'),marginTop:widthToDo(number='0.1%')}}
//             minimumValue={0}
//             maximumValue={1}
//             minimumTrackTintColor="red"
//             maximumTrackTintColor="#000"
//             value={0.1}
//             onValueChange={value => {
//               setContrast(parseInt(value * 100) + '%');
//             }}
//             // onSlidingStart={()=>setSilding('sliding')}
//             // onSlidingComplete={()=>setSilding('Inactive')}
//           />
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-around',
//               marginTop: 10,
//             }}>
//             <Text style={{fontWeight: 'bold'}}>{saturation}</Text>
//             {/* <Text style={{fontWeight:"bold"}}>{silding}</Text> */}
//           </View>
//           <Slider
//             style={{width: widthToDo(number = '18%'),marginTop:widthToDo(number='0.1%')}}
//             minimumValue={0}
//             maximumValue={1}
//             minimumTrackTintColor="red"
//             maximumTrackTintColor="#000"
//             value={0.4}
//             onValueChange={value => {
//               setSaturation(parseInt(value * 100) + '%');
//             }}
//             // onSlidingStart={()=>setSilding('sliding')}
//             // onSlidingComplete={()=>setSilding('Inactive')}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// export default Settings;

// const styles = StyleSheet.create({});

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import Slider from '@react-native-community/slider';

const Settings = () => {
  const [qualityrange, setQualityRange] = useState('10%');
  const [brightness, setBrightness] = useState('20%');
  const [contrast, setContrast] = useState('30%');
  const [saturation, setSaturation] = useState()

  const [silding, setSilding] = useState('Inactive')
  return (
    <View style={{flex: 1,}}>
      <View
        style={{
          flexDirection: 'row',
          // backgroundColor: 'red',
          // marginTop: 5,
        }}>
        <View
          style={{
            flex: 1,
            // backgroundColor: 'yellow',
            alignItems: 'flex-start',
            padding: 5,
            marginLeft: 25,
          }}>
          {/* <Text style={{fontSize: 16, color: 'black', marginBottom: 15}}>
              Led_Status{' : '}
            </Text> */}
          <Text style={{fontSize: 16, color: 'black', marginBottom: 15,marginTop:10}}>
            Quality{' : '}
          </Text>
          <Text style={{fontSize: 16, color: 'black', marginBottom: 15,marginTop:10}}>
            Brightness{' : '}
          </Text>
          <Text style={{fontSize: 16, color: 'black', marginBottom: 15,marginTop:10}}>
            Contrast{' : '}
          </Text>
          <Text style={{fontSize: 16, color: 'black', marginBottom: 15,marginTop:10}}>
            Saturation{' : '}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            // backgroundColor: 'red',
            // alignItems: 'flex-start',
            padding: 5,
          }}>
            <View style={{flexDirection:"row",justifyContent:"space-around"}}>
            <Text style={{fontWeight:"bold"}}>{qualityrange}</Text>
            {/* <Text style={{fontWeight:"bold"}}>{silding}</Text> */}
            </View>
          <Slider
            style={{width: 180,}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="red"
            maximumTrackTintColor="#000"
            value={0.2}
            onValueChange={value=>{setQualityRange(parseInt(value*100) +'%')}}
            // onSlidingStart={()=>setSilding('sliding')}
            // onSlidingComplete={()=>setSilding('Inactive')}
          />
          <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:10}}>
            <Text style={{fontWeight:"bold"}}>{brightness}</Text>
            {/* <Text style={{fontWeight:"bold"}}>{silding}</Text> */}
            </View>
          <Slider
            style={{width: 180,}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="red"
            maximumTrackTintColor="#000"
            value={.3}
            onValueChange={value=>{setBrightness(parseInt(value*100) +'%')}}
            // onSlidingStart={()=>setSilding('sliding')}
            // onSlidingComplete={()=>setSilding('Inactive')}
          />
           <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:10}}>
            <Text style={{fontWeight:"bold"}}>{contrast}</Text>
            {/* <Text style={{fontWeight:"bold"}}>{silding}</Text> */}
            </View>
          <Slider
            style={{width: 180,}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="red"
            maximumTrackTintColor="#000"
            value={.1}
            onValueChange={value=>{setContrast(parseInt(value*100) +'%')}}
            // onSlidingStart={()=>setSilding('sliding')}
            // onSlidingComplete={()=>setSilding('Inactive')}
          />
           <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:10}}>
            <Text style={{fontWeight:"bold"}}>{saturation}</Text>
            {/* <Text style={{fontWeight:"bold"}}>{silding}</Text> */}
            </View>
          <Slider
            style={{width: 180,}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="red"
            maximumTrackTintColor="#000"
            value={.4}
            onValueChange={value=>{setSaturation(parseInt(value*100) +'%')}}
            // onSlidingStart={()=>setSilding('sliding')}
            // onSlidingComplete={()=>setSilding('Inactive')}
          />
        </View>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
 
});
