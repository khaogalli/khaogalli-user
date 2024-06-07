import React, { useState } from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import { DataTable } from "react-native-paper";

export default function App() {
  const [menu, setMenu] = useState([]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Set Menu</Text>
      </View>
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Item Name</DataTable.Title>
            <DataTable.Title>Price</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>
              <TextInput></TextInput>
            </DataTable.Cell>
            <DataTable.Cell>
              <TextInput></TextInput>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    </SafeAreaView>
  );
}
