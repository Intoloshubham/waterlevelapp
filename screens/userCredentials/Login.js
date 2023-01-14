import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SIZES, COLORS, icons, images, FONTS} from '../../constants';
import {TextInput} from 'react-native-paper';
import {TextButton, CustomToast} from '../../componets';
import {loginUser} from '../../controllers/LoginController';
import {useDispatch} from 'react-redux';
import {
  storeData,
  storeObjectData,
  getData,
  getObjectData,
} from '../../utils/localStorage.js';
import {addLoginCredentials} from '../../redux/userCredentialSlice';

const Login = ({navigation}) => {
  // const { setToken } = React.useContext(Auth)

  const dispatch = useDispatch();
  const [mobile, SetMobile] = React.useState('');
  const [password, SetPassword] = React.useState('');

  const [submitToast, setSubmitToast] = React.useState(false);
  const [updateToast, setUpdateToast] = React.useState(false);
  const [deleteToast, setDeleteToast] = React.useState(false);
  const [status, setStatus] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  const [mssg, setMssg] = useState('');

  const getCred = async () => {
    temp1 = await getObjectData('user_credential_body');
    if (temp1 != null) {
      const body = {mobile: temp1.mobile, password: temp1.password};
      const temp_login = await loginUser(body);

      if (temp_login.status == 200) return true;
    }
  };

  React.useEffect(() => {
    (async () => {
      let tc = await getCred();
      if (tc) {
        navigation.replace('Tabs');
      }
      // else {
      //   navigation.replace('Login');
      // }
    })();
  }, []);

  const _loginUser = async () => {
    try {
      const body = {mobile, password};
      const temp = await loginUser(body);

      storeObjectData('user_credential_body', body);
      if (temp.status === 200) {
        // setToken(temp.refresh_token)

        storeData('login_token', temp.refresh_token);
        storeObjectData('user_credentials', temp.data);
        storeObjectData('login_token_status', true);
        setErrorCode(200);
        setSubmitToast(true);
        setMssg('Login successfully!');
        dispatch(
          addLoginCredentials({
            refresh_token: temp.refresh_token,
            user_credentials: temp.data,
          }),
        );
        let prm_product = await getData('primary_product');

        setTimeout(async () => {
          if (prm_product != undefined) {
            navigation.replace('Tabs');
          } else {
            navigation.replace('Products');
          }

          // navigation.navigate('Tabs');
          setSubmitToast(false);
        }, 700);
      } else {
        setErrorCode(400);
        setMssg(temp.message);
        setSubmitToast(true);
        setTimeout(() => {
          setSubmitToast(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function renderLogin() {
    return (
      <>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={{padding: 20, flex: 1, justifyContent: 'space-around'}}>
              <View
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginBottom: 70,
                }}>
                <Image
                  source={images.waterinfo}
                  style={{
                    height: 120,
                    width: 170,
                    borderRadius: 10,
                    marginTop: 15,
                  }}
                />
              </View>
              <View
                style={{
                  marginBottom: 10,
                  backgroundColor: COLORS.white,
                  elevation: 5,
                  borderRadius: 10,
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    // console.log('object');
                  }}>
                  <Text
                    style={{
                      fontSize: 22,
                      color: COLORS.true_gray_700,
                      fontWeight: '400',
                    }}>
                    Login to Continue
                  </Text>
                  <Image
                    source={icons.right}
                    style={{
                      left: 10,
                      height: 22,
                      width: 22,
                      tintColor: COLORS.amber_500,
                    }}
                  />
                </TouchableOpacity>
                <View style={{marginTop: 40}}>
                  <TextInput
                    mode="outlined"
                    label="Mobile No."
                    left={<TextInput.Icon icon="dialpad" />}
                    keyboardType="phone-pad"
                    onChangeText={value => {
                      SetMobile(value);
                    }}
                  />
                  <TextInput
                    style={{marginTop: 10}}
                    mode="outlined"
                    label="Password"
                    left={<TextInput.Icon icon="security" />}
                    // secureTextEntry
                    right={<TextInput.Icon icon="eye" />}
                    onChangeText={value => {
                      SetPassword(value);
                    }}
                  />
                  <TextButton
                    label="Login"
                    buttonContainerStyle={{
                      marginTop: 25,
                      height: 45,
                      alignItems: 'center',
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      _loginUser();
                    }}
                  />
                </View>
              </View>
              <View style={{marginTop: SIZES.base * 2}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ForgetPassword');
                  }}>
                  <Text style={{textAlign: 'center', ...FONTS.body4}}>
                    Forget Password ?
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  marginTop: 30,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
                    Don't have an account ?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
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
                      Register
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  marginHorizontal: 115,
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.white,
                    padding: 6,
                    elevation: 10,
                  }}>
                  <Image
                    source={icons.email_circle}
                    style={{height: 20, width: 20}}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.white,
                    padding: 6,
                    elevation: 10,
                  }}>
                  <Image
                    source={icons.linkedin}
                    style={{height: 20, width: 20}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.white,
                    padding: 6,
                    elevation: 10,
                  }}>
                  <Image
                    source={icons.website}
                    style={{height: 20, width: 20}}
                  />
                </TouchableOpacity>
              </View> */}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </>
    );
  }

  function renderBrandingVersion() {
    return (
      <View style={{alignItems: 'center', marginBottom: 10}}>
        <Text
          style={{
            fontSize: 16,
            color: COLORS.true_gray_700,
          }}>
          Intenics
        </Text>
        <Text style={{fontSize: 12, color: COLORS.true_gray_600}}>
          Version 1.0.0
        </Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      {renderLogin()}
      <CustomToast
        isVisible={submitToast}
        onClose={() => setSubmitToast(false)}
        color={errorCode == 200 ? COLORS.green : COLORS.red}
        title={errorCode == 200 ? 'User Login' : 'Something Went Wrong'}
        message={mssg}
      />
      {/* {renderBrandingVersion()} */}
    </View>
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
    borderRadius: 60,
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
