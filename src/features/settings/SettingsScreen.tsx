import React from 'react';
import {Text, View} from 'react-native';
import {Screen} from '@shared/components/Screen';

const PlaceholderScreen: React.FC<{title: string}> = ({title}) => (
  <Screen>
    <View><Text>{title}</Text></View>
  </Screen>
);

export default PlaceholderScreen;
