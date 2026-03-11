import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {leadRepository} from '@repos/leadRepository';
import {Lead} from '@shared/types/models';
import {Screen} from '@shared/components/Screen';

const LeadsListScreen = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  useEffect(() => { leadRepository.list().then(setLeads); }, []);
  return (
    <Screen>
      <FlatList data={leads} keyExtractor={item => item.id} renderItem={({item}) => <View><Text>{item.name}</Text><Text>{item.company}</Text></View>} />
    </Screen>
  );
};

export default LeadsListScreen;
