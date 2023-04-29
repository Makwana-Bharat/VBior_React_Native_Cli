import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Nav from './Router/Nav';
import { Setting } from './Redux/store';
import { StatusBar } from 'react-native';
export default function App() {
  /*Hoocks*/
  const [settings, setSetting] = useState(Setting);
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#2196F3'} />
      <Nav Propertys={settings} setPropertys={setSetting} />
    </NavigationContainer>
  );
}