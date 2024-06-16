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
  KeyboardAvoidingView,
  Switch,
  Platform,
} from "react-native";
import { DataTable } from "react-native-paper";

export default function App() {
  //id is the decoded form of the item id stores in the database. data base will have id as resname+itemid and id will be the itemid
  //thus making id unique as well as easy to predict.
  const [Menu, setMenu] = useState([
    { id: "1", name: "Item 1", price: 10, status: true },
    { id: "2", name: "Item 2", price: 15, status: false }, //from api
    { id: "3", name: "Item 3", price: 20, status: true },
  ]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const toggleSwitch = (id) => {
    setMenu((prevMenu) =>
      prevMenu.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  addItems = () => {
    let id = String(parseInt(Menu.at(-1).id) + 1);
    let newItem = {
      id: id,
      name: name,
      price: price,
      status: true,
    };
    let tempMenu = Menu;
    tempMenu.push(newItem);
    console.log(newItem);
    setMenu(tempMenu);
    console.log(Menu);
  };

  const renderItem = ({ item }) => (
    <>
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
              width: "100%",
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
            <Text>Item {item.name}</Text>
            <Text>Price {item.price}</Text>
          </View>
          <View style={{ padding: 10, position: "absolute", right: 0 }}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={item.status ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                toggleSwitch(item.id);
              }}
              value={item.status}
            />
          </View>
        </View>
      </Pressable>
    </>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#ad8840" />
        <View style={styles.container}>
          <View
            style={[
              styles.topView,
              { flexDirection: "row", justifyContent: "space-around" },
            ]}
          >
            <Text
              style={{
                fontSize: 28,
                textAlign: "center",
              }}
            >
              Edit Menu
            </Text>
            <View>
              <TouchableOpacity
                styles={{
                  height: 40,
                  backgroundColor: "#ffbf00",
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 25,
                  justifyContent: "center",
                }}
              >
                <Text>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View>
              <FlatList
                data={Menu}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={{ padding: 2 }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 10,
                marginTop: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Text style={styles.lable}>Item</Text>
                <TextInput
                  style={[styles.input, { height: 40, width: 150 }]}
                  onChangeText={setName}
                  value={name}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Text style={styles.lable}>Price</Text>
                <TextInput
                  style={[styles.input, { height: 40, width: 100 }]}
                  onChangeText={setPrice}
                  value={price}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 40,
                    backgroundColor: "#ffbf00",
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 10,
                    marginTop: 25,
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    addItems();
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 15,
                      width: 100,
                    }}
                  >
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
    color: "black",
  },
  lable: {
    fontSize: 18,
    color: "black",
    alignItems: "center",
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
