import React from 'react';
import {FlatList, Pressable, StyleSheet, Text} from 'react-native';
import {Screen} from '@shared/components/Screen';

const tiles = ['Kriya Profile', 'Technology', 'Products', 'Solutions', 'Documents', 'Videos', 'Leads', 'Meetings', 'Sync'];

const HomeScreen = () => (
  <Screen>
    <FlatList
      data={tiles}
      numColumns={3}
      keyExtractor={item => item}
      renderItem={({item}) => <Pressable style={styles.tile}><Text>{item}</Text></Pressable>}
    />
  </Screen>
);

const styles = StyleSheet.create({tile: {flex: 1, minHeight: 90, margin: 8, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}});

export default HomeScreen;
