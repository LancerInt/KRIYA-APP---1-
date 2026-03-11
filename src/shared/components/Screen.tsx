import React from 'react';
import {SafeAreaView, StyleSheet, ViewProps} from 'react-native';

export const Screen: React.FC<ViewProps> = ({children, style, ...props}) => (
  <SafeAreaView style={[styles.root, style]} {...props}>
    {children}
  </SafeAreaView>
);

const styles = StyleSheet.create({root: {flex: 1, padding: 16, backgroundColor: '#F4F6F8'}});
