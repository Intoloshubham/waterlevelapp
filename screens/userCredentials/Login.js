import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SIZES, COLORS, icons, images, FONTS} from '../../constants';

const Login = ({navigation}) => {
  const [mobile, SetMobile] = React.useState('');
  const [password, SetPassword] = React.useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          {/* <Text style={{marginBottom:20,...FONTS.h2,textAlign:'center'}}>Water Level</Text> */}
          <View
            style={{
              padding: 25,
              backgroundColor: COLORS.white,
              borderRadius: 20,
              elevation: 10,
            }}>
            <Image source={icons.user} style={styles.header} />
            <Text
              style={{
                textAlign: 'center',
                ...FONTS.h2,
                color: COLORS.white,
                backgroundColor: COLORS.lightblue_700,
                marginBottom: 40,
                marginHorizontal: 40,
                borderRadius: 5,
                padding: 5,
              }}>
              Live Water Level
            </Text>
            <TextInput
              placeholder="Mobile No."
              style={styles.textInput}
              onChangeText={text => SetMobile(text)}
            />
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              secureTextEntry={true}
              onChangeText={text => SetPassword(text)}
            />
            <TouchableOpacity
              style={{
                alignItems: 'center',
                backgroundColor: COLORS.darkGray,
                padding: 8,
                marginTop: 40,
                borderRadius: 5,
              }}
              onPress={() => navigation.navigate('Tabs')}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>Login</Text>
            </TouchableOpacity>
            <View style={{marginTop: 15}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
                  If you don't have an account?
                </Text>
                <TouchableOpacity
                  style={{
                    marginLeft: 10,
                    backgroundColor: COLORS.lightblue_700,
                    paddingVertical: 2,
                    paddingHorizontal: 6,
                  }}
                  onPress={() => navigation.navigate('Register')}>
                  <Text style={{...FONTS.h3, color: COLORS.white}}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => alert('Forgot password')}>
                <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    marginTop: -75,
    marginBottom: 10,
    alignSelf: 'center',
    height: 100,
    width: 100,
    elevation: 10,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});

export default Login;
