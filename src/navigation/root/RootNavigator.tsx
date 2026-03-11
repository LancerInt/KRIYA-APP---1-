import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainTabs} from '@nav/tabs/MainTabs';
import {RootStackParamList} from '@nav/types/routes';
import AdminPinScreen from '@features/auth/AdminPinScreen';
import ProductDetailScreen from '@features/products/ProductDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainTabs} options={{headerShown: false}} />
      <Stack.Screen name="AdminPinModal" component={AdminPinScreen as React.ComponentType} options={{presentation: 'modal'}} />
      <Stack.Screen name="ProductSearch" component={ProductDetailScreen as React.ComponentType} />
      <Stack.Screen name="DocumentViewer" component={ProductDetailScreen as React.ComponentType} />
      <Stack.Screen name="VideoPlayer" component={ProductDetailScreen as React.ComponentType} />
      <Stack.Screen name="FullscreenGallery" component={ProductDetailScreen as React.ComponentType} />
    </Stack.Navigator>
  </NavigationContainer>
);
