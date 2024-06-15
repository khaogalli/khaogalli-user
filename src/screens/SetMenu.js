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
  Pressable,
} from "react-native";
import { DataTable } from "react-native-paper";

export default function App() {
  const [menu, setMenu] = useState([]);
  const Menu = [
    { id: "1", name: "Item 1", price: 10, status: 1 },
    { id: "2", name: "Item 2", price: 15, status: 0 },
    { id: "3", name: "Item 3", price: 20, status: 1 },
  ];

  const renderItem = ({ item }) => (
    <>
      {item.status ? (
        <Pressable
          onPress={() => {
            console.log(item.OderID);
          }}
        >
          <View
            style={[
              {
                padding: 15,
                marginBottom: 7,
                margin: 2,
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
              },
              {
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              },
            ]}
          >
            <View style={{ padding: 10 }}>
              <Text>Order ID: {item.OderID}</Text>
              <Text> Customer ID: {item.UserID}</Text>
            </View>
            <View style={{ padding: 10, position: "absolute", right: 0 }}>
              <Text>{item.Date}</Text>
              <Text>{item.Time}</Text>
            </View>
          </View>
        </Pressable>
      ) : null}
    </>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Set Menu</Text>
      </View>
      <View style={styles.bottomView}>
        <FlatList
          style={{ width: "100%", marginTop: 5 }}
          data={Menu}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View>
        <TextInput style={styles.input} placeholder="Item Name" />
        <TextInput style={styles.input} placeholder="Price" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  bottomView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },

  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: "black",
    borderWidth: 2,
  },

  center: {
    paddingTop: "40%",
    alignItems: "center",
    backgroundColor: "#f74449",
  },

  h1: {
    paddingTop: 10,
    alignItems: "center",
  },

  input: {
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#431213",
    color: "white",
  },
  lable: {
    fontSize: 18,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingRight: 10,
    fontWeight: "bold",
    marginBottom: 2,
  },
  button1: {
    width: 270,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ffbf00",
    marginTop: 12,
    justifyContent: "center",
  },
  header: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    position: "absolute",
    top: 0,
    left: 0,
    height: 60,
  },
});
