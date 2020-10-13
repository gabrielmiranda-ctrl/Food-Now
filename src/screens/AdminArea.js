import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function AdminArea({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ÁREA DO ADMIN</Text>
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