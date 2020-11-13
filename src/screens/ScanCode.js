import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

export default function ScanCode({ navigation }) {

  const scanner = useRef(null);
  const [code, setCode] = useState('');
  const [scan, setScan] = useState(true);
  const [result, setResult] = useState(null);
  const [purchaseCode, setPurchaseCode] = useState('');

  useEffect(() => {
    setResult(null);
  }, [])

  const onSuccess = e => {
    setResult(e);
    setScan(false);

    var user = firebase.auth().currentUser;
    if (user != null) {
      var userId = user.uid;

      // Gerar código aleatório de compra.
      var length = 5;
      var result = '';
      var characters = '0123456789';
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

      console.log("TIPO: " + e.type + "\n" + "VALOR: " + e.data);
      Alert.alert("Atenção", "O escaneamento foi feito com sucesso!" + '\n' + "Seu código de compra é: " + result)
    }
  };

  function checkCode(code) {
    if (code === '' || code === null) {
      alert('Este campo tem que ser preenchido.');
    }
    else {
      var user = firebase.auth().currentUser;
      if (user != null) {
        var userId = user.uid;

        // Pegando os dados do usuário no banco de dados.
        database()
          .ref('/purchaseCodes/' + userId + '/code/')
          .once('value')
          .then(snapshot => {
            setPurchaseCode(snapshot.val());
          });

        if (purchaseCode === code) {
          navigation.navigate('PaymentFinished')
        }
        else {
          alert('O código que você inseriu está incorreto!');
        }
      }
    }
  }

  return !scan ? (
    <View style={styles.container}>

      <View style={styles.header}>
        <Icon
          name="left"
          size={25}
          color="#F5872B"
          onPress={() => { navigation.navigate('PaymentOptions') }}
          style={styles.iconHeader}
        />
        <Text style={styles.textHeader}>Finalizar compra</Text>
      </View>

      <View style={styles.title}>
        <Text style={styles.textTitle}>Insira no campo abaixo o código gerado ao escanear.</Text>
      </View>

      <View style={styles.codeInfo}>
        <TextInput
          style={styles.inputCode}
          placeholder="Código de compra"
          keyboardType="numeric"
          autoCorrect={false}
          maxLength={5}
          onChangeText={code => setCode(code)}
          value={code}
        />
      </View>

      <View style={styles.btn}>
        <TouchableOpacity
          style={styles.btnSubmit}
          onPress={() => checkCode(code)}
        >
          <Text style={styles.textBtn}>Enviar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btn}>
        <TouchableOpacity
          style={styles.btnScan}
          onPress={() => setScan(true)}
        >
          <Text style={styles.textBtnScan}>Escanear</Text>
          <Icon name="camerao" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>

    </View>
  ) : (
      <QRCodeScanner
        onRead={onSuccess}
        ref={scanner}
        reactivate={true}
        showMarker={true}
        bottomContent={
          <>
            <TouchableOpacity style={styles.buttonTouchableStop} onPress={() => setScan(false)} >
              <Text style={styles.buttonText}>PARAR</Text>
            </TouchableOpacity>
          </>
        }
      />
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

  title: {
    marginLeft: '8%',
    marginRight: '8%',
    marginTop: '6%',
    marginBottom: '6%',
  },

  textTitle: {
    color: '#5F6368',
    fontSize: 16,
  },

  btn: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnSubmit: {
    backgroundColor: '#F5872B',
    width: '50%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: 20,
    marginBottom: 30,
  },

  textBtn: {
    color: '#FFFFFF',
    fontSize: 18,
  },

  btnScan: {
    backgroundColor: '#006100',
    width: '60%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginTop: 100,
    marginBottom: 30,
    flexDirection: 'row',
  },

  textBtnScan: {
    color: '#FFFFFF',
    fontSize: 18,
    paddingRight: 10,
  },

  codeInfo: {
    paddingLeft: '8%',
  },

  inputCode: {
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

  buttonText: {
    fontSize: 21,
    color: '#F5872B'
  },

  buttonTouchableStop: {
    padding: 16,
    marginTop: '15%',
  }
});