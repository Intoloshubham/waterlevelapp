import React from 'react';
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
import {HeaderBar, TextButton} from '../../componets';

const Register = ({navigation}) => {
  const [name, SetName] = React.useState('');
  const [mobile, SetMobile] = React.useState('');
  const [email, SetEmail] = React.useState('');

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
                Register to get Water Info
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
                onPress={() => console.log('reg')}
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
                onPress={() => navigation.navigate('SignIn')}
                style={{
                  backgroundColor: COLORS.cyan_600,
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  left: 10,
                }}>
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
    </View>
  );
};

export default Register;
