import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Welcome({ navigation }) {
  return (
    <View style={styles.welcome}>
      <Text style={styles.textWelcome}>Clique para acessar nosso aplicativo.</Text>
      <Button
        title="Iniciar"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textWelcome: {
    fontSize: 15,
    marginBottom: 20,
  },
})