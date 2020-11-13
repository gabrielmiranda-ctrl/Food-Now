import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { Picker } from '@react-native-community/picker';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

export default function RegisterCard({ navigation }) {

  const [cardType, setCardType] = useState("credit");
  const [numCard, setNumCard] = useState('');
  const [validity, setValidity] = useState('');
  const [cvv, setCvv] = useState('');
  const [holderName, setHolderName] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');

  function registerCard(cardType, numCard, validity, cvv, holderName, documentNumber) {
    if (numCard === '' || numCard === null && validity === '' || validity === null && cvv === '' || cvv === null && holderName === '' || holderName === null && documentNumber === '' || documentNumber === null) {
      alert('Todos os campos devem ser preenchidos.');
    }
    else if (numCard === '' || numCard === null) {
      alert('O campo de número do cartão tem que ser preenchido.');
    }
    else if (validity === '' || validity === null) {
      alert('O campo de validade tem que ser preenchido.');
    }
    else if (cvv === '' || cvv === null) {
      alert('O campo de CVV tem que ser preenchido.');
    }
    else if (holderName === '' || holderName === null) {
      alert('O campo de nome do titular tem que ser preenchido.');
    }
    else if (documentNumber === '' || documentNumber === null) {
      alert('O campo de CPF/CNPJ tem que ser preenchido.');
    }
    else {

      Alert.alert(
        "Finalizar Pagamento",
        "Você deseja realizar o pagamento?",
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => finished()
          }
        ],
        { cancelable: false }
      );

      const finished = () => {

        var user = firebase.auth().currentUser;
        if (user != null) {
          var userId = user.uid;

          // Gerar código aleatório de compra.
          var length = 10;
          var result = '';
          var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          var charactersLength = characters.length;
          for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }

          database()
            .ref('purchaseCodes/' + userId)
            .set({
              code: result,
            })
            .then(() => {
              console.log('Código de compra cadastrado com sucesso.');
            });

          database()
            .ref('bankCards/' + userId)
            .set({
              cardType: cardType,
              numCard: numCard,
              validity: validity,
              cvv: cvv,
              holderName: holderName,
              documentNumber: documentNumber,
            })
            .then(() => {
              console.log('Cartão cadastrado com sucesso.');
              navigation.navigate('PaymentFinished')
            });
        }
      }
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <AntDesign
          name="left"
          size={25}
          color="#F5872B"
          onPress={() => { navigation.navigate('PaymentOptions') }}
          style={styles.iconHeader}
        />
        <Text style={styles.textHeader}>Opções de cartão</Text>
      </View>

      <ScrollView>

        <View style={styles.flags}>
          <Text style={styles.textFlags}>Suportamos as bandeiras: </Text>
          <View style={styles.flagsIcons}>
            <FontAwesome name="cc-visa" size={25} color="#F5872B" style={styles.iconFlag} />
            <FontAwesome name="cc-mastercard" size={25} color="#F5872B" style={styles.iconFlag} />
            <FontAwesome name="cc-paypal" size={25} color="#F5872B" style={styles.iconFlag} />
            <FontAwesome name="cc-discover" size={25} color="#F5872B" style={styles.iconFlag} />
            <FontAwesome name="cc-amex" size={25} color="#F5872B" style={styles.iconFlag} />
            <FontAwesome name="cc-stripe" size={25} color="#F5872B" style={styles.iconFlag} />
          </View>
        </View>

        <View style={styles.inputs}>

          <View style={styles.typeCard}>
            <Text style={styles.textTypeCard}>Tipo do cartão</Text>
            <Picker
              selectedValue={cardType}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setCardType(itemValue)}
            >
              <Picker.Item label="Crédito" value="credit" />
              <Picker.Item label="Débito" value="debit" />
            </Picker>
          </View>

          <View style={styles.holder}>
            <TextInput
              style={styles.inputHolder}
              placeholder="Número do cartão"
              autoCorrect={false}
              keyboardType='numeric'
              maxLength={20}
              onChangeText={numCard => setNumCard(numCard)}
              value={numCard}
            />
          </View>

          <View style={styles.row}>
            <TextInput
              style={styles.rowInputCard1}
              placeholder="Validade"
              autoCorrect={false}
              keyboardType='phone-pad'
              maxLength={5}
              onChangeText={validity => setValidity(validity)}
              value={validity}
            />

            <TextInput
              style={styles.rowInputCard2}
              placeholder="CVV"
              autoCorrect={false}
              keyboardType='numeric'
              maxLength={4}
              onChangeText={cvv => setCvv(cvv)}
              value={cvv}
            />
          </View>

          <View style={styles.holder}>
            <TextInput
              style={styles.inputHolder}
              placeholder="Nome do titular"
              autoCorrect={false}
              onChangeText={holderName => setHolderName(holderName)}
              value={holderName}
            />
          </View>

          <View style={styles.holder}>
            <TextInput
              style={styles.inputHolder}
              placeholder="CPF/CNPJ"
              autoCorrect={false}
              keyboardType='numeric'
              maxLength={14}
              onChangeText={documentNumber => setDocumentNumber(documentNumber)}
              value={documentNumber}
            />
          </View>

          <View style={styles.btn}>
            <TouchableOpacity
              style={styles.btnSubmit}
              onPress={() => registerCard(cardType, numCard, validity, cvv, holderName, documentNumber)}
            >
              <Text style={styles.submitText}>Finalizar Pagamento</Text>
              <Entypo name="credit" size={22} color="#FFF" />
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
    backgroundColor: "#FFF",
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

  flags: {
    alignItems: 'center',
  },

  textFlags: {
    fontSize: 16,
    color: '#8F9195',
    paddingTop: 20,
    paddingBottom: 15,
  },

  flagsIcons: {
    flexDirection: 'row',
  },

  iconFlag: {
    paddingRight: 15,
  },

  inputs: {
    marginTop: '15%',
  },

  textTypeCard: {
    color: '#5F6368',
    fontSize: 16,
  },

  typeCard: {
    paddingLeft: '8%',
    marginBottom: '5%',
  },

  picker: {
    height: 50,
    width: 180,
  },

  row: {
    flexDirection: 'row',
    paddingLeft: '8%',
  },

  rowInputCard1: {
    backgroundColor: '#FFFFFF',
    width: '40%',
    marginBottom: '12%',
    marginRight: '10%',
    color: '#222222',
    fontSize: 17,
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomColor: '#F5872B',
    borderBottomWidth: 2,
  },

  rowInputCard2: {
    backgroundColor: '#FFFFFF',
    width: '30%',
    marginBottom: '12%',
    marginRight: '10%',
    color: '#222222',
    fontSize: 17,
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomColor: '#F5872B',
    borderBottomWidth: 2,
  },

  holder: {
    paddingLeft: '8%',
  },

  inputHolder: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    marginBottom: '12%',
    color: '#222222',
    fontSize: 17,
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomColor: '#F5872B',
    borderBottomWidth: 2,
  },

  btnSubmit: {
    backgroundColor: '#F5872B',
    width: '70%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: 20,
    marginBottom: 30,
    flexDirection: 'row',
  },

  submitText: {
    color: '#FFFFFF',
    fontSize: 18,
    paddingRight: 5,
    fontWeight: 'bold',
  },

  btn: {
    alignItems: 'center',
    justifyContent: 'center',
  },

})