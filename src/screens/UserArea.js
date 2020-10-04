import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

export default function UserArea({ navigation }) {
  // Logout de usuário.
  logout = () => {
    auth()
      .signOut()
      .then(() => navigation.navigate('Login'));
  }
  // Confirmação da opção sair.
  const logoutAlert = () =>
    Alert.alert(
      "Sair",
      "Você deseja realmente sair?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => logout()
        }
      ],
      { cancelable: false }
    );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>SEJA BEM VINDO</Text>
      <Button
        title="Logout"
        onPress={() => logoutAlert()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    paddingBottom: 50,
  }
})