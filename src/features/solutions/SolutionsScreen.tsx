import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {solutionRepository} from '@repos/solutionRepository';
import {Recommendation} from '@shared/types/models';
import {Screen} from '@shared/components/Screen';

const SolutionsScreen = () => {
  const [rows, setRows] = useState<Recommendation[]>([]);
  useEffect(() => { solutionRepository.listRecommendations().then(setRows); }, []);
  return (
    <Screen>
      <FlatList
        data={rows}
        keyExtractor={(item, index) => `${item.crop}-${item.problem}-${index}`}
        renderItem={({item}) => <View><Text>{item.crop} → {item.problem}</Text><Text>{item.products.join(', ')}</Text></View>}
      />
    </Screen>
  );
};

export default SolutionsScreen;
