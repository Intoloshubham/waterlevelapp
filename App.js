import React, {useEffect, useState} from 'react';
import Tabs from './navigation/Tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Register, ForgetPassword} from './screens/userCredentials';
import {Home, Products, RemoteControl, Settings} from './screens';
import {Provider} from 'react-redux';
import store from './redux/store.js';
import {COLORS} from './constants';
import {getData, getObjectData} from './utils/localStorage.js';

const Stack = createNativeStackNavigator();

const App = () => {
  const [status, setStatus] = useState(false);

  let temp = null;

  const getToken = async () => {
    temp = await getData('login_token_status');
    console.log('🚀 ~ file: App.js:22 ~ getToken ~ temp', temp);
    if (temp != null)
      if (temp) {
        return true;
      } else {
        return false;
      }
  };

  useEffect(() => {
    (async () => {
      let tc = await getToken();
      if (tc) {
        setStatus(tc);
      } else {
        setStatus(tc);
      }
    })();

    // return () => {
    //   // this now gets called when the component unmounts
    // };
  }, []);
  console.log('status===', status);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={status ? 'Home' : 'Screen'}>
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
          {/* {status ? (
            <Stack.Screen name="Home" component={Home} />
          ) : (
            <Stack.Screen name="Login" component={Login} />
          )} */}

          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
