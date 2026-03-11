import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Text, TextInput, Button, View} from 'react-native';
import {leadSchema, LeadFormInput} from '@shared/validation/leadSchema';
import {leadRepository} from '@repos/leadRepository';

const LeadFormScreen = () => {
  const {control, handleSubmit, formState: {errors}} = useForm<LeadFormInput>({resolver: zodResolver(leadSchema)});
  const submit = async (value: LeadFormInput) => {
    const now = new Date().toISOString();
    await leadRepository.upsert({
      id: `lead-${Date.now()}`,
      name: value.name,
      company: value.company,
      email: value.email,
      phone: value.phone,
      country: value.country,
      city: '',
      website: '',
      event: '',
      booth: '',
      interestedProducts: [],
      interestTags: [],
      businessTags: [],
      createdAt: now,
      updatedAt: now
    });
  };
  return (
    <View>
      <Text>Name</Text>
      <Controller control={control} name="name" render={({field: {onChange, value}}) => <TextInput value={value} onChangeText={onChange} />} />
      {errors.name && <Text>Required</Text>}
      <Text>Company</Text>
      <Controller control={control} name="company" render={({field: {onChange, value}}) => <TextInput value={value} onChangeText={onChange} />} />
      <Button title="Save Lead" onPress={handleSubmit(submit)} />
    </View>
  );
};

export default LeadFormScreen;
