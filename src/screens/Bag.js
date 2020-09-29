import React from 'react';
import { View, Text, Button } from "react-native";


export default ({ history }) => (
  <View>
    <Text>BAG</Text>
    <Button title="Vai para description" onPress={() => history.push("/Description")} />
  </View>
);