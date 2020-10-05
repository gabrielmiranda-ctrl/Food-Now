import * as React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Header() {
  async function teste() {
    alert("dasdadasdsa")
  }
  return (
    <View style={styles.header}>
      <Icon name={'chevron-left'} onPress={() => teste()} size={24} color="#555" />
      <Text style={styles.title}>Cardápio</Text>
      <View style={styles.search}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    margin: 5,
    marginTop: 15,
  },
  title: {
    marginTop: 15,
    marginBottom: 8,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#f5872b',
  },
});
