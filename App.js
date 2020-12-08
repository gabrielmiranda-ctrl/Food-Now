import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importando as telas que serão puxadas.
import Login from './src/screens/Login';
import RegisterUsers from './src/screens/RegisterUsers';
import UserArea from './src/screens/UserArea';
import Profile from './src/screens/Profile';
import MainTab from './src/components/MainTab';
import Bebidas from './src/screens/Produtos/Bebidas';
import Porcoes from './src/screens/Produtos/Porcoes';
import Pratos from './src/screens/Produtos/Pratos';
import Sobremesas from './src/screens/Produtos/Sobremesas';
import Descriptions from './src/screens/Descriptions';
import AddProduct from './src/screens/AddProduct';
import SelectImage from './src/screens/SelectImage'
import AdminArea from './src/screens/AdminArea';
import EditProfile from './src/screens/EditProfile';
import EditPhoto from './src/screens/EditPhoto';
import ForgotPassword from './src/screens/ForgotPassword';
import PaymentOptions from './src/screens/PaymentOptions';
import RegisterCard from './src/screens/RegisterCard';
import DeliveryAddress from './src/screens/DeliveryAddress';
import ScanCode from './src/screens/ScanCode';
import PaymentFinished from './src/screens/PaymentFinished';
import Bag from './src/screens/Bag';

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
          name="Bag"
          component={Bag}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectImage"
          component={SelectImage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Descriptions"
          component={Descriptions}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sobremesas"
          component={Sobremesas}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pratos"
          component={Pratos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Porcoes"
          component={Porcoes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Bebidas"
          component={Bebidas}
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
          name="MainTab"
          component={MainTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserArea"
          component={UserArea}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          // options={{
          //   title: "Perfil",
          //   headerTintColor: '#F5872B'
          // }}
          options={{ headerShown: false }}
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
          name="EditPhoto"
          component={EditPhoto}
          options={{
            title: "Editar foto",
            headerTintColor: '#F5872B'
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            title: "Redefinir senha",
            headerTintColor: '#F5872B'
          }}
        />
        <Stack.Screen
          name="AdminArea"
          component={AdminArea}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentOptions"
          component={PaymentOptions}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterCard"
          component={RegisterCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DeliveryAddress"
          component={DeliveryAddress}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ScanCode"
          component={ScanCode}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentFinished"
          component={PaymentFinished}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
