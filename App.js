import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importando as telas que serão puxadas.
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import RegisterUsers from './src/screens/RegisterUsers';
import Home from './src/screens/Home';
import UserProfile from './src/screens/UserProfile';
import AdminArea from './src/screens/AdminArea';
import ClientArea from './src/screens/ClientArea';

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
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{
            title: "Perfil",
            headerTintColor: '#F5872B'
          }}
        />
        <Stack.Screen
          name="AdminArea"
          component={AdminArea}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ClientArea"
          component={ClientArea}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
