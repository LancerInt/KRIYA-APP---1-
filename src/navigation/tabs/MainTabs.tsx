import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@features/home/HomeScreen';
import ProductListScreen from '@features/products/ProductListScreen';
import TechnologyListScreen from '@features/technology/TechnologyListScreen';
import SolutionsScreen from '@features/solutions/SolutionsScreen';
import DocumentsScreen from '@features/documents/DocumentsScreen';
import VideosScreen from '@features/videos/VideosScreen';
import LeadsListScreen from '@features/leads/LeadsListScreen';
import MeetingsScreen from '@features/meetings/MeetingsScreen';
import SettingsScreen from '@features/settings/SettingsScreen';
import {MainTabParamList} from '@nav/types/routes';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen as React.ComponentType} />
    <Tab.Screen name="Products" component={ProductListScreen} />
    <Tab.Screen name="Technology" component={TechnologyListScreen as React.ComponentType} />
    <Tab.Screen name="Solutions" component={SolutionsScreen} />
    <Tab.Screen name="Documents" component={DocumentsScreen as React.ComponentType} />
    <Tab.Screen name="Videos" component={VideosScreen as React.ComponentType} />
    <Tab.Screen name="Leads" component={LeadsListScreen} />
    <Tab.Screen name="Meetings" component={MeetingsScreen as React.ComponentType} />
    <Tab.Screen name="Settings" component={SettingsScreen as React.ComponentType} />
  </Tab.Navigator>
);
