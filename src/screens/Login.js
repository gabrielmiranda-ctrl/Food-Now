import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar
} from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function loginUser(email, password) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {

        // Pegando o UID do usuário que acabou de ser logado.
        var user = firebase.auth().currentUser;
        if (user != null) {
          userId = user.uid;
        }

        // Pegando o nível de acesso do usuário logado no banco de dados.
        database()
          .ref('/users/' + userId + '/accessLevel')
          .once('value')
          .then(snapshot => {
            var accessLevel = snapshot.val();
            //console.log('AccessLevel: ', snapshot.val());

            // Redirecionando usuário.
            firebase.auth().onAuthStateChanged(user => {
              if (user != null && accessLevel === 'admin') {
                navigation.navigate('AdminArea')
              }
              if (user != null && accessLevel === 'client') {
                navigation.navigate('ClientArea')
              }
            });

          });
      })


      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          alert('Esse endereço de e-mail é inválido!');
          console.log('Esse endereço de e-mail é inválido!');
        }

        if (error.code === 'auth/wrong-password') {
          alert('Essa senha é inválida ou o usuário não tem uma senha.');
          console.log('Essa senha é inválida ou o usuário não tem uma senha.');
        }

        if (error.code === 'auth/too-many-requests') {
          alert('Você efetuou muitas tentativas! Tente mais tarde.');
          console.log('Você efetuou muitas tentativas! Tente mais tarde.');
        }

        console.error(error);
      });
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <StatusBar backgroundColor="#F5872B" />
      <View style={styles.containerLogo} >
        <Image style={styles.imageLogo}
          source={require('../../assets/img_login/logo.png')}
        />
      </View>

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          autoCorrect={false}
          keyboardType='email-address'
          onChangeText={email => setEmail(email)}
          value={email}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
          value={password}
        />

        <TouchableOpacity
          style={styles.btnSubmit}
          onPress={() => { loginUser(email, password) }}
        >
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnRegister}
          onPress={() => navigation.navigate('RegisterUsers')}
        >
          <Text style={styles.registerText}>Criar conta</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  /*imageLogo: {
    width: 250,
    height: 230
  },*/
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 35,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 50,
  },
  input: {
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
    borderColor: '#f5872b',
    borderWidth: 2
  },
  btnSubmit: {
    backgroundColor: '#f5872b',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  submitText: {
    color: '#FFF',
    fontSize: 18
  },
  btnRegister: {
    marginTop: 10,
    backgroundColor: '#2B2421',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  registerText: {
    color: '#FFF',
    fontSize: 18
  }
});