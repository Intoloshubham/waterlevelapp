import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Home, Settings, RemoteControl} from '../screens';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {marginBottom: 5, fontSize: 12},
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerTitle: 'Smart Water Info',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="Remote Control"
        component={RemoteControl}
        options={{
          tabBarLabel: 'Remote Control',
          tabBarLabelStyle: {marginBottom: 5, fontSize: 12},
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="gamepad-circle-down"
              color={color}
              size={20}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarLabelStyle: {marginBottom: 5, fontSize: 12},
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="application-settings"
              color={color}
              size={20}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
export default Tabs;
