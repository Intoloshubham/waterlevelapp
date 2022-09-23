import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AnimationWaterapp from './componets/AnimationWaterapp';
import Settings from './componets/Settings';
import Tabs from './navigation/Taps';
import History from './componets/History';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Response from './componets/Response';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Tabs">
        <Stack.Screen name="Water info" component={AnimationWaterapp} />
        <Stack.Screen name="Setting" component={Settings} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Response" component={Response} />
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});

{
  /* <NavigationContainer>
<Stack.Navigator initialRouteName="Home">
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Details" component={DetailsScreen} />
</Stack.Navigator>
</NavigationContainer> */
}
