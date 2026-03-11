import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppProvider} from '@app/providers/AppProvider';
import {RootNavigator} from '@nav/root/RootNavigator';

const App = () => (
  <GestureHandlerRootView style={{flex: 1}}>
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  </GestureHandlerRootView>
);

export default App;
