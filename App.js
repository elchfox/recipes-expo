import React from 'react';
import { I18nManager, StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';

I18nManager.allowRTL(false)

export default function App() {
  return (
     <AppContainer />
  );
}
