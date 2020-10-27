import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';
import storage from '@react-native-firebase/storage';

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

  // Excluir usuário.
  const userDelete = () => {
    var user = firebase.auth().currentUser;

    // Apagando dados do usuário no Authentication.
    user.delete().then(function () {
      const exit = () => {
        navigation.navigate('Login');
      }

      Alert.alert(
        "Sucesso!",
        "O usuário foi excluído. Você será desconectado.",
        [
          {
            text: "OK",
            onPress: () => exit()
          }
        ],
      );

      // Apagando dados do usuário no Realtime Database.
      var userId = user.uid;
      database()
        .ref('/users/' + userId)
        .remove();

      // Apagando dados do usuário no Cloud Storage.
      var imageRef = storage().ref('/profileImages/' + userId + '/image_profile_user');

      imageRef.delete().then(function () {
        console.log('Dados no Cloud Storage deletados com sucesso.');
      }).catch(function (error) {
        console.log(error);
      });

    }).catch(function (error) {
      if (error.code === 'auth/requires-recent-login') {
        Alert.alert(
          'Erro ao excluir!',
          'Para que um usuário seja excluído, é preciso que ele tenha feito o login recentemente. Refaça o login e tente novamente.'
        );
        console.log('Erro! Para que um usuário seja excluído, é preciso que ele tenha feito o login recentemente. Refaça o login e tente novamente.');
      }
      else {
        alert('Erro ao excluir usuário.');
      }
      console.log(error);
    });
  }

  // Confirmação da opção excluir.
  const deleteAlert = () =>
    Alert.alert(
      "Excluir usuário",
      "Você deseja realmente excluir?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => userDelete()
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
  const [photoUrl, setPhotoUrl] = useState('');

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

    database()
      .ref('/users/' + userId + '/photoUrl')
      .once('value')
      .then(snapshot => {
        setPhotoUrl(snapshot.val());
      });
  }

  // Transformando as variáveis para ficarem mais atraentes.
  if (accessLevel === 'admin') {
    var accessLevelData = 'Administrador'
  }

  if (accessLevel === 'client') {
    var accessLevelData = 'Cliente'
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.imgView}>
          <Image
            source={{ uri: photoUrl !== "" ? photoUrl : undefined }}
            style={styles.imgProfile}
          />
        </View>

        <View style={styles.infoHeader}>
          <Text style={styles.textName}>{name}</Text>
          <View style={styles.accessLevelView}>
            <Icon name="ellipsis-v" size={25} color="#FFF" />
            <Text style={styles.textAccessLevel}>{accessLevelData}</Text>
          </View>
          <TouchableOpacity
            style={styles.editPhoto}
            onPress={() => navigation.navigate('EditPhoto')}
          >
            <Text stye={styles.textEditPhoto}>Alterar Foto</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.btn}>
        <TouchableOpacity
          style={styles.btnEdit}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Icon name="pencil" size={25} color="#FFF" />
          <Text style={styles.textBtn}>EDITAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnDelete}
          onPress={() => deleteAlert()}
        >
          <Icon name="trash" size={25} color="#FFF" />
          <Text style={styles.textBtn}>EXCLUIR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.userData}>
        <View style={styles.dataInfo}>
          <Icon name="key" size={25} color="#000" />
          <Text style={styles.textDataId}>{userId}</Text>
        </View>

        <View style={styles.dataInfo}>
          <Icon name="user" size={25} color="#000" />
          <Text style={styles.textDataName}>{name}</Text>
        </View>

        <View style={styles.dataInfo}>
          <Icon name="envelope" size={25} color="#000" />
          <Text style={styles.textDataEmail}>{email}</Text>
        </View>

        <View style={styles.dataInfo}>
          <Icon name="lock" size={25} color="#000" />
          <Text style={styles.textDataPassword}>{password}</Text>
        </View>

        <View style={styles.dataInfo}>
          <Icon name="wrench" size={25} color="#000" />
          <Text style={styles.textDataAccessLevel}>{accessLevelData}</Text>
        </View>

        <View style={styles.dataInfo}>
          <Icon name="phone" size={25} color="#000" />
          <Text style={styles.textDataPhone}>{phone}</Text>
        </View>
      </View>

      <View style={styles.logout}>
        <TouchableOpacity
          onPress={() => logoutAlert()}
          style={styles.btnLogout}
        >
          <Text style={styles.textBtnLogout}>Sair</Text>
          <Icon name="sign-out" size={25} color="#FFF" />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },

  header: {
    backgroundColor: '#343A4A',
    width: '100%',
    height: '30%',
    flexDirection: 'row'
  },

  imgProfile: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },

  imgView: {
    margin: '7%',
  },

  infoHeader: {
    margin: '7%'
  },

  textName: {
    color: '#FFF',
    fontSize: 18,
    paddingBottom: 15
  },

  textAccessLevel: {
    color: '#FFF',
    fontSize: 16,
    paddingLeft: 10,
    justifyContent: 'center',
  },

  accessLevelView: {
    flexDirection: 'row',
  },

  btn: {
    flexDirection: 'row',
    height: '10%'
  },

  btnEdit: {
    backgroundColor: '#F5872B',
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  btnDelete: {
    backgroundColor: '#DC3545',
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  textBtn: {
    color: '#FFF',
    fontSize: 20,
    paddingLeft: 10,
  },

  userData: {
    margin: '7%',
  },

  dataInfo: {
    flexDirection: 'row',
    paddingBottom: 20,
  },

  textDataName: {
    paddingLeft: '8%',
    fontSize: 17,
    color: '#9A958F',
  },

  textDataId: {
    paddingLeft: '6%',
    fontSize: 17,
    color: '#9A958F',
  },

  textDataEmail: {
    paddingLeft: '6%',
    fontSize: 17,
    color: '#9A958F',
  },

  textDataPassword: {
    paddingLeft: '9%',
    fontSize: 17,
    color: '#9A958F',
  },

  textDataAccessLevel: {
    paddingLeft: '6%',
    fontSize: 17,
    color: '#9A958F',
  },

  textDataPhone: {
    paddingLeft: '7%',
    fontSize: 17,
    color: '#9A958F',
  },

  btnLogout: {
    backgroundColor: '#DC3545',
    width: '40%',
    height: '27%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },

  textBtnLogout: {
    color: '#FFF',
    paddingRight: 15,
    fontSize: 17
  },

  logout: {
    alignItems: 'center',
  },

  editPhoto: {
    marginTop: 20,
    backgroundColor: '#FFF',
    width: 110,
    height: 40,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },

})