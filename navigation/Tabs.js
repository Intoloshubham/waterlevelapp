import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Home, Settings, RemoteControl, Products} from '../screens';
import {COLORS,icons} from '../constants';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Add Products"
        component={Products}
        options={{
          tabBarLabel: 'Product List',
          tabBarLabelStyle: {
            marginBottom: 5,
            fontSize: 12,
            color: COLORS.true_gray_800,
          },
          tabBarIcon: ({color, size}) => (
            <Image
            resizeMode='contain'
          
            style={{
              height:'90%',
              tintColor:COLORS.cyan_600,
              width:'90%'
            }}            
            source={icons.addProduct                  
            }/>
       
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            marginBottom: 5,
            fontSize: 12,
            color: COLORS.true_gray_800,
          },
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home"
              color={COLORS.cyan_600}
              size={size}
            />
          ),
          headerTitle: 'Smart Water Info',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: COLORS.cyan_700,
          },
        }}
      />
      <Tab.Screen
        name="Remote Control"
        component={RemoteControl}
        options={{
          tabBarLabel: 'Remote Control',
          tabBarLabelStyle: {
            marginBottom: 5,
            fontSize: 12,
            color: COLORS.true_gray_800,
          },
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="gamepad-circle-down"
              color={COLORS.cyan_600}
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
          tabBarLabelStyle: {
            marginBottom: 5,
            fontSize: 12,
            color: COLORS.true_gray_800,
          },
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="application-settings"
              color={COLORS.cyan_600}
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
