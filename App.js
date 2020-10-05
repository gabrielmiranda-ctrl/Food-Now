import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importando as telas que serão puxadas.
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import RegisterUsers from './src/screens/RegisterUsers';
import Home from './src/screens/Home';
import UserArea from './src/screens/UserArea';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterUsers"
          component={RegisterUsers}
          options={{
            title: "Cadastro",
            headerTintColor: '#F5872B'
          }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="UserArea"
          component={UserArea}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
