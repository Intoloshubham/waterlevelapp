import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AnimationWaterapp from '../componets/AnimationWaterapp';
import Settings from '../componets/Settings';
import History from '../componets/History';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="water info"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
        <Tab.Screen
        name="Setting"
        component={Settings}
        options={{
          tabBarLabel: 'Setting',
          tabBarLabelStyle:{fontSize:15},
          tabBarIcon: ({ color, size }) => (
            <AntDesign size={25} name="setting" color={color}/>
          ),
        //   tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="water info"
        component={AnimationWaterapp}
        options={{
          tabBarLabel: 'refresh',
          tabBarLabelStyle:{fontSize:15,},
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="refresh" color={color} size={30} />
          ),
        }}
      />
      
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: 'history',
          tabBarLabelStyle:{fontSize:15},
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons  name="history" color={color} size={30} />
          ),
        }}
      /> 
    </Tab.Navigator>
  );
}
export default Tabs;