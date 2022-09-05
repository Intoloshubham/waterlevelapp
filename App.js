import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import WaterTank from './componet/WaterTank';
import Login from './componet/Login';
import Ragister from './componet/Ragister';
import Water from './componet/Water'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const App = () => {
const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Water' >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Ragister" component={Ragister} />
        <Stack.Screen name="WaterTank" component={WaterTank} />
        <Stack.Screen name="Water" component={Water} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App

const styles = StyleSheet.create({})