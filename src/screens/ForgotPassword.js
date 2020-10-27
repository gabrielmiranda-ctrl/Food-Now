import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  function passwordReset(email) {
    var auth = firebase.auth();

    // Verificar se o campo de e-mail foi preenchido.
    if (email === '' || email === null) {
      alert('Esse campo tem que ser preenchido.');
    }

    else {
      auth.sendPasswordResetEmail(email).then(function () {
        Alert.alert(
          'Sucesso!',
          'Já enviamos as instruções em seu e-mail.'
        );
        console.log('Sucesso! Já enviamos as instruções em seu e-mail.');

      }).catch(function (error) {
        if (error.code === 'auth/invalid-email') {
          alert('Esse endereço de e-mail é inválido!');
          console.log('Esse endereço de e-mail é inválido!');
        }
        else if (error.code === 'auth/user-not-found') {
          alert('Não há registro de usuário correspondente a este identificador.');
          console.log('Não há registro de usuário correspondente a este identificador.');
        }
        else {
          alert('Ocorreu um erro! Tente novamente.');
        }
        console.log(error);
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Insira um endereço de e-mail válido no campo abaixo e enviaremos uma mensagem por correio eletrônico.</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira um e-mail"
        autoCorrect={false}
        keyboardType='email-address'
        onChangeText={email => setEmail(email)}
        value={email}
      />
      <TouchableOpacity
        style={styles.btnSubmit}
        onPress={() => { passwordReset(email) }}
      >
        <Text style={styles.submitText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  textHeader: {
    margin: '7%',
    fontSize: 15,
    color: '#5F6368',
  },
  btnSubmit: {
    backgroundColor: '#f5872b',
    width: '70%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  input: {
    backgroundColor: '#FFF',
    width: '70%',
    marginBottom: 15,
    marginTop: 20,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
    borderColor: '#f5872b',
    borderWidth: 2
  },
  submitText: {
    color: '#FFF',
    fontSize: 18
  },
})