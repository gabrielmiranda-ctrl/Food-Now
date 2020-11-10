import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-community/picker';

export default function RegisterCard({ navigation }) {

  const [cardType, setCardType] = useState("credit");

  return (
    <View style={styles.conatiner}>

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

          <View style={styles.numCard}>
            <Text style={styles.textNumCard}>Número do cartão</Text>
            <TextInput
              style={styles.inputNumCard}
              autoCorrect={false}
              keyboardType='numeric'
              maxLength={20}
            />
          </View>

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

          <View style={styles.row}>
            <TextInput
              style={styles.rowInputCard1}
              placeholder="Validade"
              autoCorrect={false}
              keyboardType='phone-pad'
              maxLength={5}
            />

            <TextInput
              style={styles.rowInputCard2}
              placeholder="CVV"
              autoCorrect={false}
              keyboardType='numeric'
              maxLength={4}
            />
          </View>

          <View style={styles.holder}>
            <TextInput
              style={styles.inputHolder}
              placeholder="Nome do titular"
              autoCorrect={false}
            />
          </View>

          <View style={styles.holder}>
            <TextInput
              style={styles.inputHolder}
              placeholder="CPF/CNPJ"
              autoCorrect={false}
              keyboardType='numeric'
              maxLength={14}
            />
          </View>

          <View style={styles.btn}>
            <TouchableOpacity
              style={styles.btnSubmit}
              // onPress={() => { registerUser(name, phone, email, password, accessLevel) }}
            >
              <Text style={styles.submitText}>Salvar</Text>
            </TouchableOpacity>
          </View>

        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  header: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    width: '100%',
    height: '13%',
  },

  iconHeader: {
    margin: '4%',
  },

  textHeader: {
    color: "#F5872B",
    fontSize: 20,
    margin: '4%',
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

  textNumCard: {
    color: '#5F6368',
    fontSize: 16,
  },

  numCard: {
    paddingLeft: '8%'
  },

  inputNumCard: {
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

  textTypeCard: {
    color: '#5F6368',
    fontSize: 16,
  },

  typeCard: {
    paddingLeft: '8%'
  },

  picker: {
    height: 50,
    width: 180,
  },

  row: {
    flexDirection: 'row',
    paddingLeft: '8%',
    paddingTop: '5%',
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
    width: '60%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: 20,
    marginBottom: 30,
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