import React, { useContext } from 'react';
import {Platform, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Centers,
  Profile,
  StudentHome,
} from '../screens';
import { AntDesign, Foundation, Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { fontFamily } from '../constants/fontFamily';
import { hp, wp } from '../util/dimension';
import AdminNav from './AdminNav';
import { AppContext } from '../context/AppContext';

const StudentTab = createBottomTabNavigator();

export default function StudentNav () {
  return (
    <StudentTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarLabel: ({focused, color}) => (
          <Text>Test</Text>
        ),
        tabBarLabelStyle: {
          fontFamily: fontFamily.ApparelDisplayBold,
          fontSize: hp(14)
        },
        tabBarStyle: {
          backgroundColor: colors.mainBg,
          height: Platform.select({android: hp(65), ios: hp(78)}),
          shadowColor: 'transparent',
          // shadowOffset: {
          //   width: 0,
          //   height: 1,
          // },
          borderTopWidth: 0,
          shadowOpacity: 0,
          shadowRadius: 5,
          elevation: 0,
        }
      }}>
      <StudentTab.Screen component={StudentHome} name={'StudentHome'} options={{
        tabBarIcon: ({focused, color, size}) => {
          if (focused) {
            return <Foundation name={'home'} size={28} color={colors.primary} />
          } else {
            return <AntDesign name={'home'} size={28} color={colors.primaryLighter} />
          }
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
      }} />
      <StudentTab.Screen component={Centers} name={'Centers'} options={{
        tabBarIcon: ({focused, color, size}) => {
          if (focused) {
            return <Ionicons name={'location'} size={28} color={colors.primary} />
          } else {
            return <Ionicons name={'location-outline'} size={28} color={colors.primaryLighter} />
          }
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
      }} />
      <StudentTab.Screen component={Profile} name={'Profile'} options={{
        tabBarIcon: ({focused, color, size}) => {
          if (focused) {
            return <Ionicons name={'person'} size={28} color={colors.primary} />
          } else {
            return <Ionicons name={'person-outline'} size={28} color={colors.primaryLighter} />
          }
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
      }} />
    </StudentTab.Navigator>
  )
}
