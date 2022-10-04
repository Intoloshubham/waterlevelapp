import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Home, History, Settings} from '../screens';

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
          headerTitle: 'Water Level',
          headerTitleAlign: 'center',
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
        }}
      />
      {/* <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: 'History',
          tabBarLabelStyle: {marginBottom: 5, fontSize: 12},
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="history" color={color} size={size} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};
export default Tabs;
