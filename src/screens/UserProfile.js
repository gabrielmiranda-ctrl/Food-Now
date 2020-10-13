import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

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

  /*var user = firebase.auth().currentUser;

if (user != null) {
user.providerData.forEach(function (profile) {
  console.log("Sign-in provider: " + profile.providerId);
  console.log("  Provider-specific UID: " + profile.uid);
  console.log("  Name: " + profile.displayName);
  console.log("  Email: " + profile.email);
  console.log("  Photo URL: " + profile.photoURL);
});
}
);
}
*/

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