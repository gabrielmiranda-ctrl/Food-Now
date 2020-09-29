import * as React from 'react';
import { Text, View, StyleSheet} from 'react-native';

export default function HeaderTitle() {
  return(
    <View style={styles.header}>
      
      <Text style={styles.title}>Promoções</Text>
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
    marginTop: 5,
  },
  title: {
    paddingLeft: 10,
    marginBottom: 15,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#525563',
  },
});