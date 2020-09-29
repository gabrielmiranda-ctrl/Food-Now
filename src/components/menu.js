import React, { Component } from 'react';
import { View, Image, ScrollView, StyleSheet,Text, Dimensions } from 'react-native';
//import Bottom Navigation
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

//telas
import Profile from './Profile';
import MenuOptions from './MenuOptions';
import Bag from './Bag';

//menu navigation
const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home:{
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        activeColor: '#fff',
        inactiveColor: '#fff',
        barStyle: { backgroundColor: '#f5872b'},
        tabBarIcon:()=>(
          <View>
            <Icon name={'home'} size={27} style={{color: '#fff'}} />
          </View>
        )
      }
    },

    MenuOptions:{
      screen: MenuOptions,
      navigationOptions: {
        tabBarLabel: 'Menu',
        activeColor: '#fff',
        inactiveColor: '#000000',
        barStyle: { backgroundColor: '#f5872b'},
        tabBarIcon:()=>(
          <View>
            <Icon name={'th-large'} size={27} style={{color: '#fff'}} />
          </View>
        )
      }
    },

    Bag:{
      screen: Bag,
      navigationOptions: {
        tabBarLabel: 'Carrinho',
        activeColor: '#fff',
        inactiveColor: '#000000',
        barStyle: { backgroundColor: '#f5872b'},
        tabBarIcon:()=>(
          <View>
            <Icon name={'shopping-cart'} size={27} style={{color: '#fff'}} />
          </View>
        )
      }
    },

    Profile:{
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Perfil',
        activeColor: '#fff',
        inactiveColor: '#000000',
        barStyle: { backgroundColor: '#f5872b'},
        tabBarIcon:()=>(
          <View>
            <Icon name={'user'} size={27} style={{color: '#fff'}} />
          </View>
        )
      }
    },
  }
);

export default createAppContainer(TabNavigator);

