import React, { Component } from 'react';
import { View, Image, ScrollView, StyleSheet, Text, Button } from 'react-native';
import NumericInput from 'react-native-numeric-input'
export default class Descriptions extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.img}>
          <Image source={require('../../assets/Menu/ExecutivoCoxa.jpg')} style={styles.ImageProducts} />
        </View>
        <View style={styles.descriptionProduct}>
          <Text style={styles.titleProduct}>Executivo Coxa</Text>
          <Text style={styles.valueMenu}>R$ 25,00</Text>
          <Text style={styles.valueMenuValid}>R$ 20,00</Text>
          <NumericInput
            totalWidth={100}
            totalHeight={35}
            iconSize={25}
            step={1}
            minValue={0}
            maxValue={25}
            valueType='real'
            rounded
            textColor='#f5872b'
            iconStyle={{ color: 'white' }}
            rightButtonBackgroundColor='#f5872b'
            leftButtonBackgroundColor='#f5872b'
          />
          <Text style={styles.descriptions}>Uma refeição completa, com Arroz, fritas, feijão, alface, cenoura, tomate, coxa de frango grelhada</Text>
          <View style={styles.buttonBag}>
            <Button
              title="Adicionar a Sacola"
              color="#f5872b"
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  scroll: {
    width: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  //Products
  img: {
    width: '100%',
    height: '100%',
  },
  ImageProducts: {
    width: '100%',
    height: '45%',
  },
  descriptionProduct: {

    paddingVertical: 35,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderColor: '#fff',
    marginTop: -40,
    borderWidth: 5,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  titleProduct: {
    paddingBottom: 10,
    fontWeight: 'bold',
    color: '#f5872b',
    fontSize: 35,
  },
  descriptions: {
    marginTop: 15,
    textAlign: 'justify',
    color: '#919190',
  },
  valueMenu: {
    textDecorationLine: 'line-through',
    color: '#d2d2d2',
    fontSize: 15,
  },
  valueMenuValid: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#f5872b',
    marginBottom: 15,
  },
  buttonBag: {
    width: 150,
  }
});