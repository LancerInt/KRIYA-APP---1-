import React from 'react';
import {Text, View} from 'react-native';

export const LoadingView = ({label = 'Loading...'}: {label?: string}) => <View><Text>{label}</Text></View>;
export const EmptyState = ({label}: {label: string}) => <View><Text>{label}</Text></View>;
export const ErrorState = ({label}: {label: string}) => <View><Text>{label}</Text></View>;
