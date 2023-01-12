import React, {useEffect, useState} from 'react';
// import { useAppState } from '@react-native-community/hooks'
import {AppState} from 'react-native';
import Tabs from './navigation/Tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Register, ForgetPassword} from './screens/userCredentials';
import {Home, Products, RemoteControl, Settings} from './screens';
import {loginUser} from './controllers/LoginController';
import {Provider} from 'react-redux';
import store from './redux/store.js';
import {COLORS} from './constants';
import {getData, getObjectData} from './utils/localStorage.js';

const Stack = createNativeStackNavigator();

const App = () => {
  const [status, setStatus] = useState(false);
  const [aState, setAppState] = useState(AppState.currentState);
  // const navigation = useNavigation();

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
   
          {/* {status  ? (
            <Stack.Screen name="Login" component={Login} />
            ) : (
            <Stack.Screen name= "Home" component={Home} />
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
