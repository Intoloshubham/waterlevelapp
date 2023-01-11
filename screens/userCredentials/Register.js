import React, {useState} from 'react';
import {API_URL} from '@env';
import {
  View,
  KeyboardAvoidingView,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS, icons, FONTS, SIZES} from '../../constants';
import {TextInput} from 'react-native-paper';
import {HeaderBar, TextButton, CustomToast} from '../../componets';
import {registerUser,loginUser} from '../../controllers/LoginController';

const Register = ({navigation}) => {
  const [name, SetName] = React.useState('');
  const [mobile, SetMobile] = React.useState('');
  const [email, SetEmail] = React.useState('');

  const [submitToast, setSubmitToast] = React.useState(false);
  const [updateToast, setUpdateToast] = React.useState(false);
  const [deleteToast, setDeleteToast] = React.useState(false);

  const [errorCode, setErrorCode] = useState('');
  const [mssg, setMssg] = useState('');

  const _registerUser = async () => {
    try {
      const body = {
        name,
        mobile,
        email
      };
      const temp = await registerUser(body);

      if (temp.status === 200) {
        setErrorCode(200);
        setMssg(temp.data);
        setSubmitToast(true);
        setTimeout(() => {
          navigation.navigate('Login')
        }, 700);
      } else if (temp.message.status === 101) {
        setErrorCode(101);
        setMssg(temp.message.msg);
        setSubmitToast(true);
      } else if (temp.message.status === 102) {
        setErrorCode(102);
        setMssg(temp.message.msg);
        setSubmitToast(true);
      } else {
        setMssg('Enter All required Fields');
        setSubmitToast(true);
      }

      setTimeout(() => {
        setSubmitToast(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };



   

  function renderRegister() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              paddingBottom: SIZES.padding,
              flex: 1,
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                marginBottom: 60,
              }}>
              <Image source={icons.user} style={{height: 80, width: 80}} />
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.darkGray,
                  textAlign: 'center',
                  marginTop: 5,
                }}>
                Register to Water Info
              </Text>
              <Text
                style={{
                  ...FONTS.h5,
                  color: COLORS.darkGray,
                  textAlign: 'center',
                }}>
                Smart WaterInfo
              </Text>
            </View>
            <View style={{marginBottom: 65}}>
              <TextInput
                mode="outlined"
                label="Name"
                left={<TextInput.Icon icon="account" />}
                onChangeText={value => {
                  SetName(value);
                }}
              />
              <TextInput
                style={{marginTop: 10}}
                mode="outlined"
                label="Email"
                left={<TextInput.Icon icon="email" />}
                keyboardType="email-address"
                onChangeText={value => {
                  SetEmail(value);
                }}
              />
              <TextInput
                style={{marginTop: 10}}
                mode="outlined"
                label="Mobile No."
                left={<TextInput.Icon icon="dialpad" />}
                keyboardType="numeric"
                onChangeText={value => {
                  SetMobile(value);
                }}
              />
              <TextButton
                label="Register"
                buttonContainerStyle={{
                  marginTop: 25,
                  height: 45,
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={() => {
                  _registerUser();
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginTop: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
                Already have an account ?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login')
                 }}
                style={{
                  backgroundColor: COLORS.cyan_600,
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  left: 10,
                }}
       
                >
                <Text
                  style={{
                    ...FONTS.h4,
                    color: COLORS.white,
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <HeaderBar title="Register" />
      {renderRegister()}
      <CustomToast
        isVisible={submitToast}
        onClose={() => setSubmitToast(false)}
        color={errorCode == 200 ? COLORS.green : COLORS.red}
        title={
          errorCode == 200 ? 'Registered Successfully' : 'Something Went Wrong'
        }
        message={mssg}
      />
    </View>
  );
};

export default Register;
