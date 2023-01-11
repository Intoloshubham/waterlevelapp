import React from 'react';
import {Image, TouchableOpacity, Button} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Home, Settings, RemoteControl, Products, WaterUses} from '../screens';
import {COLORS, icons} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {addIntervalMode} from '../redux/intervalSlice';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const dispatch = useDispatch();

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarVisible: true,
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
              resizeMode="contain"
              style={{
                height: '90%',
                tintColor: COLORS.cyan_600,
                width: '90%',
              }}
              source={icons.addProduct}
            />
          ),
          headerShown: false,
        }}
      />

      {/* <Tab.Screen
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
      /> */}
      <Tab.Screen
        name="Water Uses"
        component={WaterUses}
        options={{
          tabBarLabel: 'Water Uses',
          tabBarLabelStyle: {
            marginBottom: 5,
            fontSize: 12,
            color: COLORS.true_gray_800,
          },
          tabBarIcon: ({color, size}) => (
            <FontAwesome5
              name="hand-holding-water"
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
            <Ionicons name="settings" color={COLORS.cyan_600} size={20} />
          ),

          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
export default Tabs;
