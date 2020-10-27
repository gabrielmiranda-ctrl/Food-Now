import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function EditProfile({ navigation }) {

  // Pegando as constantes para os dados que virão do banco.
  const [accessLevel, setAccessLevel] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  // Pegando as constantes para os novos dados que irão do banco.
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Pegando o UID do usuário que está logado.
  var user = firebase.auth().currentUser;
  if (user != null) {
    var userId = user.uid;

    // Pegando os dados do usuário no banco de dados.
    database()
      .ref('/users/' + userId + '/accessLevel')
      .once('value')
      .then(snapshot => {
        setAccessLevel(snapshot.val());
      });

    database()
      .ref('/users/' + userId + '/email')
      .once('value')
      .then(snapshot => {
        setEmail(snapshot.val());
      });

    database()
      .ref('/users/' + userId + '/name')
      .once('value')
      .then(snapshot => {
        setName(snapshot.val());
      });

    database()
      .ref('/users/' + userId + '/password')
      .once('value')
      .then(snapshot => {
        setPassword(snapshot.val());
      });

    database()
      .ref('/users/' + userId + '/phone')
      .once('value')
      .then(snapshot => {
        setPhone(snapshot.val());
      });
  }

  function editName(newName) {
    // Verificar se o campo foi preenchido.
    if (newName === '' || newName === null) {
      alert('O campo nome deve ser preenchido.');
    }
    else {
      // Alterando o nome.
      database()
        .ref('/users/' + userId)
        .update({
          name: newName,
        })
        .then(() => {
          console.log('Nome alterado com sucesso.');
          alert('Nome alterado com sucesso.\n' + name + ' --> ' + newName);
        });
    }
  }

  function editPhone(newPhone) {
    // Verificar se o campo foi preenchido.
    if (newPhone === '' || newPhone === null) {
      alert('O campo celular deve ser preenchido.');
    }
    else {
      // Alterando o número de celular.
      database()
        .ref('/users/' + userId)
        .update({
          phone: newPhone,
        })
        .then(() => {
          console.log('Número de celular alterado com sucesso.');
          alert('Número de celular alterado com sucesso.\n' + phone + ' --> ' + newPhone);
        });
    }
  }

  function editEmail(newEmail) {
    // Verificar se o campo foi preenchido.
    if (newEmail === '' || newEmail === null) {
      alert('O campo e-mail deve ser preenchido.');
    }
    else {
      // Alterando o e-mail.
      var user = firebase.auth().currentUser;

      user.updateEmail(newEmail).then(function () {
        // Logout de usuário.
        const logout = () => {
          auth()
            .signOut()
            .then(() => navigation.navigate('Login'));
        }

        Alert.alert(
          "Alteração",
          "Seu e-mail foi alterado. Você precisa fazer o login novamente.",
          [
            {
              text: "OK",
              onPress: () => logout()
            }
          ],
        );

        database()
          .ref('/users/' + userId)
          .update({
            email: newEmail,
          })
          .then(() => {
            console.log('E-mail alterado com sucesso.');
          });

      }).catch(function (error) {
        if (error.code === 'auth/email-already-in-use') {
          alert('Esse endereço de e-mail já está em uso!');
          console.log('Esse endereço de e-mail já está em uso!');
        }

        else if (error.code === 'auth/invalid-email') {
          alert('Esse endereço de e-mail é inválido!');
          console.log('Esse endereço de e-mail é inválido!');
        }

        else {
          alert('Ocorreu um erro! Tente novamente.');
        }

        console.error(error);
      });
    }
  }

  function editPassword(newPassword) {
    // Verificar se o campo foi preenchido.
    if (newPassword === '' || newPassword === null) {
      alert('O campo senha deve ser preenchido.');
    }
    else {
      // Alterando a senha.
      var user = firebase.auth().currentUser;

      user.updatePassword(newPassword).then(function () {
        // Logout de usuário.
        const logout = () => {
          auth()
            .signOut()
            .then(() => navigation.navigate('Login'));
        }

        Alert.alert(
          "Alteração",
          "Sua senha foi alterada. Você precisa fazer o login novamente.",
          [
            {
              text: "OK",
              onPress: () => logout()
            }
          ],
        );

        database()
          .ref('/users/' + userId)
          .update({
            password: newPassword,
          })
          .then(() => {
            console.log('Senha alterada com sucesso.');
          });

      }).catch(function (error) {
        if (error.code === 'auth/weak-password') {
          alert('A senha precisa ter pelo menos 6 caracteres.');
          console.log('A senha precisa ter pelo menos 6 caracteres.');
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
      <ScrollView>

        <View style={styles.header}>
          <Text style={styles.textHeader}>Altere seus dados usando os campos abaixo.</Text>
        </View>

        <View style={styles.dataUser}>
          <Text style={styles.textTitle}>Nome:</Text>
          <Text style={styles.subText}>Seu nome atual é: {name}</Text>

          <View style={styles.row}>
            <TextInput
              placeholder="Seu novo nome"
              style={styles.textInput}
              onChangeText={newName => setNewName(newName)}
              value={newName}
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.btnEdit}
              onPress={() => { editName(newName) }}
            >
              <Icon name="edit" size={22} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dataUser}>
          <Text style={styles.textTitle}>E-mail:</Text>
          <Text style={styles.subText}>Seu e-mail atual é: {email}</Text>

          <View style={styles.row}>
            <TextInput
              placeholder="Seu novo e-mail"
              style={styles.textInput}
              onChangeText={newEmail => setNewEmail(newEmail)}
              value={newEmail}
              autoCorrect={false}
              keyboardType='email-address'
              minLength={8}
            />
            <TouchableOpacity
              style={styles.btnEdit}
              onPress={() => { editEmail(newEmail) }}
            >
              <Icon name="edit" size={22} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dataUser}>
          <Text style={styles.textTitle}>Senha:</Text>
          <Text style={styles.subText}>Sua senha atual é: {password}</Text>

          <View style={styles.row}>
            <TextInput
              placeholder="Sua nova senha"
              style={styles.textInput}
              onChangeText={newPassword => setNewPassword(newPassword)}
              value={newPassword}
              autoCorrect={false}
              secureTextEntry={true}
              minLength={6}
              maxLength={15}
            />
            <TouchableOpacity
              style={styles.btnEdit}
              onPress={() => { editPassword(newPassword) }}
            >
              <Icon name="edit" size={22} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dataUser}>
          <Text style={styles.textTitle}>Número de celular:</Text>
          <Text style={styles.subText}>Seu celular atual é: {phone}</Text>

          <View style={styles.row}>
            <TextInput
              placeholder="Seu novo celular"
              style={styles.textInput}
              onChangeText={newPhone => setNewPhone(newPhone)}
              value={newPhone}
              autoCorrect={false}
              keyboardType='phone-pad'
              maxLength={14}
              minLength={11}
            />
            <TouchableOpacity
              style={styles.btnEdit}
              onPress={() => { editPhone(newPhone) }}
            >
              <Icon name="edit" size={22} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },

  textHeader: {
    padding: '7%',
    fontSize: 15,
    color: '#5F6368',
  },

  textTitle: {
    paddingLeft: '7%',
    paddingBottom: '3%',
    color: '#F5872B',
    fontSize: 17,
  },

  subText: {
    paddingLeft: '7%',
    paddingBottom: '3%',
    fontSize: 15
  },

  textInput: {
    backgroundColor: '#FFF',
    width: '60%',
    height: 50,
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
    borderColor: '#f5872b',
    borderWidth: 2,
    marginLeft: '7%'
  },

  dataUser: {
    marginBottom: '5%'
  },

  btnEdit: {
    backgroundColor: '#F5872B',
    width: '15%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginLeft: 10,
  },

  row: {
    flexDirection: 'row',
  },

})