// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import graphScreen from './graphScreen';
import HostApp from './HostApp';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HostApp" component={HostApp} />
        <Stack.Screen name="graphScreen" component={graphScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
