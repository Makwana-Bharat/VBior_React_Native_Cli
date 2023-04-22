import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Nav from './Router/Nav';
import { Setting } from './Redux/store';
export default function App() {
  /*Hoocks*/
  const [settings, setSetting] = useState(Setting);
  return (
    <NavigationContainer>
      <Nav Propertys={settings} setPropertys={setSetting} />
    </NavigationContainer>
  );
}