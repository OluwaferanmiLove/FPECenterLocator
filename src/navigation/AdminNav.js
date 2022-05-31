import React from 'react';
import {Platform, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  AdminAddBlock,
  AdminAddPastQuestion,
  AdminBlocks,
  AdminCamera,
  AdminCenters,
  AdminHome,
  AdminList,
  AdminPastQuestions,
} from '../screens';
import { colors } from '../constants/colors';

const AdminStack = createStackNavigator();

export default function AdminNav() {
  return (
    <AdminStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: colors.mainBg
        }
      }}>
        {/* <AdminStack.Screen component={AdminLogin} name={'AdminLogin'} /> */}
        <AdminStack.Screen component={AdminHome} name={'AdminHome'} />
        <AdminStack.Screen component={AdminList} name={'AdminList'} />
        <AdminStack.Screen component={AdminPastQuestions} name={'AdminPastQuestions'} />
        <AdminStack.Screen component={AdminAddPastQuestion} name={'AdminAddPastQuestion'} />
        <AdminStack.Screen component={AdminCamera} name={'AdminCamera'} />
        <AdminStack.Screen component={AdminBlocks} name={'AdminBlocks'} />
        <AdminStack.Screen component={AdminAddBlock} name={'AdminAddBlock'} />
        <AdminStack.Screen component={AdminCenters} name={'AdminCenters'} />
    </AdminStack.Navigator>
  );
}
