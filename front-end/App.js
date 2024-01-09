import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

// Navigators
import Main from './Navigators/Main';

// Context API
import Auth from "./Context/store/Auth";

// Screens
import Header from './Shared/Header';

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Auth>
      <NavigationContainer>
          <Header />
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </Auth>
  );
}

