import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  useWindowDimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Button,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";

export default function Restaurants() {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const windowFontScale = useWindowDimensions().fontScale;
  const windowScale = useWindowDimensions().scale;

  var res_name = "Gazebo 1";

  const menu = [
    { items: "A1", price: "B1", pic: require("../../assets/dp.png") },
    { items: "A2", price: "B2", pic: require("../../assets/dp.png") },
    { items: "A3", price: "B3", pic: require("../../assets/dp.png") },
    { items: "A4", price: "B4", pic: require("../../assets/dp.png") },
    { items: "A5", price: "B5", pic: require("../../assets/dp.png") },
    { items: "A6", price: "B6", pic: require("../../assets/dp.png") },
    { items: "A7", price: "B7", pic: require("../../assets/dp.png") },
    { items: "A8", price: "B8", pic: require("../../assets/dp.png") },
    { items: "A9", price: "B9", pic: require("../../assets/dp.png") },
    { items: "A10", price: "B10", pic: require("../../assets/dp.png") },
  ];

  const renderItem = ({ item }) => (
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
      <Image
        source={item.pic}
        style={{ height: 55, width: 55, borderRadius: 10 }}
      />
      <View style={{ padding: 10 }}>
        <Text>Name: {item.items}</Text>
        <Text>price: {item.price}</Text>
      </View>
      <View style={{ marginLeft: "auto" }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: "black",
            alignItems: "center",
            borderRadius: 3,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Pressable
            onPress={() => {
              console.log(item.items);
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "900",
                paddingVertical: 0,
                paddingHorizontal: 10,
                color: "#ad8840",
              }}
            >
              +
            </Text>
          </Pressable>
          <Text style={{ fontWeight: "bold" }}>qty</Text>
          <Pressable
            onPress={() => {
              console.log(item.items);
            }}
          >
            <Text
              style={{
                fontSize: 35,
                fontWeight: "900",
                paddingVertical: 0,
                paddingHorizontal: 10,
                color: "#ad8840",
              }}
            >
              -
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={
          {
            // backgroundColor: "#f3f5f9",
          }
        }
      >
        <View>
          <StatusBar backgroundColor="#ad8840" />
          <View>
            {
              <Image
                style={{
                  width: windowWidth,
                  resizeMode: "cover",
                  position: "absolute",
                }}
                source={require("../../assets/backdrop.jpeg")}
              />
            }
            <View>
              {
                <Image
                  style={{
                    width: 150,
                    height: 150,
                    resizeMode: "contain",
                    top: "100%",
                    left: "50%",
                    marginTop: -5,
                    marginLeft: -70,
                  }}
                  source={require("../../assets/dp1.png")}
                />
              }
            </View>
          </View>
          <View
            style={{
              marginTop: 150,
              padding: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontSize: 25,
              }}
            >
              {res_name}
            </Text>
          </View>

          <View style={{ height: windowHeight, padding: 5 }}>
            <FlatList
              data={menu}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
