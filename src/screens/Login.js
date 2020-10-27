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
    // Verificar se os campos foram preenchidos.
    if (email === '' || email === null && password === '' || password === null) {
      alert('Todos os campos devem ser preenchidos.');
    }
    else if (email === '' || email === null) {
      alert('O campo de e-mail tem que ser preenchido.');
    }
    else if (password === '' || password === null) {
      alert('O campo de senha tem que ser preenchido.');
    }
    else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {

          // Pegando o UID do usuário que acabou de ser logado.
          var user = firebase.auth().currentUser;
          if (user != null) {
            var userId = user.uid;

            // Sempre manter o e-mail e senha de usuário atualizados quando for efetuado o login.
            database()
              .ref('/users/' + userId)
              .update({
                email: email,
              })

            database()
              .ref('/users/' + userId)
              .update({
                password: password,
              })

            // Pegando o nível de acesso do usuário logado no banco de dados.
            database()
              .ref('/users/' + userId + '/accessLevel')
              .once('value')
              .then(snapshot => {
                var accessLevel = snapshot.val();
                //console.log('AccessLevel: ', snapshot.val());

                // Redirecionando usuário.
                if (user != null && accessLevel === 'admin') {
                  navigation.navigate('AdminArea')
                }
                if (user != null && accessLevel === 'client') {
                  navigation.navigate('Home')
                }
                if (user != null && accessLevel != 'client' && accessLevel != 'admin') {
                  alert('Erro ao encontrar seu nível de acesso.');
                }

              });
          }
        })

        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            alert('Esse endereço de e-mail é inválido!');
            console.log('Esse endereço de e-mail é inválido!');
          }

          else if (error.code === 'auth/wrong-password') {
            alert('Essa senha é inválida ou o usuário não tem uma senha.');
            console.log('Essa senha é inválida ou o usuário não tem uma senha.');
          }

          else if (error.code === 'auth/too-many-requests') {
            alert('Você efetuou muitas tentativas! Tente mais tarde.');
            console.log('Você efetuou muitas tentativas! Tente mais tarde.');
          }

          else if (error.code === 'auth/user-not-found') {
            alert('Não há registro de usuário correspondente a este identificador.');
            console.log('Não há registro de usuário correspondente a este identificador.');
          }

          else {
            alert('Ocorreu um erro! Tente novamente.');
          }

          console.error(error);
        });
    }
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <StatusBar backgroundColor="#F5872B" />
      <View style={styles.containerLogo} >
        <Image style={styles.imageLogo}
          source={require('../../assets/splash.png')}
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
          style={styles.btnForgotPassword}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnRegister}
          onPress={() => navigation.navigate('RegisterUsers')}
        >
          <Text style={styles.registerText1}>Não tem uma conta? <Text style={styles.registerText2}>Cadastre-se</Text></Text>
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
  imageLogo: {
    width: 220,
    height: 220,
    flex: 1,
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    width: '90%',
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
  btnForgotPassword: {
    backgroundColor: '#FFF',
    marginBottom: 10,
    marginTop: 10,
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  forgotPasswordText: {
    color: '#f5872b',
    textDecorationLine: 'underline',
    fontSize: 15
  },
  btnRegister: {
    backgroundColor: '#FFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  registerText1: {
    color: '#2B2421',
    fontSize: 15
  },
  registerText2: {
    color: '#f5872b',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});