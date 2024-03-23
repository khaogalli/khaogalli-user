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

  var cart = {
    //send to BE
    UID: "",
    Res: "",
    Order: [],
  };

  var res_name = "Gazebo 1"; // api end point
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
    { items: "A11", price: "B11", pic: require("../../assets/dp.png") },
  ];

  cart.Res = res_name;
  cart.UID = user;

  const [itemlist, setItemList] = useState(
    menu.map((menuItem) => ({ item: menuItem.items, qty: 0 }))
  );

  // for (var i = 0; i < menu.length; i++) {
  //   var x = menu[i].items;
  //   itemlist.push({ item: x, qty: 0 });
  // }

  const qty = (item, op) => {
    // var index;
    // for (var i = 0; i < menu.length; i++) {
    //   if (itemlist[i].item === item) {
    //     index = i;
    //     break;
    //   }
    // }
    // if (op === "+") {
    //   itemlist[index].qty++;
    // }
    // if (op === "-" && itemlist[index].qty > 0) {
    //   itemlist[index].qty--;
    // }
    // console.log(itemlist);

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
    // for (var i = 0; i < itemlist.length; i++) {
    //   console.log(itemlist[i]);
    //   if (itemlist[i].qty != 0) {
    //     cart.Order.push(itemlist[i]);
    //   }
    // }
    console.log("final cart:");
    console.log(cart);
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
          <Pressable
            onPress={() => {
              console.log(item.items);
              qty(item.items, "+");
            }}
          >
            <Text style={styles.button_inc}>+</Text>
          </Pressable>
          <Text style={styles.qty}>
            {itemlist.find((i) => i.item === item.items)?.qty}
          </Text>
          <Pressable
            onPress={() => {
              console.log(item.items);
              qty(item.items, "-");
            }}
          >
            <Text style={styles.button_dec}>-</Text>
          </Pressable>
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
                  source={require("../../assets/dp1.png")}
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
          <Pressable
            onPress={() => {
              console.log("hi");
              addItem(itemlist);
            }}
          >
            <View
              style={{
                height: 50,
                width: 400,
                borderColor: "#cd3131",
                borderWidth: 3,
                alignSelf: "center",
                marginBottom: 30,
                backgroundColor: "#ff3c3c",
                borderRadius: 10,
              }}
            >
              <Text style={{ textAlign: "center", padding: 10 }}>
                Confirm Order
              </Text>
            </View>
          </Pressable>
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
});
