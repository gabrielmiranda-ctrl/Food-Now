import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

export default function DeliveryAddress({ navigation }) {

  const [street, setStreet] = useState('');
  const [district, setDistrict] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  function updateAddress(street, district, houseNumber, city, state) {
    if (street === '' || street === null && district === '' || district === null && houseNumber === '' || houseNumber === null && city === '' || city === null && state === '' || state === null) {
      alert('Todos os campos devem ser preenchidos.');
    }
    else if (street === '' || street === null) {
      alert('O campo de rua tem que ser preenchido.');
    }
    else if (district === '' || district === null) {
      alert('O campo de bairro tem que ser preenchido.');
    }
    else if (houseNumber === '' || houseNumber === null) {
      alert('O campo de número tem que ser preenchido.');
    }
    else if (city === '' || city === null) {
      alert('O campo de cidade tem que ser preenchido.');
    }
    else if (state === '' || state === null) {
      alert('O campo de estado tem que ser preenchido.');
    }
    else {
      var user = firebase.auth().currentUser;
      if (user != null) {
        var userId = user.uid;

        database()
          .ref('deliveryAddress/' + userId)
          .set({
            street: street,
            district: district,
            houseNumber: houseNumber,
            city: city,
            state: state,
          })
          .then(() => {
            console.log('Endereço cadastrado com sucesso.');
            navigation.navigate('PaymentOptions')
          });
      }
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Icon
          name="left"
          size={25}
          color="#F5872B"
          onPress={() => { navigation.navigate('AdminArea') }}
          style={styles.iconHeader}
        />
        <Text style={styles.textHeader}>Cadastrar endereço</Text>
      </View>

      <ScrollView>

        <Text style={styles.subTextHeader}>Insira um endereço válido nos campos abaixo.</Text>

        <View style={styles.infoStreet}>
          <TextInput
            style={styles.inputStreet}
            placeholder="Rua"
            autoCorrect={false}
            onChangeText={street => setStreet(street)}
            value={street}
          />
        </View>

        <View style={styles.infoRow}>
          <TextInput
            style={styles.inputRow1}
            placeholder="Bairro"
            autoCorrect={false}
            onChangeText={district => setDistrict(district)}
            value={district}
          />

          <TextInput
            style={styles.inputRow2}
            placeholder="Número"
            autoCorrect={false}
            keyboardType="numeric"
            onChangeText={houseNumber => setHouseNumber(houseNumber)}
            value={houseNumber}
          />
        </View>

        <View style={styles.info}>
          <TextInput
            style={styles.input}
            placeholder="Cidade"
            autoCorrect={false}
            onChangeText={city => setCity(city)}
            value={city}
          />
        </View>

        <View style={styles.infoStreet}>
          <TextInput
            style={styles.input}
            placeholder="Estado"
            autoCorrect={false}
            onChangeText={state => setState(state)}
            value={state}
          />
        </View>

        <View style={styles.btn}>
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => { updateAddress(street, district, houseNumber, city, state) }}
          >
            <Text style={styles.submitText}>Continuar</Text>
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

  header: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
  },

  iconHeader: {
    margin: '4%',
  },

  textHeader: {
    color: "#F5872B",
    fontSize: 20,
    marginTop: '4%',
    marginBottom: '4%',
    marginLeft: '2%',
  },

  subTextHeader: {
    color: '#5F6368',
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: '7%',
  },

  inputStreet: {
    backgroundColor: '#FFFFFF',
    width: '70%',
    marginBottom: '12%',
    color: '#222222',
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomColor: '#F5872B',
    borderBottomWidth: 2,
    marginLeft: '7%',
    marginTop: '5%',
  },

  input: {
    backgroundColor: '#FFFFFF',
    width: '70%',
    marginBottom: '12%',
    color: '#222222',
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomColor: '#F5872B',
    borderBottomWidth: 2,
    marginLeft: '7%',
  },

  infoRow: {
    flexDirection: 'row',
  },

  inputRow1: {
    backgroundColor: '#FFFFFF',
    width: '40%',
    marginBottom: '12%',
    color: '#222222',
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomColor: '#F5872B',
    borderBottomWidth: 2,
    marginLeft: '7%',
  },

  inputRow2: {
    backgroundColor: '#FFFFFF',
    width: '23%',
    marginBottom: '12%',
    color: '#222222',
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomColor: '#F5872B',
    borderBottomWidth: 2,
    marginLeft: '7%',
  },

  btnSubmit: {
    backgroundColor: '#F5872B',
    width: '60%',
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

})