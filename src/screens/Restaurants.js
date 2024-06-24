import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function Restaurants({ route, navigation }) {
  const windowWidth = useWindowDimensions().width;
  const name = route.params.itemName;
  const username = route.params.username; // to fetch user ID .Uer ID is needed for confirming the order ....

  var cart = {
    //send to BE
    UID: "",
    Res: "",
    Order: [],
  };

  var res_name = name; // api end point
  var user = "userID"; //api end point

  const menu = [
    //api end point
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

  cart.Res = res_name;
  cart.UID = user;

  const [itemlist, setItemList] = useState(
    menu.map((menuItem) => ({ item: menuItem.items, qty: 0 }))
  );

  const qty = (item, op) => {
    setItemList((prevItemList) =>
      prevItemList.map((itemData) =>
        itemData.item === item
          ? {
              ...itemData,
              qty: Math.max(0, itemData.qty + (op === "+" ? 1 : -1)),
            }
          : itemData
      )
    );
    console.log(itemlist);
  };

  const addItem = (itemlist) => {
    const selectedItems = itemlist.filter((itemData) => itemData.qty > 0);
    cart.Order = selectedItems;
    console.log("final cart:");
    console.log(cart);
    navigation.navigate("Summary", { cart });
  };

  const renderItem = ({ item }) => (
    <View style={styles.rows}>
      <Image source={item.pic} style={styles.row_icon} />
      <View style={{ padding: 10 }}>
        <Text>Name: {item.items}</Text>
        <Text>price: {item.price}</Text>
      </View>
      <View style={{ marginLeft: "auto" }}>
        <View style={styles.buttom_con}>
          <TouchableOpacity
            onPress={() => {
              console.log(item.items);
              qty(item.items, "+");
            }}
          >
            <Text style={styles.button_inc}>+</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>
            {itemlist.find((i) => i.item === item.items)?.qty}
          </Text>
          <TouchableOpacity
            onPress={() => {
              console.log(item.items);
              qty(item.items, "-");
            }}
          >
            <Text style={styles.button_dec}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.kba}
        >
          <View>
            <StatusBar backgroundColor="#ad8840" />
            <View>
              {
                <Image
                  style={[
                    styles.primary_bg,
                    {
                      width: windowWidth,
                    },
                  ]}
                  source={require("../../assets/backdrop.jpeg")} 
                />
              }
              <View>
                <Image
                  style={styles.secondary_dp}
                  source={require("../../assets/dp1.png")} // fetched from api.
                />
              </View>
            </View>
            <View style={styles.h1view}>
              <Text style={styles.h1}>{res_name}</Text>
            </View>

            <View style={{ padding: 5 }}>
              <FlatList
                data={menu}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                scrollToEnd={true}
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              addItem(itemlist);
            }}
          >
            <View style={styles.confirmOrderView}>
              <Text style={styles.confirmOrderText}>Confirm Order</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  kba: {
    backgroundColor: "#f3f5f9",
  },
  h1: {
    color: "black",
    textAlign: "center",
    fontSize: 25,
  },
  h1view: {
    marginTop: 150,
    padding: 10,
    alignItems: "center",
  },
  secondary_dp: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    top: "100%",
    left: "50%",
    marginTop: -5,
    marginLeft: -70,
  },
  primary_bg: {
    resizeMode: "cover",
    position: "absolute",
  },
  rows: [
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
  ],
  row_icon: { height: 55, width: 55, borderRadius: 10 },
  buttom_con: {
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    borderRadius: 3,
    display: "flex",
    flexDirection: "row",
  },
  button_inc: {
    fontSize: 20,
    fontWeight: "900",
    paddingVertical: 0,
    paddingHorizontal: 10,
    color: "#ad8840",
  },
  qty: { fontWeight: "bold", color: "red" },
  button_dec: {
    fontSize: 25,
    fontWeight: "900",
    paddingVertical: 0,
    paddingHorizontal: 10,
    color: "#ad8840",
  },
  confirmOrderView: {
    height: 50,
    width: 400,
    borderColor: "#cd3131",
    borderWidth: 3,
    alignSelf: "center",
    marginBottom: 30,
    backgroundColor: "#ff3c3c",
    borderRadius: 10,
  },
  confirmOrderText: {
    textAlign: "center",
    padding: 10,
    fontSize: 20,
    color: "#ffbf00",
  },
});
