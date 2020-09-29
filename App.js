import * as React from 'react';
import { View, StyleSheet,} from 'react-native';
import Descriptions from './src/screens/Descriptions';

export default function App() {
    return (
            <View style={styles.container}>
                <Descriptions/>
            </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
