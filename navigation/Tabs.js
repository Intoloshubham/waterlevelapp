import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Home, Settings} from '../screens';

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
    </Tab.Navigator>
  );
};
export default Tabs;
