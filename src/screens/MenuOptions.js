import React, { Component } from 'react';
import { View, StyleSheet, StatusBar} from 'react-native';
import Header from '../components/Header';
import Products from '../components/Products';


export default class MenuOptions extends Component {
  render(){
    return (
          <View>
            <StatusBar backgroundColor="#f5872b"/>
            <Header/>
            <Products/>
        </View>
    );
  }   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    width: '50%',
    height: '50%',
  },
  inner: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
