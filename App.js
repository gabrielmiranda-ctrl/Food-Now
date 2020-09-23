import  React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import Home from './src/screens/Home';

export default function App() {
    return (
            <View style={styles.container}>
                <Home/>
            </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
