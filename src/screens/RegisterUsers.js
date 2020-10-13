import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import md5 from 'md5';

Icon.loadFont();

export default function RegisterUsers({ navigation }) {

  // Constantes que guardam os dados colocados nos textInputs.
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessLevel, setAccessLevel] = useState('');

  // Função que insere os dados no banco.
  function registerUser(name, phone, email, password, accessLevel) {

    // Criar usuário no Authentication do Firebase.
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // Pegar o UID do usuário cadastrado.
        var user = firebase.auth().currentUser;
        if (user != null) {
          userId = user.uid;
        }

        // Inserindo os dados do usuário no Realtime Database do Firebase.
        database()
          .ref('users/' + userId)
          .set({
            name: name,
            phone: phone,
            email: email,
            password: md5(password), // O md5 realiza a criptografia da senha.
            accessLevel: accessLevel,
          })
        alert('Usuário cadastrado com sucesso!');
        console.log('Usuário cadastrado com sucesso!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert('Esse endereço de e-mail já está em uso!');
          console.log('Esse endereço de e-mail já está em uso!');
        }

        if (error.code === 'auth/invalid-email') {
          alert('Esse endereço de e-mail é inválido!');
          console.log('Esse endereço de e-mail é inválido!');
        }

        if (error.code === 'auth/weak-password') {
          alert('A senha precisa ter pelo menos 6 caracteres.');
          console.log('A senha precisa ter pelo menos 6 caracteres.');
        }

        console.error(error);
      });
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F5872B" />
      {/* View que caracteriza o cabeçalho. */}
      <View style={styles.header}>
        {/* Responsável por mostrar o ícone. */}
        <Text style={styles.textHeader}>Cadastre-se!</Text>
        <Text style={styles.subTextHeader}>Insira seus dados corretos nos campos abaixo.</Text>
      </View>

      <ScrollView>
        {/* View que caracteriza os campos de inputs. */}
        <View style={styles.inputs}>
          {/* View para agrupar elementos em cima do input */}
          <View style={styles.headerInput}>
            <Icon name="user" size={25} color="#F5872B" />
            <Text style={styles.textHeaderInput}>Nome completo:</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Ex.: João da Silva"
            autoCorrect={false}
            minLength={4}
            onChangeText={name => setName(name)}
            value={name}
          />

          <View style={styles.headerInput}>
            <Icon name="phone" size={25} color="#F5872B" />
            <Text style={styles.textHeaderInput}>Celular:</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Ex.: (34) 9 9999-9999"
            autoCorrect={false}
            keyboardType='phone-pad'
            maxLength={14}
            minLength={11}
            onChangeText={phone => setPhone(phone)}
            value={phone}
          />

          <View style={styles.headerInput}>
            <Icon name="envelope" size={25} color="#F5872B" />
            <Text style={styles.textHeaderInput}>E-mail:</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Ex.: joao@gmail.com"
            autoCorrect={false}
            keyboardType='email-address'
            minLength={8}
            onChangeText={email => setEmail(email)}
            value={email}
          />

          <View style={styles.headerInput}>
            <Icon name="lock" size={25} color="#F5872B" />
            <Text style={styles.textHeaderInput}>Senha:</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Ex.: ******"
            autoCorrect={false}
            secureTextEntry={true}
            minLength={6}
            maxLength={15}
            onChangeText={password => setPassword(password)}
            value={password}
          />

          <View style={styles.headerInput}>
            <Icon name="wrench" size={25} color="#F5872B" />
            <Text style={styles.textHeaderInput}>Selecione seu nível de acesso:</Text>
          </View>

          {/* Caixa para selecionar o nível de acesso. */}
          <Picker
            selectedValue={accessLevel}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setAccessLevel(itemValue)}
          >
            <Picker.Item label="Selecionar" value="" />
            <Picker.Item label="Administrador" value="admin" />
            <Picker.Item label="Cliente" value="client" />
          </Picker>

          <View style={styles.btn}>
            <TouchableOpacity
              style={styles.btnSubmit}
              onPress={() => { registerUser(name, phone, email, password, accessLevel) }}
            >
              <Text style={styles.submitText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  textHeader: {
    color: '#F5872B',
    padding: '5%',
    fontSize: 18,
  },

  subTextHeader: {
    color: '#5F6368',
    paddingLeft: '5%',
    paddingBottom: '5%',
    fontSize: 15,
  },

  input: {
    backgroundColor: '#FFFFFF',
    width: '85%',
    marginBottom: '12%',
    color: '#222222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
    borderColor: '#F5872B',
    borderWidth: 2,
  },

  inputs: {
    padding: '5%',
  },

  headerInput: {
    flexDirection: 'row',
    paddingBottom: 10,
    alignItems: 'center',
  },

  textHeaderInput: {
    color: '#5F6368',
    fontSize: 15,
    paddingLeft: 10,
  },

  btnSubmit: {
    backgroundColor: '#F5872B',
    width: '85%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: 20,
  },

  submitText: {
    color: '#FFFFFF',
    fontSize: 18,
  },

  btn: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  picker: {
    height: 50,
    width: 180,
  },
});