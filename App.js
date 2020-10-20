import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importando as telas que serão puxadas.
import Login from './src/screens/Login';
import RegisterUsers from './src/screens/RegisterUsers';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import AdminArea from './src/screens/AdminArea';
import EditProfile from './src/screens/EditProfile';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
          name="Profile"
          component={Profile}
          options={{
            title: "Perfil",
            headerTintColor: '#F5872B'
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            title: "Editar perfil",
            headerTintColor: '#F5872B'
          }}
        />
        <Stack.Screen
          name="AdminArea"
          component={AdminArea}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
