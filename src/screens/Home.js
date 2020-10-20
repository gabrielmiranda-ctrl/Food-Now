import React from 'react';
import { View, Image, ScrollView, StyleSheet, Text, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
//Components
import HeaderTitle from '../components/HeaderTitle';

//setando tamanho
const { width } = Dimensions.get("window");
const height = width * 0.6; //60%

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import { FirebaseDatabaseTypes } from '@react-native-firebase/database';

export default function Home({ navigation }) {
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

  return (
    <View style={style.container}>
      {/* <TabNavigator /> */}
      <ScrollView>
        <Icon name={'angle-left'} onPress={() => logoutAlert()} size={24} color="#555" />

        <View style={style.name}>
          <Text style={style.nameUser}>
            Olá,
          </Text>
          <Text style={style.questUser}>
            O que você quer comer?
          </Text>
        </View>
        <View style={style.contact}>
          <View style={style.circle}>
            <View style={style.inner}>
              <View style={style.circleIcon}>
                <Icon name={'map-marker'} size={35} style={style.icon} />
              </View>
            </View>
          </View>

          <View style={style.circle}>
            <View style={style.inner}>
              <View style={style.circleIcon}>
                <Icon name={'envelope'} size={35} style={style.icon} />
              </View>
            </View>
          </View>

          <View style={style.circle}>
            <View style={style.inner}>
              <View style={style.circleIcon}>
                <Icon name={'phone'} size={35} style={style.icon} />
              </View>
            </View>
          </View>

          <View style={style.circle}>
            <View style={style.inner}>
              <View style={style.circleIcon}>
                <Icon name={'comment'} size={35} style={style.icon} />
              </View>
            </View>
          </View>
        </View>

        <View style={style.boxTitle}>
          <HeaderTitle />
        </View>

        <View stytle={{ height: 130, marginTop: 20, paddingLeft: 15, paddingRight: 15 }}>
          <ScrollView paginEnabled horizontal showsHorizontalScrollIndicator={false} style={style.scroll}>

            <View style={style.boxProducts}>
              <View style={{ flex: 2 }}>
                <Image
                  source={require('../../assets/Menu/ExecutivoCoxa.jpg')}
                  style={style.ImageProducts}>
                </Image>
              </View>
              <View style={style.TextProducts}>
                <Text style={style.NameProducts}>Executivo Coxa</Text>
                <Text style={style.descriptionMenu}>Arroz, fritas, feijão, alface, cenoura, tomate, coxa de frango grelhada</Text>
                <Text style={style.valueMenu}>R$ 25,00</Text>
                <Text style={style.valueMenuValid}>R$ 20,00</Text>
              </View>
            </View>

            <View style={style.boxProducts}>
              <View style={{ flex: 2 }}>
                <Image
                  source={require('../../assets/Menu/MousseMaracuja.jpg')}
                  style={style.ImageProducts}>
                </Image>
              </View>
              <View style={style.TextProducts}>
                <Text style={style.NameProducts}>Mousse de Maracujá</Text>
                <Text style={style.descriptionMenu}>Mousse de Maracujá com cobertura de chocolate</Text>
                <Text style={style.valueMenu}>R$ 8,50</Text>
                <Text style={style.valueMenuValid}>R$ 5,50</Text>
              </View>
            </View>

            <View style={style.boxProducts}>
              <View style={{ flex: 2 }}>
                <Image
                  source={require('../../assets/Menu/CaipirinhaMorango.jpg')}
                  style={style.ImageProducts}>
                </Image>
              </View>
              <View style={style.TextProducts}>
                <Text style={style.NameProducts}>Caipirinha de Morango</Text>
                <Text style={style.descriptionMenu}>Caipinha de Morango de Vodka Orloff</Text>
                <Text style={style.valueMenu}>R$ 13,50</Text>
                <Text style={style.valueMenuValid}>R$ 10,50</Text>
              </View>
            </View>

            <View style={style.boxProducts}>
              <View style={{ flex: 2 }}>
                <Image
                  source={require('../../assets/Menu/SaladaFrutas.jpg')}
                  style={style.ImageProducts}>
                </Image>
              </View>
              <View style={style.TextProducts}>
                <Text style={style.NameProducts}>Salada de Frutas</Text>
                <Text style={style.descriptionMenu}>Morango, Laranja, Abacaxi, Manga, Kiwi, Amora</Text>
                <Text style={style.valueMenu}>R$ 18,50</Text>
                <Text style={style.valueMenuValid}>R$ 15,00</Text>
              </View>
            </View>

          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width,
  },

  // Bem vindo User
  name: {
    paddingTop: 30,
    paddingLeft: 15,
  },
  nameUser: {
    fontWeight: 'bold',
    fontSize: 45,
    color: '#525563',
  },
  questUser: {
    fontSize: 20,
    color: '#919190',
  },
  scroll: {
    width: '100%',
  },
  image: {
    width,
    height: 250,
    resizeMode: 'cover'
  },
  pagination: {
    marginTop: -20,
    flexDirection: 'row',
    bottom: 0,
    alignSelf: 'center'
  },
  pagingText: {
    fontSize: (width / 30),
    color: '#888',
    margin: 3,
  },
  pagingActiveText: {
    fontSize: (width / 30),
    color: '#fff',
    margin: 3,
  },

  //Products
  boxProducts: {
    height: 350,
    width: 250,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
    borderWidth: 0.5,
    borderRadius: 8,
    backgroundColor: '#eee',
    borderColor: '#dddddd'
  },
  ImageProducts: {
    width: '100%',
    height: '80%',
    borderWidth: 5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  TextProducts: {
    marginTop: -35,
    flex: 1,
    paddingLeft: 10,
  },
  NameProducts: {
    paddingLeft: 10,
    fontWeight: 'bold',
    color: '#f5872b',
    fontSize: 22,
  },
  descriptionMenu: {
    paddingLeft: 10,
    paddingTop: 10,
    height: 45,
    textAlign: 'justify',
    width: '90%',
    color: '#919190',
  },
  valueMenu: {
    paddingTop: 10,
    paddingLeft: 10,
    textDecorationLine: 'line-through',
    color: '#d2d2d2',
  },
  valueMenuValid: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 2,
    paddingLeft: 10,
    color: '#f5872b',
  },

  //contato
  contact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    marginTop: 50,
    margin: '3%',
  },
  circleIcon: {
    backgroundColor: 'rgba(245, 135, 42, 0.25)',
    width: 65,
    height: 65,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    opacity: 1,
    color: '#f5872b',
  }
});
