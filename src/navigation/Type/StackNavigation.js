import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Local Imports
import {StackRoute} from '../NavigationRoutes';
import {StackNav} from '../NavigationKeys';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={StackNav.HomeScreen}>
      <Stack.Screen
        name={StackNav.HomeScreen}
        component={StackRoute.HomeScreen}
      />
      <Stack.Screen
        name={StackNav.AddProductScreen}
        component={StackRoute.AddProductScreen}
      />
      <Stack.Screen
        name={StackNav.EditProductScreen}
        component={StackRoute.EditProductScreen}
      />
    </Stack.Navigator>
  );
}
