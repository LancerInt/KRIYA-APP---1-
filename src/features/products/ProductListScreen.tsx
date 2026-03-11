import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, Text} from 'react-native';
import {Screen} from '@shared/components/Screen';
import {productRepository} from '@repos/productRepository';
import {Product} from '@shared/types/models';

const ProductListScreen = () => {
  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => { productRepository.list().then(setItems); }, []);
  return (
    <Screen>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Pressable><Text>{item.name}</Text></Pressable>}
      />
    </Screen>
  );
};

export default ProductListScreen;
