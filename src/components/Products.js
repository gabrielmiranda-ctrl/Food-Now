import * as React from 'react';
import { Text, View, StyleSheet, Image, } from 'react-native';

export default function Products(){ 
    return (
              <View style={styles.container}>
                  <View style={styles.box}>
                      <View style={styles.inner}>
                        <Image source={require('../../assets/Menu/CategoriaPratos.jpg')} style={styles.imgMenu}/>
                        <Text style={styles.descriptionMenu}>Pratos</Text>
                        <Text style={styles.numberMenu}>(23)</Text>
                      </View>
                  </View>
               
                  <View style={styles.box}>
                      <View style={styles.inner}>
                        <Image source={require('../../assets/Menu/CategoriaSobremesa.jpg')} style={styles.imgMenu}/>
                        <Text style={styles.descriptionMenu}>Sobremesas</Text>
                        <Text style={styles.numberMenu}>(17)</Text>
                      </View>
                  </View>
  
                  <View style={styles.box}>   
                      <View style={styles.inner}>
                        <Image source={require('../../assets/Menu/CategoriaBebidas.jpg')} style={styles.imgMenu}/>
                        <Text style={styles.descriptionMenu}>Bebidas</Text>
                        <Text style={styles.numberMenu}>(21)</Text>
                      </View>
                  </View>
  
                  <View style={styles.box}>
                      <View style={styles.inner}>
                        <Image source={require('../../assets/Menu/CategoriaPorcoes.jpg')} style={styles.imgMenu}/>
                        <Text style={styles.descriptionMenu}>Porções</Text>
                        <Text style={styles.numberMenu}>(14)</Text>
                      </View>
                  </View>    
              </View>                       
      );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '85%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    width: '50%',
    height: '40%',
    padding: 10,
  },
  inner: {
    flex: 1,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgMenu:{
    width: '100%',
    height: '65%',
    position: 'absolute',
    borderWidth: 5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    top: 0,
    left: 0,
  },  
  descriptionMenu:{
    fontFamily: 'Inter_400Regular',
    position: 'absolute',
    top: 0,
    left: 0,
    marginTop: '78%',
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f5872b',
  },
  numberMenu: {
    fontFamily: 'Inter_400Regular',
    position: 'absolute',
    padding: 10,
    bottom: 0,
    left: 0,
    fontSize: 14,
    color: '#888',
  }
});
