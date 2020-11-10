import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function PaymentOptions({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Icon
          name="left"
          size={25}
          color="#F5872B"
          onPress={() => { navigation.navigate('DeliveryAddress') }}
          style={styles.iconHeader}
        />
        <Text style={styles.textHeader}>Forma de pagamento</Text>
      </View>

      <ScrollView>

        <Text style={styles.subTextHeader}>Selecione a forma de pagamento:</Text>

        <View style={styles.section1}>
          <Text style={styles.textTitle}>Cartão Bancário</Text>
          <Image
            source={require('../../assets/payment_options/bank_card.png')}
            style={styles.image}
          />
          <TouchableOpacity
            onPress={() => { navigation.navigate('RegisterCard') }}
            style={styles.btn}
          >
            <Text style={styles.textBtn}>Selecionar</Text>
            <Icon name="creditcard" size={22} color="#F5872B" />
          </TouchableOpacity>
        </View>

        <View style={styles.section2}>
          <Text style={styles.textTitle}>Escanear Código</Text>
          <Image
            source={require('../../assets/payment_options/scan_code.png')}
            style={styles.image}
          />
          <TouchableOpacity
            onPress={() => { navigation.navigate('ScanCode') }}
            style={styles.btn}
          >
            <Text style={styles.textBtn}>Selecionar</Text>
            <Icon name="barcode" size={22} color="#F5872B" />
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

  section1: {
    backgroundColor: '#eee',
    marginTop: '10%',
    marginLeft: '10%',
    marginRight: '10%',
    alignItems: 'center',
    borderRadius: 15,
  },

  section2: {
    backgroundColor: '#eee',
    marginTop: '10%',
    marginBottom: '15%',
    marginLeft: '10%',
    marginRight: '10%',
    alignItems: 'center',
    borderRadius: 15,
  },

  image: {
    width: 200,
    height: 150,
  },

  textTitle: {
    color: "#F5872B",
    fontSize: 17,
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: 'bold',
  },

  btn: {
    backgroundColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textBtn: {
    color: "#F5872B",
    fontSize: 17,
    textDecorationLine: 'underline',
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 15,
  },

})