import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

export default function AdminArea({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ÁREA DO ADMIN</Text>

      <View style={styles.btn}>
        <Button
          title="Ir para perfil"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>

      <View style={styles.btn}>
        <Button
          title="Ir para tela de pagamento"
          onPress={() => navigation.navigate('DeliveryAddress')}
        />
      </View>

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
  },
  btn: {
    marginBottom: 20,
  }
})