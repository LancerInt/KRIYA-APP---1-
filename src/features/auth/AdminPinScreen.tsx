import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {adminPinService} from '@services/security/adminPinService';

const AdminPinScreen = () => {
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState('');

  return (
    <View style={{padding: 16}}>
      <Text>Enter Admin PIN</Text>
      <TextInput secureTextEntry keyboardType="number-pad" value={pin} onChangeText={setPin} />
      <Button title="Verify" onPress={async () => setStatus((await adminPinService.verifyPin(pin)) ? 'Verified' : 'Invalid PIN')} />
      <Button title="Set PIN" onPress={async () => {await adminPinService.setPin(pin); setStatus('PIN saved');}} />
      <Text>{status}</Text>
    </View>
  );
};

export default AdminPinScreen;
