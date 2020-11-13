import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

export default function PaymentFinished({ navigation }) {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [code, setCode] = useState('');

  var user = firebase.auth().currentUser;
  if (user != null) {
    var userId = user.uid;

    database()
      .ref('/users/' + userId + '/name')
      .once('value')
      .then(snapshot => {
        setName(snapshot.val());
      });

    database()
      .ref('/deliveryAddress/' + userId + '/street')
      .once('value')
      .then(snapshot => {
        setStreet(snapshot.val());
      });

    database()
      .ref('/deliveryAddress/' + userId + '/houseNumber')
      .once('value')
      .then(snapshot => {
        setHouseNumber(snapshot.val());
      });

    database()
      .ref('/purchaseCodes/' + userId + '/code')
      .once('value')
      .then(snapshot => {
        setCode(snapshot.val());
      });

  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.textHeader}>Pagamento Realizado!</Text>
        <Image
          source={require('../../assets/payment_options/payment_success.jpg')}
          style={styles.imageHeader}
        />
      </View>

      <View style={styles.content}>

        <View style={styles.title}>
          <Text style={styles.titleInfo}>Informações</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="user" size={25} color="#F5872B" style={styles.icon} />
          <Text style={styles.textInfoRow}>{name}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="shoppingcart" size={25} color="#F5872B" style={styles.icon} />
          <Text style={styles.textInfoRow}>R$ 25,00</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="enviromento" size={25} color="#F5872B" style={styles.icon} />
          <Text style={styles.textInfoRow}>Rua {street}, N.º {houseNumber}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="key" size={25} color="#F5872B" style={styles.icon} />
          <Text style={styles.textInfoRow}>{code}</Text>
        </View>

        <View style={styles.btn}>
          <TouchableOpacity
            style={styles.btnHome}
            onPress={() => navigation.navigate('AdminArea')}
          >
            <Text style={styles.textBtn}>Início</Text>
            <Icon name="home" size={22} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: '#3AB54A',
    height: '40%',
    alignItems: 'center',
  },

  textHeader: {
    color: '#FFF',
    fontSize: 20,
    paddingTop: 25,
    paddingBottom: 25,
  },

  content: {
    backgroundColor: '#EEE',
    height: '70%',
    borderRadius: 20,
    marginTop: '-5%',
  },

  imageHeader: {
    width: 130,
    height: 130,
  },

  titleInfo: {
    color: '#F5872B',
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },

  title: {
    alignItems: 'center',
  },

  icon: {
    padding: '4%',
  },

  infoRow: {
    marginLeft: '6%',
    marginRight: '6%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  textInfoRow: {
    fontSize: 16,
    color: '#8F9195',
  },

  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '12%',
  },

  btnHome: {
    flexDirection: 'row',
    backgroundColor: '#F5872B',
    borderRadius: 50,
    width: '50%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textBtn: {
    color: '#FFF',
    fontSize: 17,
    paddingRight: 5,
  },


})