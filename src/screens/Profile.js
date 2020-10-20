import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

export default function Profile({ navigation }) {

  // Logout de usuário.
  const logout = () => {
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

  // Pegando as constantes para os dados que virão do banco.
  const [accessLevel, setAccessLevel] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

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

  return (
    <View style={styles.container}>
      <ScrollView>

        <View style={styles.imgProfileView}>
          <Text style={styles.textImgProfile}>Foto de Perfil</Text>
          <View style={styles.row}>
            <Image
              source={require('../../assets/profile/img_usuario.png')}
              style={styles.imgProfile}
            />
            <Icon
              name="pencil"
              size={25}
              color="#F5872B"
              style={styles.iconImgProfile}
              onPress={() => alert('Editar foto de perfil.')}
            />
          </View>
        </View>

        <View style={styles.userData}>
          <View style={styles.row}>
            <Text style={styles.textUserData}>ID: <Text style={styles.textData}>{userId}</Text></Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.textUserData}>Nome: <Text style={styles.textData}>{name}</Text></Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.textUserData}>Número de celular: <Text style={styles.textData}>{phone}</Text></Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.textUserData}>E-mail: <Text style={styles.textData}>{email}</Text></Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.textUserData}>Senha: <Text style={styles.textData}>{password}</Text></Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.textUserData}>Nível de acesso: <Text style={styles.textData}>{accessLevel}</Text></Text>
          </View>

        </View>

        <View style={styles.btnView}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfile')}
            style={styles.btnEdit}
          >
            <Text style={styles.btnText}>Editar perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => logoutAlert()}
            style={styles.btnLogout}
          >
            <Text style={styles.btnText}>Sair</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  imgProfileView: {
    margin: '7%',
  },

  imgProfile: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },

  textImgProfile: {
    color: '#F5872B',
    paddingLeft: '7%',
    paddingBottom: '4%',
    fontSize: 18,
  },

  row: {
    flexDirection: 'row',
  },

  iconImgProfile: {
    paddingTop: '40%',
    marginLeft: '-5%',
  },

  userData: {
    margin: '7%',
  },

  textUserData: {
    paddingBottom: 10,
    fontSize: 16,
    color: '#F5872B',
  },

  btnLogout: {
    backgroundColor: '#DC3545',
    width: '60%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: 20,
    marginBottom: 40,
  },

  btnEdit: {
    backgroundColor: '#F5872B',
    width: '60%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },

  btnText: {
    color: '#FFF',
    fontSize: 16,
  },

  btnView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  textData: {
    color: '#000',
  }

})