import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ClientArea({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ÁREA DO CLIENTE</Text>
      <Button
        title="Ir para perfil"
        onPress={() => navigation.navigate('UserProfile')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    paddingBottom: 50,
  }
})
