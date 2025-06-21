import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SportSelectorScreen from './screens/SportSelectorScreen';
import TabNavigator from './navigation/TabNavigator';

// 👇 定义 Stack 的参数类型
export type RootStackParamList = {
  SelectSport: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SelectSport" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SelectSport" component={SportSelectorScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
