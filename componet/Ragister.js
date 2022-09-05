import React, {useState} from 'react';
import {StyleSheet, View, Image, ScrollView,Modal} from 'react-native';
import {TextInput, Button, Title,} from 'react-native-paper';

const Ragister = ({navigation}) => {
  const [useremail, setUserEmail] = useState('');
  const [mobileno, setMobileNo] = useState(null);
  const [modal, setModal] = useState(false)

  const userRagistion = () => {
    const registerdata = {
      useremail: useremail,
      mobileno: mobileno,
    };
      console.log(registerdata);
      navigation.navigate('Login')
    
   
  };

  return (
    <View style={{flex: 1,justifyContent:'center'}}>
        {/* <Button onPress={()=>setModal(true)}>modal</Button> */}
        {/* <Modal visible={modal}>
            <ScrollView>
            <View style={{flex:1,backgroundColor:"#000000aa"}}>
                <View style={{flex:1,backgroundColor:"#fff"}}>
                <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            padding: 20,
            marginHorizontal: 20,
            marginVertical: 20,
          }}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../waterlevelapp/img/ragister.png')}
              style={{width: 200, height: 200}}
            />
          </View>
          <View>
            
            <TextInput
              style={{marginTop: 5}}
              mode="outlined"
              label="email"
              value={useremail}
              onChangeText={useremail => setUserEmail(useremail)}
            />
            <TextInput
              style={{marginTop: 5}}
              mode="outlined"
              label="Mobile no"
              value={mobileno}
              keyboardType="numeric"
              onChangeText={mobileno => setMobileNo(mobileno)}
            />
            
            <Button
              mode="outlined"
              onPress={() => userRagistion()}
              style={{marginTop: 30}}>
              Register
            </Button>
          </View>
            </View>
            </View>
            </View>
            </ScrollView>
        </Modal> */}

        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            padding: 20,
            marginHorizontal: 20,
            marginVertical: 20,
            borderRadius:10,
          
          }}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../waterlevelapp/img/ragister.png')}
              style={{width: 200, height: 200}}
            />
          </View>
          <View>
            
            <TextInput
              style={{marginTop: 5}}
              mode="outlined"
              label="email"
              value={useremail}
              onChangeText={useremail => setUserEmail(useremail)}
            />
            <TextInput
              style={{marginTop: 5}}
              mode="outlined"
              label="Mobile no"
              value={mobileno}
              keyboardType="numeric"
              onChangeText={mobileno => setMobileNo(mobileno)}
            />
            
            <Button
              mode="outlined"
              onPress={() => userRagistion()}
              style={{marginTop: 30}}>
              Register
            </Button>
          </View>
        </View>
         
    </View>
  );
};

export default Ragister;

const styles = StyleSheet.create({});
