<script src="http://localhost:8097"></script>
import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import MenuScreen from './components/Menu';
import CurrencyScreen from './components/Currency/Currency';

const MainStack = createStackNavigator (
  {
    Menu: MenuScreen,
    Currency: CurrencyScreen
  },
  {
    initialRouteName: 'Menu',
  }
);

const RootStack = createStackNavigator (
  {
    Main: {
      screen: MainStack,
    }    
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}