import React, {useEffect, useState} from 'react';
// import { useAppState } from '@react-native-community/hooks'
import {AppState, View, Text,TouchableOpacity,Image} from 'react-native';
import Tabs from './navigation/Tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Register, ForgetPassword} from './screens/userCredentials';
import {Home, Products, RemoteControl, Settings, WaterUses} from './screens';
import {loginUser} from './controllers/LoginController';
import {icons} from './constants/index.js';
import {Provider} from 'react-redux';
import store from './redux/store.js';
import {COLORS} from './constants';
import {getData, getObjectData} from './utils/localStorage.js';
import {Button} from 'react-native-paper';

const Stack = createNativeStackNavigator();

const App = () => {
  const [status, setStatus] = useState(false);
  const [aState, setAppState] = useState(AppState.currentState);

  let temp = null;

  const getToken = async () => {
    temp = await getData('login_token_status');
    // temp1 = await getObjectData('user_credential_body');

    // if (temp1 != null) {
    //   const body = {mobile: temp1.mobile, password: temp1.password};
    //   const temp_login = await loginUser(body);

    //   if(temp_login.status==200)
    //      setStatus(true);
    // }

    // if (temp != null) {
    //   if (temp) {
    //     setStatus(true);
    //   } else {
    //     setStatus(false);
    //   }
    // }
  };

  useEffect(() => {
    getToken();

    // (async () => {
    //   let tc = await getToken();
    //   if (tc) {

    //   } else {

    //   }
    // })();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={status ? 'Home' : 'Login'}>
          {/* initialRouteName="Login"> */}
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen
            options={{
              title: 'SMART WATER PRODUCT',
              headerShown: true,
              headerTitleAlign: 'center',
              // headerBackButtonMenuEnabled:false,
              headerStyle: {
                backgroundColor:
                  Platform.OS === 'android' ? COLORS.cyan_500 : '',
              },
              headerTintColor:
                Platform.OS === 'android' ? 'white' : COLORS.darkBlue,
              headerTitleStyle: {
                fontFamily: 'open-sans-bold',
              },
              headerBackVisible: false,
              headerBackTitleStyle: {
                fontFamily: 'open-sans',
              },
            }}
            name="Products"
            component={Products}
          />

          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="WaterUses"
            options={{
              headerTitle: () => (
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: COLORS.cyan_700,
                      fontWeight: '500',
                    }}>
                    Intenics
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: COLORS.cyan_700,
                      fontWeight: '500',
                    }}>
                    Smart WaterInfo
                  </Text>
                </View>
              ),
              headerBackTitleVisible: true,
              headerShown: true,
              headerTitleAlign: 'center',
              headerTransparent: false,
              headerStyle: {
                backgroundColor: Platform.OS === 'android' ? COLORS.white : '',
              },
              headerTintColor:
                Platform.OS === 'android' ? COLORS.cyan_700 : COLORS.white,          
              headerLeft: ({onPress, focused}) => (
                <TouchableOpacity onPress={onPress}>
                 {/* <Image
                   source={icons.back}
                   resizeMode="contain"
                   style={{
                     width: 15,
                     height: 15,
                     marginLeft: 20,
                     tintColor: focused ? 'gray' : 'black',}}
                 /> */}
               </TouchableOpacity>
             ),
              headerBackVisible: true,
              headerBackTitleStyle: {
                fontSize: 12,
                color: COLORS.cyan_700,
                fontWeight: '500'
              },
            }}
            component={WaterUses}
          />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
